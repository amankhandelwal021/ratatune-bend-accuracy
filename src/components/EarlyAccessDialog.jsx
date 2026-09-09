import { useEffect, useRef, useState } from "react";

export default function EarlyAccessDialog({ open, onClose }) {
  const dialog = useRef(null);
  const emailInput = useRef(null);
  const done = useRef(null);
  const [email, setEmail] = useState("");
  const [harpKey, setHarpKey] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const element = dialog.current;
    if (!open) return;
    setEmail("");
    setHarpKey("");
    setError("");
    setSuccess(false);
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (open) (success ? done.current : emailInput.current)?.focus();
  }, [open, success]);

  function close() {
    dialog.current.close();
  }

  function onBackdrop(event) {
    if (event.target !== dialog.current) return;
    const rect = dialog.current.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      close();
  }

  function onSubmit(event) {
    event.preventDefault();
    const trimmed = email.trim();
    setEmail(trimmed);
    // Validate the trimmed value as the original form did, before React commits it.
    const probe = document.createElement("input");
    probe.type = "email";
    probe.required = true;
    probe.value = trimmed;
    if (
      !probe.validity.valid ||
      trimmed.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
    ) {
      setError("Enter a valid email address, such as you@example.com.");
      emailInput.current.focus();
      return;
    }
    // This assessment previews the flow; it never submits or persists personal data.
    setError("");
    setEmail("");
    setHarpKey("");
    setSuccess(true);
  }

  return (
    <dialog
      ref={dialog}
      id="access-dialog"
      aria-labelledby={success ? "preview-success-title" : "access-title"}
      aria-describedby={success ? undefined : "access-description"}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        close();
      }}
      onClick={onBackdrop}
    >
      <button
        className="close-dialog"
        id="close-dialog"
        onClick={close}
        aria-label="Close early access form"
      >
        ×
      </button>
      <div id="form-view" hidden={success}>
        <p className="eyebrow">
          <span className="status-dot" aria-hidden="true"></span> RATATUNE /
          EARLY ACCESS
        </p>
        <h2 id="access-title">
          Your next bend.
          <br />
          <em>A little less guesswork.</em>
        </h2>
        <p id="access-description">
          Be among the first to hear when bend-accuracy access opens.
        </p>
        <form id="access-form" noValidate onSubmit={onSubmit}>
          <label htmlFor="email">
            Email address <span>required</span>
          </label>
          <input
            id="email"
            ref={emailInput}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
            }}
            aria-invalid={error ? true : undefined}
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
            maxLength="254"
            aria-describedby="email-error"
          />
          <p id="email-error" className="form-error" role="alert">
            {error}
          </p>
          <label htmlFor="usual-key">
            Your usual harp key <span>optional</span>
          </label>
          <select
            id="usual-key"
            name="harpKey"
            value={harpKey}
            onChange={(event) => setHarpKey(event.target.value)}
          >
            <option value="">Choose a key</option>
            <option>C</option>
            <option>A</option>
            <option>B♭</option>
            <option>G</option>
            <option>D</option>
            <option>F</option>
            <option>E</option>
            <option>Another key</option>
          </select>
          <button type="submit" className="button button-primary">
            Get Early Access <span aria-hidden="true">↗</span>
          </button>
          <p className="form-note">
            Preview form — no email is sent or stored.
          </p>
        </form>
      </div>
      <div id="success-view" hidden={!success} role="status">
        <span className="success-icon" aria-hidden="true">
          ✓
        </span>
        <p className="eyebrow">FORM PREVIEW COMPLETE</p>
        <h2 id="preview-success-title">
          That’s all
          <br />
          <em>we’d need.</em>
        </h2>
        <p>
          The early-access flow is ready to connect. This preview hasn’t
          submitted or saved your email.
        </p>
        <button
          className="button button-primary"
          id="done-button"
          ref={done}
          onClick={close}
        >
          Back to the page <span aria-hidden="true">↗</span>
        </button>
      </div>
    </dialog>
  );
}
