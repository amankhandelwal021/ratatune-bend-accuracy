export default function Invitation({ onAccess }) {
  return (
    <section
      className="invitation-section wrap"
      aria-labelledby="invitation-heading"
    >
      <div className="invitation-copy">
        <p className="eyebrow">
          <span className="status-dot" aria-hidden="true"></span> BE PART OF
          WHAT COMES NEXT
        </p>
        <h2 id="invitation-heading">
          Bring your harp.
          <br />
          <em>Bring that one bend.</em>
        </h2>
        <p>
          The one you check twice. The one that drifts when you hold it. We’re
          building Ratatune for players who want to know exactly what happened —
          and what to adjust next.
        </p>
        <button
          className="button button-primary"
          data-access=""
          onClick={onAccess}
        >
          Get Early Access <span aria-hidden="true">↗</span>
        </button>
        <p className="access-note">Pre-launch access. No payment details.</p>
      </div>
      <div className="questions" aria-label="Questions about early access">
        <details open>
          <summary>
            Can I use the full feature today?<span aria-hidden="true">+</span>
          </summary>
          <p>
            Ratatune’s bend-accuracy feature is in development. Leave your email
            for early-access updates. The working browser demo above lets you
            explore pitch feedback now.
          </p>
        </details>
        <details>
          <summary>
            What do I need for the demo?<span aria-hidden="true">+</span>
          </summary>
          <p>
            A standard Richter-tuned diatonic harmonica and a device with a
            microphone. The demo starts with a C-harp 3-draw whole-step bend.
            Use “Change harp or bend” for another target, then play a single
            note in a quiet room. A chord or a loud backing track can confuse
            this simple pitch detector.
          </p>
        </details>
        <details>
          <summary>
            Does “in tune” always mean zero cents?
            <span aria-hidden="true">+</span>
          </summary>
          <p>
            Musical context matters. Expressive blue notes and a harmonica’s
            tuning can sit away from equal temperament. This demo measures
            against A4 = 440 Hz and marks ±5 cents as a visual guide, not a rule
            for how to play.
          </p>
        </details>
        <details>
          <summary>
            What happens to my microphone audio?
            <span aria-hidden="true">+</span>
          </summary>
          <p>
            In this browser demo, audio is analyzed on your device. It is not
            recorded or uploaded. Microphone access starts only when you choose
            “Use my mic” and stops when you switch it off or leave the page.
          </p>
        </details>
      </div>
    </section>
  );
}
