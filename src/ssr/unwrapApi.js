/**
 * Normalize Growbrandz API responses to the page data object.
 * Shape is typically: { success, data: { banner, ... } }
 */
export function unwrapApi(response) {
  if (!response) return null;

  if (response.data) {
    if (response.data.data && typeof response.data.data === "object") {
      return response.data.data;
    }
    return response.data;
  }

  return response;
}
