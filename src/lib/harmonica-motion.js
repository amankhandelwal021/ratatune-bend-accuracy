export function createHarmonicaMotion({
  root,
  layer,
  stage,
  touch,
  object,
  getState,
}) {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const listeners = new AbortController();
  let disposed = false;
  const listen = (node, type, handler, options = {}) =>
    node.addEventListener(type, handler, {
      ...options,
      signal: listeners.signal,
    });
  const clamp = (n, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
  const mix = (a, b, t) => a + (b - a) * t;
  const smooth = (t) => t * t * (3 - 2 * t);
  let anchors = [],
    blockers = [],
    viewport = { width: innerWidth, height: innerHeight };
  let frame = 0,
    measureNeeded = true,
    scroll = scrollY,
    lastTime = 0;
  let inspect = null,
    pressure = false,
    tiltX = 0,
    tiltY = 0,
    desiredX = 0,
    desiredY = 0,
    opening = 0;

  function bounds(selector) {
    const r = root.querySelector(selector).getBoundingClientRect();
    return {
      x: r.x,
      y: r.y + scrollY,
      right: r.right,
      bottom: r.bottom + scrollY,
      width: r.width,
      height: r.height,
    };
  }
  function measure() {
    viewport = { width: innerWidth, height: innerHeight };
    const hero = bounds(".hero"),
      copy = bounds(".hero-copy"),
      demo = bounds(".demo-column");
    const strip = bounds(".bend-strip"),
      proof = bounds(".simple-proof");
    const proofCopy = bounds(".proof-heading-row"),
      invitation = bounds(".invitation-copy");
    const questions = bounds(".questions");
    const footerItems = Array.from(
      root.querySelectorAll(".site-footer > *"),
    ).map((e) => e.getBoundingClientRect().top + scrollY);
    const desktop = viewport.width > 640;
    const firstTop = desktop ? copy.bottom : Math.max(copy.bottom, demo.bottom);
    const firstWidth = desktop ? copy.width : hero.width;
    function slot(top, bottom, width, x = viewport.width / 2) {
      return {
        x,
        y: (top + bottom) / 2,
        corridorY: (top + bottom) / 2,
        width: Math.max(60, Math.min(width, (bottom - top - 10) / 0.22)),
      };
    }
    anchors = [
      slot(
        firstTop,
        hero.bottom,
        Math.min(firstWidth - 24, 580),
        desktop ? copy.x + copy.width / 2 : viewport.width / 2,
      ),
      slot(strip.bottom, proof.y, Math.min(hero.width, 490)),
      slot(proofCopy.bottom, invitation.y, Math.min(hero.width - 12, 640)),
      slot(
        Math.max(invitation.bottom, questions.bottom),
        Math.min(...footerItems),
        Math.min(hero.width - 12, 560),
      ),
    ];
    anchors[0].corridorY =
      (Math.max(copy.bottom, demo.bottom) + hero.bottom) / 2;
    // These are measured only when layout changes, never on every scroll event.
    blockers = Array.from(
      root.querySelectorAll(
        ".site-header, .hero-copy, .demo-column, .bend-strip, .proof-heading-row, .invitation-copy, .questions, .site-footer > *",
      ),
    ).map((e) => {
      const r = e.getBoundingClientRect();
      return {
        left: r.left - 3,
        right: r.right + 3,
        top: r.top + scrollY - 3,
        bottom: r.bottom + scrollY + 3,
      };
    });
    viewport.gutter = hero.x;
    measureNeeded = false;
  }

  function pose() {
    const { width, height, gutter } = viewport;
    if (reduced.matches)
      return {
        x: anchors[2].x,
        y: anchors[2].y - scrollY,
        width: anchors[2].width,
        angle: 0,
        flight: 0,
        progress: 0,
        chapter: 0,
      };
    const start = Math.max(0, anchors[0].y - height * 0.65);
    const finish = Math.max(
      start + 1,
      document.documentElement.scrollHeight - height,
    );
    const focus = mix(
      anchors[0].y,
      anchors[anchors.length - 1].y,
      clamp((scroll - start) / (finish - start)),
    );
    let a = anchors[0],
      b = a,
      t = 0,
      chapter = 0;
    if (focus >= anchors[anchors.length - 1].y) {
      a = b = anchors[anchors.length - 1];
      chapter = anchors.length - 1;
    } else if (focus > a.y) {
      for (let i = 0; i < anchors.length - 1; i++) {
        if (focus >= anchors[i].y && focus < anchors[i + 1].y) {
          a = anchors[i];
          b = anchors[i + 1];
          t = clamp((focus - a.y) / (b.y - a.y));
          chapter = i + t;
          break;
        }
      }
    }
    const railX = width - Math.max(9, gutter / 2);
    const compact = Math.max(8, Math.min(70, gutter - 10));
    const railWidth = Math.max(compact, Math.min(230, (gutter - 12) / 0.255));
    // Shrink inside an empty space, move along that space, then turn in the gutter.
    // The return follows the reverse order, so the object stays clear of all copy.
    const route = [
      { t: 0, x: a.x, y: a.y, width: a.width, angle: 0, flight: 0 },
      { t: 0.16, x: a.x, y: a.y, width: a.width, angle: 0, flight: 0 },
      { t: 0.3, x: a.x, y: a.corridorY, width: compact, angle: 0, flight: 0.4 },
      {
        t: 0.4,
        x: railX,
        y: a.corridorY,
        width: compact,
        angle: 0,
        flight: 0.7,
      },
      {
        t: 0.46,
        x: railX,
        y: a.corridorY,
        width: compact,
        angle: 88,
        flight: 1,
      },
      {
        t: 0.51,
        x: railX,
        y: mix(a.corridorY, b.corridorY, 0.2),
        width: railWidth,
        angle: 88,
        flight: 1,
      },
      {
        t: 0.64,
        x: railX,
        y: b.corridorY,
        width: railWidth,
        angle: 88,
        flight: 1,
      },
      {
        t: 0.69,
        x: railX,
        y: b.corridorY,
        width: compact,
        angle: 88,
        flight: 1,
      },
      {
        t: 0.74,
        x: railX,
        y: b.corridorY,
        width: compact,
        angle: 0,
        flight: 0.7,
      },
      {
        t: 0.84,
        x: b.x,
        y: b.corridorY,
        width: compact,
        angle: 0,
        flight: 0.4,
      },
      { t: 0.94, x: b.x, y: b.y, width: b.width, angle: 0, flight: 0 },
      { t: 1, x: b.x, y: b.y, width: b.width, angle: 0, flight: 0 },
    ];
    const i = Math.max(
      0,
      route.findIndex(
        (key, index) => index < route.length - 1 && t <= route[index + 1].t,
      ),
    );
    const from = route[i],
      to = route[i + 1];
    const local = smooth(clamp((t - from.t) / (to.t - from.t)));
    const p = {};
    for (const key of ["x", "y", "width", "angle", "flight"])
      p[key] = mix(from[key], to[key], local);
    p.y -= scrollY;
    p.chapter = chapter;
    p.progress = chapter / 3;
    return p;
  }

  function draw(now) {
    frame = 0;
    if (disposed || document.hidden) return;
    if (measureNeeded) measure();
    const delta = Math.min(64, lastTime ? now - lastTime : 16);
    lastTime = now;
    const ease = reduced.matches ? 1 : 1 - Math.exp(-delta / 70);
    scroll = mix(scroll, scrollY, ease);
    tiltX = mix(tiltX, reduced.matches ? 0 : desiredX, ease);
    tiltY = mix(tiltY, reduced.matches ? 0 : desiredY, ease);
    const p = pose();
    const closeup = reduced.matches
      ? 0
      : smooth(clamp(p.chapter / 0.8)) *
        (1 - smooth(clamp((p.chapter - 1.2) / 0.6)));
    const cutaway = reduced.matches
      ? 0
      : smooth(clamp((p.chapter - 1.25) / 0.65)) *
        (1 - smooth(clamp((p.chapter - 2.2) / 0.7)));
    const targetOpening =
      (inspect === null ? cutaway * 36 : inspect ? 36 : 0) +
      (pressure ? -5 : 0);
    opening = mix(opening, targetOpening, ease);
    const radians = (p.angle * Math.PI) / 180;
    const visualWidth =
      Math.abs(Math.cos(radians)) * p.width +
      Math.abs(Math.sin(radians)) * p.width * 0.22;
    const visualHeight =
      Math.abs(Math.sin(radians)) * p.width +
      Math.abs(Math.cos(radians)) * p.width * 0.22;
    const box = {
      left: p.x - visualWidth / 2,
      right: p.x + visualWidth / 2,
      top: p.y + scrollY - visualHeight / 2,
      bottom: p.y + scrollY + visualHeight / 2,
    };
    const intersects = blockers.some(
      (b) =>
        box.right > b.left &&
        box.left < b.right &&
        box.bottom > b.top &&
        box.top < b.bottom,
    );
    const inView =
      p.y + visualHeight / 2 > 0 && p.y - visualHeight / 2 < viewport.height;
    const visible = !intersects && inView && !getState().dialogOpen;
    // A safety guard for unexpected layout changes; normal routes stay visible.
    stage.style.opacity = visible ? "1" : "0";
    stage.style.transform = `translate3d(${(p.x - 500).toFixed(2)}px,${(p.y - 110).toFixed(2)}px,0) rotate(${p.angle.toFixed(2)}deg) scale(${(p.width / 1000).toFixed(5)})`;
    stage.classList.add("is-ready");
    const platesOpen = targetOpening > 18;
    touch.setAttribute("aria-pressed", String(platesOpen));
    touch.setAttribute(
      "aria-label",
      platesOpen
        ? "Close harmonica reed plates"
        : "Inspect harmonica reed plates",
    );
    const docked = visible && p.flight < 0.15 && p.width * 0.22 >= 44;
    stage.classList.toggle("is-docked", docked);
    touch.tabIndex = docked ? 0 : -1;
    touch.style.visibility = visible ? "visible" : "hidden";
    object.style.setProperty("--harp-tilt-x", `${tiltX.toFixed(2)}deg`);
    object.style.setProperty(
      "--harp-tilt-y",
      `${(tiltY + (reduced.matches ? 0 : Math.sin(p.progress * Math.PI * 2) * 7)).toFixed(2)}deg`,
    );
    object.style.setProperty("--harp-open-top", `${(-opening).toFixed(2)}px`);
    object.style.setProperty(
      "--harp-open-bottom",
      `${(opening * 0.7).toFixed(2)}px`,
    );
    object.style.setProperty(
      "--harp-draw-plate",
      `${(opening * 0.15).toFixed(2)}px`,
    );
    object.style.setProperty(
      "--harp-open-reeds",
      `${(-opening * 0.25).toFixed(2)}px`,
    );
    object.style.setProperty(
      "--harp-camera-scale",
      (1 + closeup * 1.3).toFixed(4),
    );
    object.style.setProperty(
      "--harp-camera-x",
      `${(-mix(500, 283, closeup)).toFixed(2)}px`,
    );
    object.style.setProperty(
      "--harp-focus",
      (Math.max(closeup, cutaway) * 0.9).toFixed(3),
    );
    object.style.setProperty(
      "--harp-airflow",
      (cutaway * clamp(opening / 36) * 0.85).toFixed(3),
    );
    object.style.setProperty(
      "--harp-flow-offset",
      (-Math.max(0, p.chapter - 1.25) * 190).toFixed(2),
    );
    const reedMotion = reduced.matches
      ? 0
      : Math.sin(p.chapter * Math.PI * 22) * cutaway * 5;
    object.style.setProperty(
      "--harp-reed-upper",
      `${reedMotion.toFixed(2)}deg`,
    );
    object.style.setProperty(
      "--harp-reed-lower",
      `${(-reedMotion * 0.8).toFixed(2)}deg`,
    );
    stage.dataset.story =
      p.chapter < 0.6
        ? "whole"
        : p.chapter < 1.5
          ? "third-hole"
          : p.chapter < 2.65
            ? "reeds"
            : "return";
    object.style.setProperty(
      "--harp-light",
      `${(150 + p.progress * 1000 + tiltY * 12).toFixed(1)}px`,
    );
    const live = getState().live;
    object.style.setProperty(
      "--harp-breath",
      live ? (getState().inTune ? ".32" : ".18") : "0",
    );
    object.style.setProperty(
      "--harp-tone",
      getState().inTune ? "#dceca2" : "#df9977",
    );
    layer.classList.toggle("is-hidden", getState().dialogOpen);
    if (
      Math.abs(scroll - scrollY) > 0.12 ||
      (Math.abs(tiltX - desiredX) > 0.06 && !reduced.matches) ||
      (Math.abs(tiltY - desiredY) > 0.06 && !reduced.matches) ||
      Math.abs(opening - targetOpening) > 0.06
    )
      schedule();
  }
  function schedule() {
    if (!disposed && !frame && !document.hidden)
      frame = requestAnimationFrame(draw);
  }
  function remeasure() {
    measureNeeded = true;
    schedule();
  }
  listen(
    window,
    "scroll",
    () => {
      inspect = null;
      schedule();
    },
    { passive: true },
  );
  listen(window, "resize", remeasure, { passive: true });
  listen(window, "pageshow", remeasure);
  listen(document, "visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
    } else {
      scroll = scrollY;
      remeasure();
    }
  });
  listen(reduced, "change", () => {
    desiredX = desiredY = 0;
    scroll = scrollY;
    remeasure();
  });
  const resize = new ResizeObserver(remeasure);
  [
    root.querySelector("main"),
    root.querySelector(".hero"),
    root.querySelector(".questions"),
    root.querySelector(".site-footer"),
  ].forEach((e) => resize.observe(e));
  listen(touch, "pointermove", (event) => {
    if (reduced.matches || event.pointerType === "touch") return;
    const r = touch.getBoundingClientRect();
    desiredY = clamp((event.clientX - r.left) / r.width, 0, 1) * 18 - 9;
    desiredX = 5 - clamp((event.clientY - r.top) / r.height, 0, 1) * 10;
    schedule();
  });
  listen(touch, "pointerleave", () => {
    desiredX = desiredY = 0;
    pressure = false;
    schedule();
  });
  listen(touch, "pointerdown", () => {
    pressure = true;
    schedule();
  });
  listen(
    window,
    "pointerup",
    () => {
      if (pressure) {
        pressure = false;
        schedule();
      }
    },
    { passive: true },
  );
  listen(touch, "pointercancel", () => {
    pressure = false;
    schedule();
  });
  listen(touch, "click", () => {
    inspect = opening < 18;
    touch.setAttribute("aria-pressed", String(inspect));
    touch.setAttribute(
      "aria-label",
      inspect ? "Close harmonica reed plates" : "Inspect harmonica reed plates",
    );
    schedule();
  });
  listen(touch, "keydown", (event) => {
    if (event.key === "Escape") {
      inspect = false;
      touch.setAttribute("aria-pressed", "false");
      touch.setAttribute("aria-label", "Inspect harmonica reed plates");
      desiredX = desiredY = 0;
      schedule();
    }
  });
  schedule();
  return {
    update: schedule,
    dispose() {
      disposed = true;
      listeners.abort();
      resize.disconnect();
      cancelAnimationFrame(frame);
      layer.classList.remove("is-hidden");
      stage.classList.remove("is-ready", "is-docked");
    },
  };
}
