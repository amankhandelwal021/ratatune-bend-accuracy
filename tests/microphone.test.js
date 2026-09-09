import { test } from "node:test";
import assert from "node:assert/strict";
import { createMicrophoneSession } from "../src/lib/microphone.js";

function fixture() {
  let time = 0,
    id = 0,
    frequency = 440,
    silent = false;
  let resolveStream, rejectStream;
  const frames = new Map(),
    contexts = [],
    streams = [],
    views = [];
  const pending = [];
  const environment = {
    isSecureContext: true,
    performance: { now: () => time },
    requestAnimationFrame(fn) {
      const key = ++id;
      frames.set(key, fn);
      return key;
    },
    cancelAnimationFrame(key) {
      frames.delete(key);
    },
    navigator: {
      mediaDevices: {
        getUserMedia(options) {
          assert.deepEqual(options.audio, {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
          });
          return new Promise((resolve, reject) => {
            resolveStream = resolve;
            rejectStream = reject;
            pending.push(resolve);
          });
        },
      },
    },
    AudioContext: class {
      state = "running";
      sampleRate = 48000;
      disconnected = 0;
      constructor() {
        contexts.push(this);
      }
      createMediaStreamSource() {
        return { connect() {}, disconnect: () => this.disconnected++ };
      }
      createAnalyser() {
        return {
          disconnect: () => this.disconnected++,
          getFloatTimeDomainData(data) {
            for (let i = 0; i < data.length; i++)
              data[i] = silent
                ? 0
                : 0.35 * Math.sin((2 * Math.PI * frequency * i) / 48000);
          },
        };
      }
      async close() {
        this.state = "closed";
      }
    },
  };
  const session = createMicrophoneSession({
    environment,
    onChange: (view) => views.push(view),
  });
  function incoming(resolve = resolveStream) {
    const track = {
      stopped: false,
      onended: null,
      stop() {
        this.stopped = true;
      },
    };
    const stream = { getTracks: () => [track], getAudioTracks: () => [track] };
    streams.push(stream);
    resolve(stream);
    return track;
  }
  function tick(ms = 100) {
    time += ms;
    const queued = [...frames.values()];
    frames.clear();
    queued.forEach((fn) => fn(time));
  }
  return {
    session,
    environment,
    contexts,
    streams,
    frames,
    views,
    pending,
    incoming,
    tick,
    reject: (error) => rejectStream(error),
    pitch: (cents) => {
      frequency = 440 * 2 ** (cents / 1200);
    },
    silence: () => {
      silent = true;
    },
    view: () => views.at(-1),
  };
}

test("real analysis pipeline follows generated flat, sharp, target, and silence; stop releases capture", async () => {
  const f = fixture();
  const started = f.session.toggle();
  const track = f.incoming();
  await started;
  for (const cents of [-28, 28, 0]) {
    f.pitch(cents);
    for (let i = 0; i < 4; i++) f.tick();
    assert.ok(Math.abs(f.view().cents - cents) < 1);
  }
  f.silence();
  f.tick(500);
  assert.equal(f.view().cents, null);
  f.session.stop();
  assert.equal(track.stopped, true);
  assert.equal(f.contexts[0].state, "closed");
  assert.equal(f.contexts[0].disconnected, 2);
  assert.equal(f.frames.size, 0);
  assert.equal(f.view().mode, "idle");
});

test("target change clears a previous measurement without stopping capture", async () => {
  const f = fixture();
  const started = f.session.toggle();
  const track = f.incoming();
  await started;
  f.tick();
  f.session.setTarget(440 * 2 ** (1 / 12));
  assert.equal(f.view().cents, null);
  assert.equal(track.stopped, false);
  f.tick();
  assert.ok(Math.abs(f.view().cents + 100) < 1);
  f.session.dispose();
});

test("cancelling a pending request closes its context and discards a late stream", async () => {
  const f = fixture();
  const started = f.session.toggle();
  await f.session.toggle();
  assert.match(f.view().status, /cancelled/);
  const track = f.incoming();
  await started;
  assert.equal(track.stopped, true);
  assert.equal(f.contexts[0].state, "closed");
  assert.equal(f.view().mode, "idle");
});

test("an old permission response cannot replace a newer active session", async () => {
  const f = fixture();
  const old = f.session.toggle();
  f.session.stop();
  const current = f.session.toggle();
  const currentTrack = f.incoming(f.pending[1]);
  await current;
  const oldTrack = f.incoming(f.pending[0]);
  await old;
  assert.equal(oldTrack.stopped, true);
  assert.equal(currentTrack.stopped, false);
  assert.equal(f.view().mode, "mic");
  f.session.dispose();
});

test("unmount releases resources and suppresses late updates", async () => {
  const f = fixture();
  const started = f.session.toggle();
  const before = f.views.length;
  f.session.dispose();
  const track = f.incoming();
  await started;
  assert.equal(track.stopped, true);
  assert.equal(f.views.length, before);
  assert.equal(f.frames.size, 0);
  assert.equal(f.contexts[0].state, "closed");
});

for (const name of ["NotAllowedError", "NotFoundError", "NotReadableError"]) {
  test(name + " restores an actionable idle state", async () => {
    const f = fixture();
    const started = f.session.toggle();
    f.reject(Object.assign(new Error(), { name }));
    await started;
    assert.equal(f.view().mode, "idle");
    assert.equal(f.contexts[0].state, "closed");
    assert.notEqual(
      f.view().status,
      "Microphone off. Your audio stays on this device.",
    );
  });
}

test("track disconnection stops analysis", async () => {
  const f = fixture();
  const started = f.session.toggle();
  const track = f.incoming();
  await started;
  track.onended();
  assert.equal(f.view().mode, "idle");
  assert.match(f.view().status, /disconnected/);
  assert.equal(f.frames.size, 0);
});
