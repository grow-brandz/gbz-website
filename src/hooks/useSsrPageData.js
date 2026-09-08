import { useEffect, useState } from "react";
import { useInitialData } from "../ssr/InitialDataContext.jsx";
import { unwrapApi } from "../ssr/unwrapApi.js";

/**
 * Use SSR-injected page data for the matching route; otherwise fetch once on the client.
 * Skips immediate refetch after hydration when SSR data is present.
 */
export function useSsrPageData(routePath, fetcher) {
  const initial = useInitialData();
  const hasSsrData =
    initial?.path === routePath && initial?.pageData != null;

  const [pageData, setPageData] = useState(
    hasSsrData ? initial.pageData : null
  );

  useEffect(() => {
    if (hasSsrData) return;

    let cancelled = false;

    fetcher()
      .then((res) => {
        if (!cancelled) setPageData(unwrapApi(res));
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      cancelled = true;
    };
  }, [hasSsrData, fetcher, routePath]);

  return pageData;
}
