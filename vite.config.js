import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Client build defaults; scripts override outDir per target
    manifest: true,
  },
  ssr: {
    // Bundle these for the SSR build so Node can import them cleanly
    noExternal: ["react-helmet-async", "lenis"],
  },
});
