import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/styles.css";
import "./styles/harmonica-motion.css";

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML is generated from the same components for an immediate first paint.
if (container.hasChildNodes()) hydrateRoot(container, app);
else createRoot(container).render(app);
