import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";

import "./index.css";

// comentario
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
