const BASE_URL =
  "https://lightpink-duck-532990.hostingersite.com/wp-json/growbrandz/v1";

/**
 * Generic API Call
 */
const fetchAPI = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
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
