/* A small YIN pitch detector for live microphone input.
   This is a standalone browser prototype, not Ratatune's audio engine. */
const NOTE_NAMES = [
  "C",
  "C♯",
  "D",
  "E♭",
  "E",
  "F",
  "F♯",
  "G",
  "A♭",
  "A",
  "B♭",
  "B",
];
const midiToHz = (midi) => 440 * Math.pow(2, (midi - 69) / 12);
const centsFrom = (frequency, target) => 1200 * Math.log2(frequency / target);
function noteName(midi) {
  return NOTE_NAMES[((midi % 12) + 12) % 12] + (Math.floor(midi / 12) - 1);
}
function detectPitch(input, originalRate) {
  let energy = 0;
  for (let i = 0; i < input.length; i++) energy += input[i] * input[i];
  if (Math.sqrt(energy / input.length) < 0.008) return null;
  const stride = originalRate >= 40000 ? 2 : 1;
  const rate = originalRate / stride;
  const length = Math.floor(input.length / stride);
  const maxLag = Math.min(Math.floor(rate / 130), Math.floor(length / 2) - 1);
  const minLag = Math.max(2, Math.floor(rate / 1500));
  const windowSize = Math.min(1024, length - maxLag);
  const difference = new Float64Array(maxLag + 1);
  for (let tau = 1; tau <= maxLag; tau++) {
    let sum = 0;
    for (let i = 0; i < windowSize; i++) {
      const delta = input[i * stride] - input[(i + tau) * stride];
      sum += delta * delta;
    }
    difference[tau] = sum;
  }
  const normalized = new Float64Array(maxLag + 1);
  normalized[0] = 1;
  let runningSum = 0;
  for (let tau = 1; tau <= maxLag; tau++) {
    runningSum += difference[tau];
    normalized[tau] = runningSum ? (difference[tau] * tau) / runningSum : 1;
  }
  for (let tau = minLag; tau < maxLag - 1; tau++) {
    if (normalized[tau] < 0.12) {
      while (tau + 1 < maxLag && normalized[tau + 1] < normalized[tau]) tau++;
      const left = normalized[tau - 1];
      const center = normalized[tau];
      const right = normalized[tau + 1];
      const denominator = left - 2 * center + right;
      const adjustment = denominator ? (0.5 * (left - right)) / denominator : 0;
      const frequency = rate / (tau + adjustment);
      return { frequency, confidence: 1 - center };
    }
  }
  return null;
}
export { midiToHz, centsFrom, noteName, detectPitch };
