import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import AppContent from "./AppContent.jsx";
import { InitialDataProvider } from "./ssr/InitialDataContext.jsx";

export async function render(url, initialData = null) {
  const helmetContext = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <InitialDataProvider value={initialData}>
          <AppContent />
        </InitialDataProvider>
      </StaticRouter>
    </HelmetProvider>
  );

  return {
    html,
    helmet: helmetContext.helmet,
  };
}

export { getServerData } from "./ssr/getServerData.js";
export { serializeState } from "./ssr/serialize.js";
