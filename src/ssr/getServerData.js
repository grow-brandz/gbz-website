import {
  getHomeData,
  getAboutData,
  getOurProcessData,
  getServicesData,
  getOurApproachData,
  getBookACallData,
} from "../services/api.js";
import { unwrapApi } from "./unwrapApi.js";
import { SEO_FALLBACKS } from "./seoFallbacks.js";

const ROUTE_LOADERS = {
  "/": getHomeData,
  "/about": getAboutData,
  "/our-process": getOurProcessData,
  "/services": getServicesData,
  "/our-approach": getOurApproachData,
  "/contact": getBookACallData,
};

export function normalizePath(url = "/") {
  try {
    const pathname = url.includes("://")
      ? new URL(url).pathname
      : url.split("?")[0].split("#")[0];
    if (!pathname || pathname === "") return "/";
    if (pathname.length > 1 && pathname.endsWith("/")) {
      return pathname.slice(0, -1);
    }
    return pathname;
  } catch {
    return "/";
  }
}

/**
 * Fetch only the API data required for the current route.
 * Never throws — returns fallback pageData on failure.
 */
export async function getServerData(url) {
  const path = normalizePath(url);
  const loader = ROUTE_LOADERS[path];

  if (!loader) {
    return { path, pageData: null };
  }

  try {
    const response = await loader();
    const pageData = unwrapApi(response);

    if (!pageData) {
      return {
        path,
        pageData: SEO_FALLBACKS[path] || null,
        usedFallback: true,
      };
    }

    return { path, pageData };
  } catch (error) {
    console.error(`[SSR] Failed to load data for ${path}:`, error.message || error);
    return {
      path,
      pageData: SEO_FALLBACKS[path] || null,
      usedFallback: true,
      error: true,
    };
  }
}
