import { test } from "node:test";
import assert from "node:assert/strict";
import {
  centsFrom,
  detectPitch,
  midiToHz,
  noteName,
} from "../src/lib/pitch.js";

test("all 21 bend targets at two sample rates and three offsets stay within one cent", () => {
  let count = 0;
  for (const rate of [44100, 48000]) {
    for (const key of [0, -3, -2, -5, 2, 5, 4]) {
      for (const bend of [1, 2, 3]) {
        const target = midiToHz(71 + key - bend);
        for (const cents of [-28, 0, 28]) {
          const hz = target * 2 ** (cents / 1200);
          const input = Float32Array.from({ length: 4096 }, (_, i) => {
            const phase = (2 * Math.PI * hz * i) / rate;
            return (
              0.3 * Math.sin(phase) +
              0.12 * Math.sin(2 * phase) +
              0.06 * Math.sin(3 * phase)
            );
          });
          const result = detectPitch(input, rate);
          assert.ok(
            result,
            "A stable generated single note should be detected",
          );
          assert.ok(Math.abs(centsFrom(result.frequency, target) - cents) < 1);
          count++;
        }
      }
    }
  }
  assert.equal(count, 126);
});

test("silence and sub-threshold input have no invented pitch", () => {
  assert.equal(detectPitch(new Float32Array(4096), 48000), null);
  assert.equal(detectPitch(new Float32Array(4096).fill(0.001), 44100), null);
});

test("default target and note names retain standard tuning", () => {
  assert.equal(midiToHz(69), 440);
  assert.equal(noteName(69), "A4");
  assert.equal(noteName(70), "B♭4");
  assert.equal(centsFrom(440, 440), 0);
});
