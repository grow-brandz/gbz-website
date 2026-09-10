import { pathToFileURL } from "node:url";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const functionDir = path.dirname(fileURLToPath(import.meta.url));

/**
 * Netlify serverless SSR handler.
 * Serves the same render pipeline as Express production.
 */
export async function handler(event) {
  try {
    const url = event.rawUrl
      ? new URL(event.rawUrl).pathname + (new URL(event.rawUrl).search || "")
      : event.path || "/";

      const templatePath = path.resolve(functionDir, "../../dist/server/template.html");
      const serverEntry = path.resolve(functionDir, "../../dist/server/entry-server.js");
    const template = fs.readFileSync(templatePath, "utf-8");
    const { render, getServerData, serializeState } = await import(
      pathToFileURL(serverEntry).href
    );

    const initialData = await getServerData(url);
    const { html, helmet } = await render(url, initialData);

    const head = `
      ${helmet?.title?.toString() || ""}
      ${helmet?.meta?.toString() || ""}
      ${helmet?.link?.toString() || ""}
      ${helmet?.script?.toString() || ""}
    `;

    const stateScript = `<script>window.__INITIAL_DATA__=${serializeState(
      initialData
    )}</script>`;

    const documentHtml = template
      .replace("<!--app-head-->", head)
      .replace("<!--app-html-->", html)
      .replace("</body>", `${stateScript}</body>`);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
      body: documentHtml,
    };
  } catch (error) {
    console.error("[Netlify SSR]", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "text/plain" },
      body: "Internal Server Error",
    };
  }
}
