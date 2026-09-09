# Ratatune — React bend accuracy landing page

A complete React + Vite project. The existing design, branding, copy, three content sections, live microphone prototype, early-access form, and scroll-driven harmonica are preserved. The page is composed of JSX components; state and browser resources are managed by React hooks. There is no parallel legacy HTML/JavaScript implementation to maintain.

## Run locally

Use Node.js 20.19+ or 22.12+ (Node 24 is supported).

```sh
npm ci
npm run dev
```

Open **http://127.0.0.1:4173/**. If another preview already occupies that port, stop it first or use `npm run dev -- --port 5173`.

```sh
npm run build
npm run preview
```

The production build is in `dist/`. Deploy that folder to a static host using HTTPS for microphone access. The build pre-renders the React components into HTML, then hydrates them in the browser. This keeps the page readable before JavaScript loads or when it is disabled. The development server renders on the client. Opening the source `index.html` directly is not a supported preview; use Vite or the generated `Ratatune.html`.

## Project structure

- `src/App.jsx`: page composition, shared early-access state, microphone hook.
- `src/components/`: header, hero, live bend demo, bend strip, explanation, invitation/FAQ, footer, dialog, and harmonica artwork/scene.
- `src/hooks/useMicrophonePitch.js`: React target/reading state and lifecycle cleanup.
- `src/lib/microphone.js`: capture session, cancellation, device handling, and analysis scheduling.
- `src/lib/pitch.js`: pure YIN detector and pitch conversion functions.
- `src/hooks/useHarmonicaMotion.js` and `src/lib/harmonica-motion.js`: the existing measured scroll timeline, scoped to this React tree, with listener, observer, and animation-frame cleanup.
- `src/styles/`: the existing page styling and harmonica styling, formatted for editing.
- `public/assets/favicon.svg`: local brand asset. The harmonica SVG is JSX in `HarmonicaArtwork.jsx`.
- `src/entry-server.jsx` and `scripts/prerender.mjs`: static HTML generated from the same React components.
- `tests/`: detector/capture unit tests and Playwright browser scenarios.

## Live microphone proof

One target and one signed cents reading. The default is a C-harp 3-draw whole-step bend, A4 at 440 Hz. “Change harp or bend” reveals seven harp keys and three bend targets. Changing the target clears the old reading without stopping an active microphone.

“Use my mic” requests permission. The detector analyzes waveform samples on the device; it never uses predefined demonstration readings, records audio, plays audio through speakers, or uploads it. Silence clears the display. Stop mic, opening the lead form, backgrounding the page, navigating away, and component unmount release the capture resources. Late permission responses after cancellation are discarded. Development runs in React Strict Mode to exercise effect cleanup.

“Browser prototype” stays clearly visible. This is not Ratatune’s shipped feature or proprietary engine. A4 = 440 Hz and the ±5-cent guide are prototype choices. Physical-instrument validation remains pending: no harmonica was available. Generated-signal and simulated-input tests do not establish accuracy with an actual harmonica.

## Harmonica interaction

The same instrument follows a reversible scroll timeline through the existing layout: assembled in the hero, a hole-3 close-up near the C-harp bend strip, paired reeds and schematic draw airflow near the explanation, and reassembly near the final invitation. No new section or copy was introduced.

Hover adds a slight tilt. Click, tap, or Enter/Space toggles inspection; Escape closes it; scrolling resumes the timeline. The instrument travels through measured empty spaces and the outer gutter to stay clear of the content. Reduced motion keeps it assembled and static with optional manual inspection. Its live color reflects microphone input; the scroll-driven reed and airflow illustration is schematic, not an acoustic measurement.

## Early access

All Get Early Access buttons open the same modal. Email is required; harp key is the only optional field. Validation, confirmation, Escape, backdrop dismissal, and focus restoration are implemented with React and the native dialog element. The preview explicitly sends and stores nothing. A production lead endpoint remains outside this assignment’s scope.

## Check and package

```sh
npm test
npx playwright install chromium
npm run test:e2e
npm run package
```

`npm run package` builds the React app, generates a self-contained `Ratatune.html`, and creates `Ratatune-assignment.zip`. It includes editable React source, the lockfile, configuration, tests, production `dist/`, the standalone page, desktop/mobile views, and the four-sentence `Submission notes.md`. Dependencies, Git history, test output, and the internal assessment audit are excluded. The archive is decompressed and compared with its input files before completion. The generated files should be rebuilt after source edits.

The standalone HTML works without a build step; microphone permission still depends on the browser and secure context. HTTPS or localhost is the reliable preview environment.

## Migration verification

- `npm run build` and all 12 detector/capture unit tests passed, including 126 generated pitch measurements across 21 targets, two sample rates, and flat/on-target/sharp offsets (within one cent).
- Main-page text was compared with the original; all content matched after ignoring layout whitespace. Section and microphone geometry matched exactly at 390, 768, and 1440px.
- Browser checks covered all three CTAs, invalid/valid form input, confirmation, field reset, Escape, focus return, target selection, live −28/+28/0-cent readings, silence, mic stopping, late permission cancellation, form/background/page-exit cleanup, and the instrument’s live highlight.
- Scroll reversal, keyboard inspection, reduced motion, production hydration, the packaged standalone page, and JavaScript-disabled production HTML were checked in the browser.
- Across 45 scroll positions at 320, 390, 768, 1024, and 1440px, no content overlaps, unexpected hidden instrument states, or horizontal overflow were found. Axe WCAG A/AA checks reported zero violations on mobile, desktop, and the open dialog. All six supplied screenshots were refreshed from the React build.
- The local shell sandbox prevented Playwright CLI from launching Chromium. Browser scenarios were exercised through the available browser automation session instead; the CLI suite is included for a normal local/CI environment.

A real harmonica and microphone check is still required before claiming real-instrument accuracy. Hold single 3-draw bends, compare with an independent tuner, and note octave errors, instability, and silence/dropout behavior along with the harp key, device, browser, and room conditions.

## References

The user-supplied five-page **Mock Assessment .pdf** and Amrita’s follow-up approving a simple live microphone prototype govern the assignment. The required explanation is in `Submission notes.md`.

- [React build setup](https://react.dev/learn/build-a-react-app-from-scratch) and [Vite documentation](https://vite.dev/guide/).
- [Ratatune’s public page](https://ratatune.com/h2): positioning and headline.
- [HOHNER tuning charts](https://hohner.de/fileadmin/cat/2020/catalogs/Harmonicas/pdf/complete.pdf) and [bending explanation](https://my.hohner.de/t/harmonica-terminology-3-bending-overblowing/1377): standard Richter layout and schematic paired reeds.
- [MDN microphone capture](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) and [waveform analysis](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatTimeDomainData).
