import { centsFrom, detectPitch } from "./pitch.js";

export const INITIAL_READING = {
  mode: "idle",
  cents: null,
  status: "Allow your mic, then play one clear 3-draw bend.",
};

const OFF_MESSAGE = "Microphone off. Your audio stays on this device.";

function errorMessage(error) {
  const messages = {
    NotAllowedError:
      "Microphone access was declined. Allow it in browser settings, then try again.",
    NotFoundError: "No microphone found. Connect a microphone, then try again.",
    NotReadableError:
      "Microphone unavailable. Close other apps using it, then try again.",
    insecure:
      "Open this page on HTTPS or localhost to enable microphone access.",
    unsupported:
      "This browser doesn’t support the audio demo. Try a current Chrome, Safari, or Firefox browser.",
  };
  return (
    messages[error.name] ||
    messages[error.message] ||
    "Couldn’t start the microphone. Check your device and try again."
  );
}

// Owns one capture session. React creates/disposes it in an effect; tests inject audio devices.
export function createMicrophoneSession({
  onChange,
  target = 440,
  environment = window,
}) {
  let view = { ...INITIAL_READING };
  let context = null,
    source = null,
    stream = null,
    analyser = null;
  let frame = 0,
    request = 0,
    disposed = false,
    lastFrame = 0,
    lastPitch = 0;
  let recentCents = [];
  const samples = new Float32Array(4096);

  function publish(update) {
    view = { ...view, ...update };
    if (!disposed) onChange(view);
  }

  function release() {
    request++;
    environment.cancelAnimationFrame(frame);
    frame = 0;
    if (stream)
      stream.getTracks().forEach((track) => {
        track.onended = null;
        track.stop();
      });
    source?.disconnect();
    analyser?.disconnect();
    const closing = context;
    stream = source = analyser = context = null;
    recentCents = [];
    if (closing && closing.state !== "closed") closing.close().catch(() => {});
  }

  function stop(message = OFF_MESSAGE) {
    release();
    publish({ mode: "idle", cents: null, status: message });
  }

  function analyse(now) {
    if (disposed || !analyser || view.mode !== "mic") return;
    frame = environment.requestAnimationFrame(analyse);
    if (now - lastFrame < 65) return;
    lastFrame = now;
    analyser.getFloatTimeDomainData(samples);
    const result = detectPitch(samples, context.sampleRate);
    if (result) {
      recentCents.push(centsFrom(result.frequency, target));
      if (recentCents.length > 3) recentCents.shift();
      const sorted = [...recentCents].sort((a, b) => a - b);
      publish({ cents: sorted[Math.floor(sorted.length / 2)] });
      lastPitch = now;
    } else if (now - lastPitch > 450) {
      recentCents = [];
      if (view.cents !== null) publish({ cents: null });
    }
  }

  async function toggle() {
    if (disposed) return;
    if (view.mode !== "idle") {
      stop(
        view.mode === "requesting"
          ? "Mic request cancelled. No audio is being used."
          : undefined,
      );
      return;
    }
    const token = ++request;
    publish({
      mode: "requesting",
      cents: null,
      status: "Allow microphone access in your browser to check your bend.",
    });
    try {
      if (
        !environment.navigator.mediaDevices?.getUserMedia ||
        !environment.isSecureContext
      ) {
        throw new Error("insecure");
      }
      const AudioContext =
        environment.AudioContext || environment.webkitAudioContext;
      if (!AudioContext) throw new Error("unsupported");
      const activeContext = new AudioContext();
      context = activeContext;
      if (activeContext.state === "suspended") await activeContext.resume();
      if (token !== request || disposed) return;
      const incoming = await environment.navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
        video: false,
      });
      // Permission may resolve after Stop, a form opening, or component unmount.
      if (token !== request || disposed) {
        incoming.getTracks().forEach((track) => track.stop());
        return;
      }
      stream = incoming;
      source = activeContext.createMediaStreamSource(incoming);
      analyser = activeContext.createAnalyser();
      analyser.fftSize = samples.length;
      source.connect(analyser); // Deliberately no connection to speakers.
      lastFrame = 0;
      lastPitch = environment.performance.now();
      publish({
        mode: "mic",
        cents: null,
        status: "Mic on · audio stays on this device.",
      });
      incoming.getAudioTracks().forEach((track) => {
        track.onended = () => {
          if (stream === incoming)
            stop("Microphone disconnected. Reconnect it and try again.");
        };
      });
      frame = environment.requestAnimationFrame(analyse);
    } catch (error) {
      if (token === request && !disposed) stop(errorMessage(error));
    }
  }

  return {
    toggle,
    stop,
    setTarget(frequency) {
      target = frequency;
      recentCents = [];
      lastPitch = environment.performance.now();
      publish({ cents: null });
    },
    dispose() {
      disposed = true;
      release();
    },
  };
}
