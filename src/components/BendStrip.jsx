export default function BendStrip() {
  return (
    <div
      className="bend-strip wrap"
      aria-label="Example bend positions on a C harmonica"
    >
      <div className="strip-label">
        C HARP · 3 DRAW
        <br />
        <strong>FOUR PLACES TO LAND.</strong>
      </div>
      <div className="note-sequence">
        <span>
          <b>B</b>
          <small>3 draw</small>
        </span>
        <i aria-hidden="true">↘</i>
        <span>
          <b>B♭</b>
          <small>½ step</small>
        </span>
        <i aria-hidden="true">↘</i>
        <span className="selected-note">
          <b>A</b>
          <small>whole step</small>
        </span>
        <i aria-hidden="true">↘</i>
        <span>
          <b>A♭</b>
          <small>1½ steps</small>
        </span>
      </div>
      <p>
        Same 3-draw. Different embouchure.
        <br />
        <strong>Know which note you’re holding.</strong>
        <span>C harp · standard Richter tuning</span>
      </p>
    </div>
  );
}
