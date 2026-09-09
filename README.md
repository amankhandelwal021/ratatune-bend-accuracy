# Ratatune — live bend accuracy

Updated to reflect Amrita’s clarification: the feature is pre-launch, and a simple functioning microphone demo is the proof.

Open `index.html` in a browser, or serve this folder with any static web server. For microphone use, HTTPS or localhost is the recommended environment. There are no installation steps, dependencies, remote fonts, stock photos, or tracking scripts.

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open <http://127.0.0.1:4173>.

## Included

- `index.html`, `styles.css`, `app.js`, `pitch.js`, and the favicon: editable page source.
- `harmonica-motion.js`, `harmonica-motion.css`, and `assets/harmonica.svg`: the independent scroll interaction and instrument artwork. The SVG is embedded in the HTML so no fetch is needed.
- `Interaction.png` and `Mobile interaction.png`: desktop and mobile views of the harmonica between sections.
- `Desktop.png`, `Mobile.png`, and `Early access form.png`: current rendered views.
- `Submission notes.md`: the required four-sentence design explanation.
- The submission ZIP also includes `Ratatune.html`, a self-contained version.

## The live demo

One target and one live cents reading. Get Early Access is the primary conversion action; the outlined microphone button operates the proof demo. The microphone button sits directly below the target settings, before the reading, in both visual and keyboard order. The default is a C-harp 3-draw whole-step bend: A4 at 440 Hz. “Change harp or bend” reveals seven harp keys and three bend targets. A target change clears the old reading and keeps an active mic running.

“Use my mic” requests permission and begins on-device audio analysis. The displayed number comes from the microphone waveform using a simple YIN detector. It reports a signed cents offset and a plain-language direction: flat, sharp, or on target. Silence clears the number. The pitch readout never uses generated or predefined demonstration values; microphone audio is not played back, recorded, or uploaded.

The mic stops when the user chooses Stop mic, opens the early-access form, backgrounds the page, or navigates away. A pending permission request can be cancelled, and any stream that arrives after cancellation is immediately released.

The page clearly says “Browser prototype.” It is not Ratatune’s shipped product or its proprietary audio engine. Equal temperament at A4 = 440 Hz and a ±5-cent visual guide are prototype choices. The detector expects a single stable note; chords, background music, alternate tunings, and instrument harmonics need real-player validation.

## Scroll interaction

One reversible timeline runs through the existing sections. The complete instrument begins in the hero; the C-harp bend strip brings a close-up of hole 3; the existing explanation reveals the paired reed plates and schematic draw airflow; the final invitation returns it to an assembled view. There are no new content sections, labels, or changes to the original page copy, spacing, type, branding, or form. The enlarged view is an instrument illustration, not a product screenshot or a second pitch reading.

Scroll controls camera position, magnification, the cover separation, airflow marks, and small reed movements. Hover adds a slight tilt. Clicking, tapping, or pressing Enter/Space toggles the covers; Escape closes them, and further scrolling resumes the timeline. Between sections, the model contracts within the available space before moving and rotating through the outer gutter, so it stays visible without covering content. The third chamber’s live color still uses only actual detected microphone input; scroll-driven airflow/reed movements are schematic and do not represent recorded audio or measured vibration frequency.

Reduced motion keeps a static assembled instrument, with optional manual inspection. The layer hides for the lead form and stops rendering in a hidden tab. Original content nodes match the previous page exactly. Across 85 sampled scroll positions at 320, 390, 768, 1024, and 1440px, there were no in-view disappearances, content overlaps, or horizontal overflow. Scroll reversal, keyboard controls, reduced motion, and automated accessibility checks passed. The original pitch and form code is unchanged.

The paired-reed illustration follows [HOHNER’s explanation of bending](https://my.hohner.de/t/harmonica-terminology-3-bending-overblowing/1377). It is a schematic view, not an acoustics simulation.

## Lead form

The common “Get Early Access” action opens a modal with required email and optional harp key. Validation, keyboard dismissal, focus management, and a confirmation preview are implemented. The form explicitly does not send or store email. Connecting a lead endpoint and production privacy/consent copy remains a launch integration task, outside the assignment scope.

## Validation

- 126 generated test-signal measurements across 21 targets at 44.1 and 48 kHz; all within one cent of expected pitch, worst error approximately 0.64 cents. Test signals are used only in verification, not included in the page experience.
- Browser microphone pipeline checked with a simulated media stream: −28 cents, +28 cents, zero, silence, and explicit track release all passed.
- Permission denial and cancellation of a pending microphone request passed; late streams were released.
- Target switching, form validation, confirmation, and keyboard dismissal checked.
- Responsive layout rechecked at 11 widths from 320 to 1440 pixels with no horizontal overflow. At 390 × 844, the microphone button is fully visible at 720–772 pixels from the top (previously 938–990).
- The browser-prototype badge is 11px through 1100px viewport width and 12px above that; the supporting prototype note is also at least 11px. All checked widths retain the full badge without clipping.
- Desktop and mobile visuals inspected; automated WCAG A/AA checks with axe-core reported no violations at 390px and 1440px.

Physical-instrument validation remains pending: no harmonica was available for this review. No physical harmonica or device microphone recording was used for testing. The generated-signal and simulated-stream results do not establish reliability with a real harmonica, or replace a complete assistive-technology audit.

When a harp is available, select its key and bend target, allow the microphone, and hold single 3-draw bends while checking that the reading follows pitch changes, remains steady on a held note, clears in silence, and stops when requested. Compare against an independent tuner or measured recording; record the device, browser, harp key, room conditions, octave errors, and any dropouts before making a real-instrument accuracy claim.

## Reference context

- User-supplied **Mock Assessment .pdf**, all five pages, and Amrita’s follow-up approving a simple microphone prototype.
- [Ratatune’s public page](https://ratatune.com/h2): feature positioning and headline. The brief’s “Get Early Access” wording is used throughout.
- [HOHNER tuning charts](https://hohner.de/fileadmin/cat/2020/catalogs/Harmonicas/pdf/complete.pdf): standard Richter note layout.
- [MDN: microphone capture](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) and [MDN: waveform analysis](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatTimeDomainData): browser audio behavior.
