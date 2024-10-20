/**
 * @copyright 2024 codewithmutahir
 *  @license   Apache-2.0
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

/**
 * CSS links
 */

import "lenis/dist/lenis.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <App />
  </StrictMode>
);
