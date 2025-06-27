import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./components/App.jsx";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>
);
