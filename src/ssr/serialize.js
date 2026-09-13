/** Escape JSON for safe inline <script> injection (prevents XSS via </script>). */
export function serializeState(state) {
  return JSON.stringify(state).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
}
