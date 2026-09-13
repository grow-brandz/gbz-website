const BASE_URL =
  "https://lightpink-duck-532990.hostingersite.com/wp-json/growbrandz/v1";

/**
 * Hostinger is often slow. SSR fails fast so Netlify can still return HTML;
 * the browser may wait longer to upgrade fallback content.
 */
const FETCH_TIMEOUT_MS =
  typeof window === "undefined" ? 2500 : 15000;
const CACHE_TTL_MS = 5 * 60 * 1000;

const responseCache =
  globalThis.__GBZ_API_CACHE__ || (globalThis.__GBZ_API_CACHE__ = new Map());

function getCached(endpoint) {
  const entry = responseCache.get(endpoint);
  if (!entry) return null;
  if (Date.now() - entry.at > CACHE_TTL_MS) {
    responseCache.delete(endpoint);
    return null;
  }
  return entry.data;
}

function setCache(endpoint, data) {
  responseCache.set(endpoint, { at: Date.now(), data });
}

/**
 * Generic API Call — uses warm-instance cache + AbortSignal timeout.
 */
const fetchAPI = async (endpoint) => {
  const cached = getCached(endpoint);
  if (cached) return cached;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    setCache(endpoint, data);
    return data;
  } catch (error) {
    const message =
      error?.name === "AbortError"
        ? `Timeout after ${FETCH_TIMEOUT_MS}ms fetching ${endpoint}`
        : error?.message || error;
    console.error(`Error fetching ${endpoint}:`, message);
    throw error?.name === "AbortError" ? new Error(message) : error;
  } finally {
    clearTimeout(timer);
  }
};

/**
 * Home Page
 */
export const getHomeData = () => fetchAPI("home");

/**
 * About Page
 */
export const getAboutData = () => fetchAPI("about");

/**
 * Our Process Page
 */
export const getOurProcessData = () => fetchAPI("our-process");

/**
 * Services Page
 */
export const getServicesData = () => fetchAPI("services");

/**
 * Our Approach Page
 */
export const getOurApproachData = () => fetchAPI("our-approach");

/**
 * Book A Call Page
 */
export const getBookACallData = () => fetchAPI("book-a-call");

/**
 * Contact Page
 */
export const getContactData = () => fetchAPI("contact");
