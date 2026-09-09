const keyNames = {
  0: "C",
  "-3": "A",
  "-2": "B♭",
  "-5": "G",
  2: "D",
  5: "F",
  4: "E",
};
const bendNames = {
  1: "Half-step bend",
  2: "Whole-step bend",
  3: "1½-step bend",
};
const harpKeys = ["0", "-3", "-2", "-5", "2", "5", "4"];

export default function BendDemo({ demo }) {
  const { cents, mode } = demo;
  const hasPitch = Number.isFinite(cents);
  const rounded = hasPitch ? Math.round(cents) : null;
  const inTune = hasPitch && Math.abs(cents) <= 5;
  const direction = !hasPitch
    ? "off target"
    : inTune
      ? "on target"
      : cents < 0
        ? "flat"
        : "sharp";
  const value = !hasPitch
    ? "—"
    : rounded < 0
      ? "−" + Math.abs(rounded)
      : rounded > 0
        ? "+" + rounded
        : "0";
  const readingLabel = hasPitch
    ? `${Math.abs(rounded)} cents ${inTune ? "from target, within the 5-cent guide" : direction}`
    : mode === "mic"
      ? "Waiting for a clear single note"
      : "No pitch measured yet";
  const readingMode =
    mode === "mic"
      ? hasPitch
        ? "YOUR LIVE PITCH"
        : "LISTENING FOR YOUR BEND"
      : mode === "requesting"
        ? "WAITING FOR MIC PERMISSION"
        : "MICROPHONE OFF";
  const feedback = !hasPitch
    ? mode === "mic"
      ? "Play one clear note and hold it."
      : "Play a bend. See where it lands."
    : inTune
      ? "Within 5 cents. Hold this pitch and listen."
      : cents < 0
        ? "A little low. Ease off the bend."
        : "A little high. Deepen the bend.";

  return (
    <div className="demo-column">
      <div className="demo-kicker">
        <span>LESS GUESSWORK. MORE FEEDBACK.</span>
        <span aria-hidden="true">↓</span>
      </div>
      <div
        className="bend-check simple-demo"
        id="bend-check"
        role="region"
        aria-label="Live microphone pitch demo, browser prototype"
      >
        <div className="check-header">
          <span className="check-title">Check your bend</span>
          <span className="prototype-badge">BROWSER PROTOTYPE</span>
        </div>
        <div className="target-display">
          <div>
            <span className="target-caption">YOUR TARGET</span>
            <div className="target-note">
              <strong id="target-note">{demo.note}</strong>
              <span id="target-frequency">
                {Math.round(demo.frequency * 10) / 10} Hz
              </span>
            </div>
          </div>
          <p id="target-context">
            {keyNames[demo.harpKey]} harp · 3 draw
            <br />
            {bendNames[demo.bend]}
          </p>
        </div>
        <details className="demo-settings" id="demo-settings">
          <summary>
            Change harp or bend <span aria-hidden="true">+</span>
          </summary>
          <div className="target-controls">
            <label className="control-label">
              HARP KEY
              <select
                id="harp-key"
                aria-label="Harmonica key"
                value={demo.harpKey}
                onChange={(event) => demo.setHarpKey(event.target.value)}
              >
                {harpKeys.map((key) => (
                  <option key={key} value={key}>
                    {keyNames[key]} harp
                  </option>
                ))}
              </select>
            </label>
            <label className="control-label control-bend">
              BEND TARGET
              <select
                id="bend-target"
                aria-label="Draw bend target"
                value={demo.bend}
                onChange={(event) => demo.setBend(event.target.value)}
              >
                <option value="1">3 draw · half step</option>
                <option value="2">3 draw · whole step</option>
                <option value="3">3 draw · 1½ steps</option>
              </select>
            </label>
          </div>
        </details>
        <div className="mic-action">
          <button
            className="mic-button"
            id="mic-button"
            aria-pressed={mode === "mic"}
            onClick={demo.toggle}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <rect x="9" y="3" width="6" height="12" rx="3" />
              <path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8" />
            </svg>
            <span id="mic-label">
              {mode === "mic"
                ? "Stop mic"
                : mode === "requesting"
                  ? "Cancel mic request"
                  : "Use my mic"}
            </span>
          </button>
          <p className="demo-status" id="demo-status" role="status">
            {demo.status}
          </p>
        </div>
        <div className="live-reading-area">
          <p className="reading-mode" id="reading-mode">
            {readingMode}
          </p>
          <div
            className={[
              "reading",
              inTune && "in-tune",
              !hasPitch && "no-pitch",
              hasPitch && Math.abs(rounded) >= 1000 && "wide-reading",
            ]
              .filter(Boolean)
              .join(" ")}
            id="reading"
            role="img"
            aria-label={readingLabel}
          >
            <span className="cents-value" id="cents-value">
              {value}
            </span>
            <div className="cents-unit">
              <span>cents</span>
              <strong id="pitch-direction">{direction}</strong>
            </div>
          </div>
          <p className="live-feedback" id="feedback-text">
            {feedback}
          </p>
        </div>
      </div>
      <p className="prototype-note">
        Live browser prototype · Ratatune is still in development.
        <br />
        Your audio stays on this device.
      </p>
    </div>
  );
}
