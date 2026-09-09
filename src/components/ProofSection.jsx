export default function ProofSection() {
  return (
    <section
      className="proof-section simple-proof"
      aria-labelledby="proof-heading"
    >
      <div className="wrap proof-heading-row">
        <div>
          <p className="eyebrow">YOUR BEND. YOUR READING.</p>
          <h2 id="proof-heading">
            Hold the note.
            <br />
            Watch the distance close.
          </h2>
        </div>
        <div className="proof-explanation">
          <p>
            On a C harp, the 3-draw whole-step bend lands on A4. The live
            reading tells you how far above or below that target you’re holding
            the note.
          </p>
          <p>
            If it reads flat, ease off the bend. If it reads sharp, bring it
            down a little. Get close to zero, then listen to how that position
            feels.
          </p>
          <span>
            This prototype uses A4 = 440 Hz and a ±5-cent guide.
            <br />
            Your phrasing — and your blue notes — are still yours.
          </span>
        </div>
      </div>
    </section>
  );
}
