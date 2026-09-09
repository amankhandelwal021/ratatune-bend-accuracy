(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const pitch = window.BendPitch;
  const state = {
    target: 440, midi: 69, mode: 'idle', context: null, source: null,
    stream: null, analyser: null, samples: new Float32Array(4096),
    animation: 0, lastFrame: 0, lastPitch: 0, request: 0, recentCents: []
  };
  const keyNames = { 0: 'C', '-3': 'A', '-2': 'B♭', '-5': 'G', 2: 'D', 5: 'F', 4: 'E' };
  const bendNames = { 1: 'Half-step bend', 2: 'Whole-step bend', 3: '1½-step bend' };
  let returnFocus;

  function showReading(cents = null) {
    const hasPitch = Number.isFinite(cents);
    const rounded = hasPitch ? Math.round(cents) : null;
    const inTune = hasPitch && Math.abs(cents) <= 5;
    const direction = !hasPitch ? 'off target' : inTune ? 'on target' : cents < 0 ? 'flat' : 'sharp';
    $('cents-value').textContent = !hasPitch ? '—' : rounded < 0 ? '−' + Math.abs(rounded) : rounded > 0 ? '+' + rounded : '0';
    $('pitch-direction').textContent = direction;
    $('reading').classList.toggle('in-tune', inTune);
    $('reading').classList.toggle('no-pitch', !hasPitch);
    $('reading').classList.toggle('wide-reading', hasPitch && Math.abs(rounded) >= 1000);
    $('reading').setAttribute('aria-label', hasPitch
      ? `${Math.abs(rounded)} cents ${inTune ? 'from target, within the 5-cent guide' : direction}`
      : state.mode === 'mic' ? 'Waiting for a clear single note' : 'No pitch measured yet');
    $('reading-mode').textContent = state.mode === 'mic'
      ? hasPitch ? 'YOUR LIVE PITCH' : 'LISTENING FOR YOUR BEND'
      : state.mode === 'requesting' ? 'WAITING FOR MIC PERMISSION' : 'MICROPHONE OFF';
    $('feedback-text').textContent = !hasPitch
      ? state.mode === 'mic' ? 'Play one clear note and hold it.' : 'Play a bend. See where it lands.'
      : inTune ? 'Within 5 cents. Hold this pitch and listen.'
      : cents < 0 ? 'A little low. Ease off the bend.' : 'A little high. Deepen the bend.';
  }

  function refreshTarget() {
    // Clear the old reading without interrupting an active microphone.
    const key = Number($('harp-key').value);
    const semitones = Number($('bend-target').value);
    state.midi = 71 + key - semitones;
    state.target = pitch.midiToHz(state.midi);
    state.recentCents = [];
    state.lastPitch = performance.now();
    $('target-note').textContent = pitch.noteName(state.midi);
    $('target-frequency').textContent = `${Math.round(state.target * 10) / 10} Hz`;
    $('target-context').replaceChildren(
      document.createTextNode(`${keyNames[key]} harp · 3 draw`),
      document.createElement('br'),
      document.createTextNode(bendNames[semitones])
    );
    showReading();
  }

  async function getContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) throw new Error('unsupported');
    if (!state.context || state.context.state === 'closed') state.context = new AudioContext();
    if (state.context.state === 'suspended') await state.context.resume();
    return state.context;
  }

  function stopAudio(message = 'Microphone off. Your audio stays on this device.') {
    state.request++;
    state.mode = 'idle';
    cancelAnimationFrame(state.animation);
    if (state.stream) state.stream.getTracks().forEach(track => track.stop());
    state.source?.disconnect();
    state.analyser?.disconnect();
    state.source = null;
    state.stream = null;
    state.analyser = null;
    state.recentCents = [];
    $('mic-label').textContent = 'Use my mic';
    $('mic-button').setAttribute('aria-pressed', 'false');
    $('demo-status').textContent = message;
    showReading();
  }

  function analyseFrame(now) {
    if (!state.analyser || state.mode !== 'mic') return;
    state.animation = requestAnimationFrame(analyseFrame);
    if (now - state.lastFrame < 65) return;
    state.lastFrame = now;
    state.analyser.getFloatTimeDomainData(state.samples);
    const result = pitch.detectPitch(state.samples, state.context.sampleRate);
    if (result) {
      state.recentCents.push(pitch.centsFrom(result.frequency, state.target));
      if (state.recentCents.length > 3) state.recentCents.shift();
      const sorted = [...state.recentCents].sort((a, b) => a - b);
      showReading(sorted[Math.floor(sorted.length / 2)]);
      state.lastPitch = now;
    } else if (now - state.lastPitch > 450) {
      state.recentCents = [];
      showReading();
    }
  }

  async function startMicrophone() {
    if (state.mode !== 'idle') {
      stopAudio(state.mode === 'requesting' ? 'Mic request cancelled. No audio is being used.' : undefined);
      return;
    }
    const token = ++state.request;
    state.mode = 'requesting';
    $('mic-label').textContent = 'Cancel mic request';
    $('demo-status').textContent = 'Allow microphone access in your browser to check your bend.';
    showReading();
    try {
      if (!navigator.mediaDevices?.getUserMedia || !window.isSecureContext) throw new Error('insecure');
      const context = await getContext();
      if (token !== state.request) return;
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false },
        video: false
      });
      // Permission can resolve after cancellation: discard that late stream.
      if (token !== state.request) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      state.stream = stream;
      state.source = context.createMediaStreamSource(stream);
      state.analyser = context.createAnalyser();
      state.analyser.fftSize = state.samples.length;
      state.source.connect(state.analyser); // No speaker connection or recording.
      state.mode = 'mic';
      state.lastFrame = 0;
      state.lastPitch = performance.now();
      $('mic-label').textContent = 'Stop mic';
      $('mic-button').setAttribute('aria-pressed', 'true');
      $('demo-status').textContent = 'Mic on · audio stays on this device.';
      showReading();
      stream.getAudioTracks().forEach(track => {
        track.onended = () => {
          if (state.stream === stream) stopAudio('Microphone disconnected. Reconnect it and try again.');
        };
      });
      state.animation = requestAnimationFrame(analyseFrame);
    } catch (error) {
      if (token !== state.request) return;
      let message = 'Couldn’t start the microphone. Check your device and try again.';
      if (error.name === 'NotAllowedError') message = 'Microphone access was declined. Allow it in browser settings, then try again.';
      if (error.name === 'NotFoundError') message = 'No microphone found. Connect a microphone, then try again.';
      if (error.name === 'NotReadableError') message = 'Microphone unavailable. Close other apps using it, then try again.';
      if (error.message === 'insecure') message = 'Open this page on HTTPS or localhost to enable microphone access.';
      if (error.message === 'unsupported') message = 'This browser doesn’t support the audio demo. Try a current Chrome, Safari, or Firefox browser.';
      stopAudio(message);
    }
  }
  function openForm(event) {
    returnFocus = event.currentTarget;
    if (state.mode !== 'idle') stopAudio();
    $('form-view').hidden = false; $('success-view').hidden = true;
    $('access-dialog').setAttribute('aria-labelledby','access-title');
    $('access-dialog').setAttribute('aria-describedby','access-description');
    $('access-form').reset(); $('email-error').textContent = '';
    $('email').removeAttribute('aria-invalid');
    $('access-dialog').showModal();
    document.body.style.overflow = 'hidden';
    $('email').focus();
  }
  function closeForm() { $('access-dialog').close(); }
  document.querySelectorAll('[data-access]').forEach(button => button.addEventListener('click',openForm));
  $('close-dialog').addEventListener('click',closeForm);
  $('done-button').addEventListener('click',closeForm);
  $('access-dialog').addEventListener('click', event => {
    if (event.target !== $('access-dialog')) return;
    const rect = $('access-dialog').getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeForm();
  });
  $('access-dialog').addEventListener('close', () => {
    document.body.style.overflow = '';
    $('access-form').reset();
    returnFocus?.focus();
  });
  $('access-form').addEventListener('submit', event => {
    event.preventDefault();
    const email = $('email'); email.value = email.value.trim();
    if (!email.validity.valid || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      $('email-error').textContent = 'Enter a valid email address, such as you@example.com.';
      email.setAttribute('aria-invalid','true'); email.focus(); return;
    }
    $('email-error').textContent = ''; email.removeAttribute('aria-invalid');
    // The assessment does not require a backend. Do not silently collect PII.
    $('form-view').hidden = true; $('success-view').hidden = false;
    $('access-dialog').setAttribute('aria-labelledby','preview-success-title');
    $('success-view').querySelector('h2').id = 'preview-success-title';
    $('access-dialog').removeAttribute('aria-describedby');
    $('access-form').reset(); $('done-button').focus();
  });
  $('email').addEventListener('input', () => { $('email-error').textContent = ''; $('email').removeAttribute('aria-invalid'); });

  $('mic-button').addEventListener('click', startMicrophone);
  $('harp-key').addEventListener('change', refreshTarget);
  $('bend-target').addEventListener('change', refreshTarget);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.mode !== 'idle') stopAudio('Microphone stopped while the page was in the background.');
  });
  window.addEventListener('pagehide', () => {
    stopAudio();
    if (state.context && state.context.state !== 'closed') state.context.close().catch(() => {});
  });
  $('year').textContent = String(new Date().getFullYear());
  refreshTarget();
})();
