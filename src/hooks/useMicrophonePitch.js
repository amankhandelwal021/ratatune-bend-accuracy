import { useCallback, useEffect, useRef, useState } from "react";
import { createMicrophoneSession, INITIAL_READING } from "../lib/microphone.js";
import { midiToHz, noteName } from "../lib/pitch.js";

export default function useMicrophonePitch() {
  const [harpKey, setHarpKey] = useState("0");
  const [bend, setBend] = useState("2");
  const [reading, setReading] = useState(INITIAL_READING);
  const session = useRef(null);
  const midi = 71 + Number(harpKey) - Number(bend);
  const frequency = midiToHz(midi);

  useEffect(() => {
    const current = createMicrophoneSession({ onChange: setReading });
    session.current = current;
    const onVisibility = () => {
      if (document.hidden)
        current.stop(
          "Microphone stopped while the page was in the background.",
        );
    };
    const onPageHide = () => current.stop();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      current.dispose();
      session.current = null;
    };
  }, []);

  useEffect(() => {
    session.current?.setTarget(frequency);
  }, [frequency]);

  const toggle = useCallback(() => session.current?.toggle(), []);
  const stop = useCallback(() => session.current?.stop(), []);

  return {
    ...reading,
    harpKey,
    bend,
    frequency,
    note: noteName(midi),
    setHarpKey,
    setBend,
    toggle,
    stop,
  };
}
