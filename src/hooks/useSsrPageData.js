import { useEffect, useState } from "react";
import { useInitialData } from "../ssr/InitialDataContext.jsx";
import { unwrapApi } from "../ssr/unwrapApi.js";

/**
 * Use SSR-injected page data for the matching route; otherwise fetch once on the client.
 * Skips refetch after hydration when SSR returned real CMS data.
 * If SSR used a timeout fallback, paint immediately then upgrade from the client fetch.
 */
export function useSsrPageData(routePath, fetcher) {
  const initial = useInitialData();
  const ssrMatches = initial?.path === routePath && initial?.pageData != null;
  const hasCompleteSsr = ssrMatches && !initial?.usedFallback && !initial?.error;

  const [pageData, setPageData] = useState(
    ssrMatches ? initial.pageData : null
  );

  useEffect(() => {
    if (hasCompleteSsr) return;

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
  }, [hasCompleteSsr, fetcher, routePath]);

  return pageData;
}
