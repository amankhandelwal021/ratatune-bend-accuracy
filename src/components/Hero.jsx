import BendDemo from "./BendDemo.jsx";

export default function Hero({ onAccess, demo }) {
  return (
    <section className="hero wrap" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="small-line" aria-hidden="true"></span> FOR THE NOTES
          BETWEEN THE NOTES
        </p>
        <h1 id="hero-heading">
          Finally hear whether your bends are actually <em>in tune.</em>
        </h1>
        <p className="hero-description">
          Ratatune listens through your mic and shows how far each draw bend is
          from its target, in cents.
        </p>
        <button
          className="button button-primary"
          data-access=""
          onClick={onAccess}
        >
          Get Early Access <span aria-hidden="true">↗</span>
        </button>
        <p className="access-note">
          <span className="status-dot" aria-hidden="true"></span> In
          development. For harmonica players like you.
        </p>
      </div>

      <BendDemo demo={demo} />
    </section>
  );
}
