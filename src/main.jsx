import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

// ======================================================
// ROOT ELEMENT
// ======================================================

const rootElement = document.getElementById("root");

// ======================================================
// CHECK ROOT
// ======================================================

if (!rootElement) {
  throw new Error(
    'Root element not found. Make sure index.html contains <div id="root"></div>.'
  );
}

// ======================================================
// CREATE REACT ROOT
// ======================================================

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);