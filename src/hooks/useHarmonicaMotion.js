import { useEffect, useRef } from "react";
import { createHarmonicaMotion } from "../lib/harmonica-motion.js";

export default function useHarmonicaMotion(refs, state) {
  const controller = useRef(null);
  const latest = useRef(state);

  useEffect(() => {
    latest.current = state;
    controller.current?.update();
  }, [state.dialogOpen, state.live, state.inTune]);

  useEffect(() => {
    const motion = createHarmonicaMotion({
      root: refs.layer.current.closest("#root"),
      layer: refs.layer.current,
      stage: refs.stage.current,
      touch: refs.touch.current,
      object: refs.object.current,
      getState: () => latest.current,
    });
    controller.current = motion;
    return () => {
      motion.dispose();
      controller.current = null;
    };
  }, [refs]);
}
