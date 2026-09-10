import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function run(command, args) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: true,
  });
  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

console.log("Building client...");
run("npx", ["vite", "build", "--outDir", "dist/client"]);

console.log("Building server...");
run("npx", [
  "vite",
  "build",
  "--ssr",
  "src/entry-server.jsx",
  "--outDir",
  "dist/server",
]);

const clientIndex = path.join(root, "dist/client/index.html");
const serverTemplate = path.join(root, "dist/server/template.html");

if (!fs.existsSync(clientIndex)) {
  console.error("Missing dist/client/index.html");
  process.exit(1);
}

fs.copyFileSync(clientIndex, serverTemplate);
// Remove client index so Netlify does not serve empty CSR shell for /
fs.unlinkSync(clientIndex);

const serverPackageJson = path.join(root, "dist/server/package.json");

fs.writeFileSync(
  serverPackageJson,
  JSON.stringify({ type: "module" }, null, 2)
);

console.log("SSR build complete:");
console.log("  dist/client  (static assets)");
console.log("  dist/server  (entry-server.js + template.html)");
