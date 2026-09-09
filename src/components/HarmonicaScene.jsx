import { memo, useMemo, useRef } from "react";
import useHarmonicaMotion from "../hooks/useHarmonicaMotion.js";
import HarmonicaArtwork from "./HarmonicaArtwork.jsx";

const HarmonicaScene = memo(function HarmonicaScene({
  dialogOpen,
  live,
  inTune,
}) {
  const layer = useRef(null);
  const stage = useRef(null);
  const touch = useRef(null);
  const object = useRef(null);
  const refs = useMemo(() => ({ layer, stage, touch, object }), []);
  useHarmonicaMotion(refs, { dialogOpen, live, inTune });

  return (
    <div className="harmonica-layer" id="harmonica-layer" ref={layer}>
      <div className="harmonica-stage" id="harmonica-stage" ref={stage}>
        <button
          className="harmonica-touch"
          id="harmonica-touch"
          ref={touch}
          type="button"
          aria-label="Inspect harmonica reed plates"
          aria-pressed="false"
          title="Move to tilt · press to inspect"
        >
          <span className="harmonica-object" ref={object}>
            <HarmonicaArtwork />
          </span>
        </button>
      </div>
    </div>
  );
});

export default HarmonicaScene;
