import { useCallback, useRef, useState } from "react";
import PageHeader from "./components/PageHeader.jsx";
import Hero from "./components/Hero.jsx";
import BendStrip from "./components/BendStrip.jsx";
import ProofSection from "./components/ProofSection.jsx";
import Invitation from "./components/Invitation.jsx";
import PageFooter from "./components/PageFooter.jsx";
import EarlyAccessDialog from "./components/EarlyAccessDialog.jsx";
import HarmonicaScene from "./components/HarmonicaScene.jsx";
import useMicrophonePitch from "./hooks/useMicrophonePitch.js";

export default function App() {
  const demo = useMicrophonePitch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const returnFocus = useRef(null);
  const openAccess = useCallback(
    (event) => {
      returnFocus.current = event.currentTarget;
      if (demo.mode !== "idle") demo.stop();
      setDialogOpen(true);
    },
    [demo.stop, demo.mode],
  );
  const closeAccess = useCallback(() => {
    setDialogOpen(false);
    returnFocus.current?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <PageHeader onAccess={openAccess} />
      <main id="main">
        <Hero onAccess={openAccess} demo={demo} />
        <BendStrip />
        <ProofSection />
        <Invitation onAccess={openAccess} />
      </main>
      <PageFooter />
      <EarlyAccessDialog open={dialogOpen} onClose={closeAccess} />
      <HarmonicaScene
        dialogOpen={dialogOpen}
        live={demo.mode === "mic" && Number.isFinite(demo.cents)}
        inTune={Number.isFinite(demo.cents) && Math.abs(demo.cents) <= 5}
      />
    </>
  );
}
