export default function PageHeader({ onAccess }) {
  return (
    <header className="site-header wrap">
      <a href="#" className="wordmark" aria-label="Ratatune home">
        <span className="brand-mark" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
        ratatune<span className="brand-period">.</span>
      </a>
      <div className="header-context">
        Harmonica <span>/</span> Bend accuracy
      </div>
      <button
        className="button button-small button-outline"
        data-access=""
        onClick={onAccess}
      >
        Get Early Access <span aria-hidden="true">↗</span>
      </button>
    </header>
  );
}
