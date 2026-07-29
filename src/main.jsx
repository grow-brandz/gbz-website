import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("onceadev")).render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
);
