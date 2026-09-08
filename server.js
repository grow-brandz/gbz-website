import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const PORT = Number(process.env.PORT) || 5173;

function injectDocument(template, { html, helmet, initialData, serializeState }) {
  const head = `
          ${helmet?.title?.toString() || ""}
          ${helmet?.meta?.toString() || ""}
          ${helmet?.link?.toString() || ""}
          ${helmet?.script?.toString() || ""}
        `;

  const stateScript = `<script>window.__INITIAL_DATA__=${serializeState(
    initialData
  )}</script>`;

  return template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html)
    .replace("</body>", `${stateScript}</body>`);
}

async function createDevServer() {
  const app = express();

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use(async (req, res, next) => {
    try {
      const url = req.originalUrl;

      if (
        url.startsWith("/@") ||
        url.startsWith("/node_modules") ||
        url.startsWith("/src/") ||
        /\.\w+(\?|$)/.test(url)
      ) {
        return next();
      }

      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );

      template = await vite.transformIndexHtml(url, template);

      const { render, getServerData, serializeState } =
        await vite.ssrLoadModule("/src/entry-server.jsx");

      const initialData = await getServerData(url);
      const { html, helmet } = await render(url, initialData);

      const documentHtml = injectDocument(template, {
        html,
        helmet,
        initialData,
        serializeState,
      });

      res
        .status(200)
        .set({ "Content-Type": "text/html" })
        .end(documentHtml);
    } catch (error) {
      vite.ssrFixStacktrace(error);
      console.error(error);
      res
        .status(500)
        .end(isProd ? "Internal Server Error" : String(error.stack || error));
    }
  });

  return app;
}

async function createProdServer() {
  const app = express();
  const clientDir = path.resolve(__dirname, "dist/client");
  const templatePath = path.resolve(__dirname, "dist/server/template.html");
  const serverEntry = path.resolve(__dirname, "dist/server/entry-server.js");

  const template = fs.readFileSync(templatePath, "utf-8");
  const { render, getServerData, serializeState } = await import(
    pathToFileURL(serverEntry).href
  );

  app.use(
    express.static(clientDir, {
      index: false,
      maxAge: "1y",
      immutable: true,
    })
  );

  app.use(async (req, res) => {
    try {
      const url = req.originalUrl;
      const initialData = await getServerData(url);
      const { html, helmet } = await render(url, initialData);

      const documentHtml = injectDocument(template, {
        html,
        helmet,
        initialData,
        serializeState,
      });

      res
        .status(200)
        .set({ "Content-Type": "text/html" })
        .end(documentHtml);
    } catch (error) {
      console.error(error);
      res.status(500).end("Internal Server Error");
    }
  });

  return app;
}

const app = isProd ? await createProdServer() : await createDevServer();

app.listen(PORT, () => {
  console.log(
    `SSR server (${isProd ? "production" : "development"}) running at http://localhost:${PORT}`
  );
});
