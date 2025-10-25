// ✅ main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { ToggleProvider } from "./component/context/ToogleBtn.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <ToggleProvider>
    <App />
    </ToggleProvider>
  </BrowserRouter>
);
