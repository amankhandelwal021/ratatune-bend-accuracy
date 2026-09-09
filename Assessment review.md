# Assessment review — 9 September 2026

Internal review for Aman. This checklist is kept outside the submission ZIP; the required submitted explanation remains four sentences.

## Sources and status meanings

Reviewed all five pages and all 11 parts of [Mock Assessment .pdf](</Users/amankhandelwal/Downloads/Mock Assessment .pdf>), plus the user-supplied reply from Amrita approving the live microphone browser prototype. The PDF defines the assignment criteria; Amrita’s later clarification resolves the choice of proof. Neither document authorizes sending a submission or claiming that the final design has been accepted.

**Verified** means inspected or exercised in the implementation. **Assessed** means supported by the design, but dependent on human judgment. **Permitted** identifies scope or tool freedoms, rather than a missing feature. **Pending** means evidence is unavailable. These statuses are not client approval.

## Parts 1–4: product, feature, promise, and audience

| Reference | Rule or condition | Status and evidence |
|---|---|---|
| p1 / assignment | Deliver one complete harmonica bend-accuracy landing page. | Verified — one complete responsive page with editable code and a self-contained HTML version. |
| p1 / Part 1 | Ratatune is an AI music app in pre-launch. | Verified — development/early-access language throughout. The prototype is not presented as Ratatune’s proprietary AI engine. The brief does not require an AI label in the headline. |
| p1 / Part 1 | Feedback happens while someone plays, rather than as a generic lesson. | Verified in software — waveform analysis produces a live signed cents reading and an adjustment direction. Physical-instrument performance remains pending. |
| p1 / Part 1 | Landing pages test musician demand before further feature engineering. | Verified — page asks for early access, makes no availability promise, and includes a proposed traffic experiment in the submission notes. The historical two-year development detail is background, not mandatory page copy. |
| p1 / Part 2 | Focus specifically on harmonica bends. | Verified — C-harp 3-draw targets, whole-step and half-step bends, embouchure, blue notes, and Richter tuning. |
| p1 / Part 2 | Compare microphone pitch against a target. | Verified — selected note/frequency is visible; the cents value is calculated from detected waveform pitch and the selected target. |
| p1 / Part 2 | Show a real number and useful adjustment feedback. | Verified in software — simulated microphone input produced −28 flat, +28 sharp, and 0 on target. Flat/sharp feedback changes accordingly. No value is prefilled as fake proof. |
| p1 / Part 2 | The two-semitone / 28-cents-flat example illustrates the feature. | Verified — default C-harp whole-step target is A4 at 440 Hz; the detector can show −28 cents. The example is not presented as a measured player result. |
| p2 / Part 3 | Open directly with the stated promise. | Verified — the single H1 is exactly “Finally hear whether your bends are actually in tune.” |
| p2 / Part 3 | Preserve continuity with the ad; avoid a broad AI/music-app headline. | Verified — exact promise plus a short description of mic input, draw bends, target, and cents. |
| p2 / Part 3 | Use the live-page source for tone and feature detail. | Verified against the brief’s supplied wording — promise and feature scope match. No production visuals are invented; Amrita says none are available. |
| p2 / Part 4 | Write for intermediate/advanced players who already bend and doubt accuracy. | Assessed — copy centers on a held or drifting 3-draw bend, rather than teaching a first bend. No beginner onboarding or general music-lover pitch. |
| p2 / Part 4 | Copy should not work unchanged for guitarists or pianists. | Assessed — harp keys, 3 draw, Richter tuning, and bend positions are essential to the content and controls. |

## Part 5: required visitor outcomes

| Reference | Rule or condition | Status and evidence |
|---|---|---|
| p2 / 5.1 | Understand what the product does in ten seconds, without a paragraph or scroll. | Assessed — headline and the short microphone/target/cents description appear in the initial desktop and mobile views. A timed test with target players has not been performed. |
| p2 / 5.2 | Show the feature working; adjectives alone are insufficient proof. | Verified in software under Amrita’s approved approach — the live browser demo measures input; proof is available when the visitor starts the mic and plays. Real-harp reliability is not established. |
| p2 / 5.3 | Use natural harmonica vocabulary. | Verified in copy — draw bends, harp key, whole-step, 3 draw, embouchure, blue notes, Richter tuning. The static note strip now explicitly says C HARP · 3 DRAW at every width. |
| p2 / 5.4 | Be honest about pre-launch/founding-access maturity. | Verified — development notice, visible Browser Prototype badge, clear FAQ, and preview-only form. No fabricated maturity, customers, testimonials, or shipped-app screenshots. |
| p2 / 5.5 | Give one clear next step without competing asks. | Verified structurally; hierarchy assessed — all conversion buttons say Get Early Access and open one form. The mic is an outlined control within the approved proof demo, with no second conversion destination. |

## Part 6: call to action and lead capture

| Reference | Rule or condition | Status and evidence |
|---|---|---|
| p3 / CTA wording | Use Get Early Access. | Verified — all three page conversion buttons and the form submit button use that wording. |
| p3 / CTA wording | Do not substitute Sign Up or Start Free Trial. | Verified — neither is used as a CTA. |
| p3 / pricing | Do not show a specific price or commit to a number. | Verified — no currency price, pricing plan, or payment link. |
| p3 / pricing | Soft reassurance about cost is allowed. | Permitted — “Pre-launch access. No payment details.” adds no price or unapproved free-access promise. |
| p3 / after click | Open a short lead form rather than an app store or payment page. | Verified — all three CTAs opened the same dialog; the page has no store/payment links. |
| p3 / fields | Require an email address. | Verified — required email input; empty and invalid values rejected; a valid email accepted in preview. |
| p3 / fields | Allow at most one optional qualifying field. | Verified — usual harp key is the only optional field. Submission works when it is blank. |
| p3 / fields | No more than two fields total. | Verified — one email input and one harp-key select in the lead form; no hidden data fields, name, phone, or additional questionnaire. Demo target settings are not lead-form fields. |

## Part 7: automatic rejection conditions

| Reference | Rejection condition | Status and evidence |
|---|---|---|
| p4 / rejection 1 | Illustrated/vector product drawing used instead of a real screen or proof moment. | Verified absent — the panel is functioning HTML with microphone analysis. Small mic/brand icons do not stand in for a product screenshot. |
| p4 / rejection 2 | Generic stock photography unrelated to harmonica/bending. | Verified absent — no photography or stock-media assets. |
| p4 / rejection 3 | Generic hero plus three feature cards, interchangeable across products. | Verified absent structurally; distinctiveness assessed — live check, a C-harp bend-position strip, target interpretation, and early-access invitation/FAQ. No three-card feature grid. |
| p4 / rejection 4 | Copy never mentions harmonica-specific details. | Verified absent — instrument-specific vocabulary, controls, and note positions throughout. |
| p4 / rejection 5 | Claims without a number, reading, or specific proof anywhere. | Verified in software — the live cents readout works with input. The idle dash is intentionally not fabricated evidence; no claim that a physical harp was tested. |
| p4 / tools clarification | AI tools may be used, but the result must feel deliberately made for this player. | Permitted tool use; aesthetic judgment pending with reviewer. No claim that automated checks can determine originality or acceptance. |

## Parts 8–10: scope, submission, and time

| Reference | Rule or condition | Status and evidence |
|---|---|---|
| p4 / Part 8 | Deliver full page design, structure, and copy as code or high-fidelity design. | Verified — complete HTML/CSS/JS implementation, not just a hero or wireframe. |
| p4 / Part 8 | Production-ready code is not required. | Permitted — prototype scope documented; no production-readiness claim. |
| p4 / Part 8 | Real analytics are not required. | Permitted — no tracking wired up; notes describe what to measure with future traffic. |
| p4 / Part 8 | A backend is not required. | Permitted — form preview deliberately does not save or send email and states that clearly. This is not an assignment defect. |
| p4 / Part 8 | Figma, Webflow, Framer, HTML/CSS, or usual tools are allowed. | Permitted — coded HTML/CSS route chosen; an additional Figma file is not required. |
| p4 / implementation | Ratatune’s team can implement an approved concept into the existing site. | Pending client approval/integration — local code is reviewable; no claim that the existing production site was updated. |
| p5 / 9.1 | Include a desktop view. | Verified — refreshed Desktop.png, 1440px full-page view. |
| p5 / 9.1 | Include a mobile view. | Verified — refreshed Mobile.png, 390px full-page view; initial viewport tested at 390 × 844. |
| p5 / 9.1 | Submit a coded file or a viewable design-file link. | Verified — Ratatune.html is self-contained; ZIP also contains editable source. A public deployment is not required by the brief. |
| p5 / 9.2 | Written explanation must be 3–4 sentences maximum. | Verified — Submission notes.md contains exactly four sentences. README is technical handoff documentation, not the requested design explanation. |
| p5 / 9.2 | Explain the structure and why it is ordered that way. | Fixed and verified — sentence 1 explains the sequence as recognize the problem, verify feedback, then decide whether to join. |
| p5 / 9.2 | Identify the proof moment and why it is credible. | Verified — sentence 2 identifies live visitor input, a selected target, a single cents value, and no scripted readings. |
| p5 / 9.2 | Explain what to test/change first with real traffic. | Verified — sentence 4 proposes a supporting-copy test and compares completed forms per visitor with headline, layout, and form held constant. |
| p5 / Part 10 | Spend 4–6 hours maximum. | Pending evidence — no reliable active-work log is available. Calendar timestamps do not establish hours worked; compliance cannot be certified retrospectively. |
| p5 / Part 10 | Prioritize solving Part 5 over prolonged cosmetic polishing. | Assessed — revisions address conversion hierarchy, explicit example labeling, mobile mic access, and the required rationale; no additional product features added. |

## Part 11: evaluation criteria

| Criterion | Assessment |
|---|---|
| Message match | Exact required headline; no reset to broad music/AI positioning. |
| Ten-second clarity | Short explanation visible initially; formal user-comprehension testing pending. |
| Proof over claims | Approved live microphone prototype; simulated pipeline verified, real-harmonica reliability pending. |
| Authentic voice | Instrument-specific controls, C-harp note sequence, embouchure, 3 draw, and bending language. |
| Visual distinctiveness | Deliberate proof-led editorial layout with no stock photos, product illustration, or three-card template; final visual judgment belongs to the reviewer. |
| Conversion structure | One lead form and one conversion action; microphone operation is secondary and serves the approved proof. |
| Restraint | Each section has a role: promise/proof, bend context, reading interpretation, conversion, and practical questions; no generic benefits grid or invented social proof. |
| CTA and lead capture | Exact wording, no specific price, two fields maximum, no store/payment destination. |
| Questions before starting | Questions are welcomed, not a mandatory additional approval gate. The proof-asset question was resolved by Amrita’s supplied reply. |

## Amrita’s clarification and later user requirements

| Condition or approval | Status and evidence |
|---|---|
| No existing screenshots/recordings are available. | Respected — none are fabricated or represented as existing product evidence. |
| Proceed with a live microphone pitch demo in the browser. | Already approved in the user-supplied reply; implemented. No further permission needed to make the requested local fixes. |
| Clearly label it as a browser prototype. | Verified — badge is 11px through 1100px viewport width and 12px above; supporting note is also at least 11px. |
| Keep the demo simple: a single reading with a clear target. | Verified — one target and one measured cents output; key/bend options are collapsed by default, with no dashboard or chart. |
| Show something close to X cents off pitch in real time. | Verified in software — signed cents with flat/sharp/on-target direction. A reference oscillator used for testing is not shipped in the page. |
| Due 9 September, 5pm. | Deadline acknowledged; local deliverables refreshed on 9 September before 5pm in the task’s Asia/Kolkata timezone. Delivery to Amrita has not been performed or confirmed; her email does not specify a timezone. |
| Let Amrita know about blockers building the live demo. | No current software build blocker found. Real-harmonica validation remains pending and is documented. No external message has been sent or authorized in this review request. |
| Bring the mic control into reach at 390 × 844. | Verified — the complete 52px control occupies y720–772, rather than y938–990. This is not a claim that it fits the first screen of every shorter device. |
| Enlarge the prototype label from 7–9px to 11–12px. | Verified across 11 widths, with no horizontal overflow. |
| Test with a real harmonica and mic. | Pending — user confirmed no harmonica is available. No physical-player result is invented; simulated tests do not close this gap. |
| Final concept/submission acceptance. | Pending — Amrita approved the demonstration approach, not the completed page. This checklist cannot grant acceptance or waive the time limit. |

## Verification record

On 9 September, the current page was inspected at widths 320, 360, 390, 414, 640, 641, 768, 1024, 1100, 1101, and 1440px without horizontal overflow. Automated axe WCAG A/AA checks returned no violations at 390px, 1440px, or in the open lead form; this is not a complete accessibility certification. Browser console checks reported no errors. All three conversion buttons opened the form, email validation worked, the optional field could remain blank, and the confirmation honestly described the preview.

A generated stream passed −28, +28, 0, silence, and explicit microphone-stop tests, and changing from a C-harp whole-step target to a G-harp whole-step target displayed E4. Earlier generated-signal tests covered 126 measurements across 21 targets at 44.1/48 kHz with worst error about 0.64 cents; those are synthetic results, not measurements of a real instrument. Earlier denial and pending-request cancellation tests passed. Real harmonica/device testing and a timed target-player comprehension test remain open.

The standalone HTML and submission ZIP are regenerated from the current sources and screenshots. The ZIP contains the page, editable source, desktop/mobile/form views, README, and four-sentence explanation. This internal checklist is not added to the submitted design explanation.

## Later interaction enhancement requested by Aman

The user explicitly requested a realistic scroll-driven harmonica while preserving all existing content and design. A separate instrument artwork layer was added without changing the original page copy, layout dimensions, target controls, or pitch algorithm. Its covers, comb, and reeds illustrate the physical instrument; they do not pretend to be Ratatune’s product screen or replace the functioning browser proof. The earlier rejection checks must be read with this distinction.

Scroll moves, contracts, and expands the instrument between existing spaces; hover adds tilt and pressing it exposes the reed plates. Reduced-motion mode uses a static instrument. Source comparison and browser measurements confirmed unchanged original text and geometry at mobile and desktop sizes. Overlap/overflow checks at five widths and keyboard, modal, accessibility, and simulated audio integration checks passed. Real-harmonica validation and final external approval remain unverified.

### Refinement within existing sections

Following the user’s explicit instruction to add no sections, the same artwork now uses a continuous timeline: complete instrument, hole-3 close-up at the bend strip, paired reeds/illustrative draw airflow beside the explanation, and reassembly at the invitation. Original header, main content, footer, and form markup are unchanged; there are still three semantic section elements. The route was revised to contract before traversing each empty space, eliminating the previous in-view disappearances in 85 sampled scroll positions across five viewport sizes. No illustration supplies or replaces a live pitch measurement.
