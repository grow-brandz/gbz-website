import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";

const container = document.getElementById("onceadev");
const initialData = window.__INITIAL_DATA__ ?? null;

if (window.__INITIAL_DATA__) {
  delete window.__INITIAL_DATA__;
}

const app = (
  <HelmetProvider>
    <App initialData={initialData} />
  </HelmetProvider>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
