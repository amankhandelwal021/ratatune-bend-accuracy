export default function PageFooter() {
  return (
    <footer className="site-footer wrap">
      <a className="wordmark" href="#" aria-label="Ratatune home">
        ratatune<span className="brand-period">.</span>
      </a>
      <p>A little less guessing. A little more in tune.</p>
      <span>
        ©{" "}
        <span id="year" suppressHydrationWarning>
          {new Date().getFullYear()}
        </span>{" "}
        Ratatune
      </span>
    </footer>
  );
}
