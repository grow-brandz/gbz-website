const WORDPRESS_BLOGS =
  "https://lightpink-duck-532990.hostingersite.com/wp-json/growbrandz/v1/blogs";

const BLOG_TITLES = [
  "How to Create a D2C Marketing Strategy for a New Product Launch?",
  "D2C Marketing Services Explained: What Delivers Real ROI",
  "D2C Whatsapp Marketing",
  "Ecommerce Performance Marketing",
];

function normalizeTitle(value) {
  return String(value || "")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

const FETCH_TIMEOUT_MS = typeof window === "undefined" ? 2500 : 15000;
const CACHE_TTL_MS = 5 * 60 * 1000;

let cachedPosts = null;
let cachedAt = 0;
let inflight = null;

export function formatWordPressPost(post) {
  const sections = Array.isArray(post.content) ? post.content : [];

  return {
    id: post.id,
    slug: post.slug,
    title: post.post_title || post.title || "",
    excerpt: post.description || "",
    content: "",
    sections,
    date: post.date || "",
    link: `/blog/${post.slug}`,
    image: post.banner_image || post.featured_image || "",
    category: "Blog",
  };
}

function selectBlogPosts(posts) {
  return BLOG_TITLES.map((title) =>
    posts.find((post) => normalizeTitle(post.post_title) === normalizeTitle(title)),
  )
    .filter(Boolean)
    .map(formatWordPressPost);
}

export function getCachedBlogPosts() {
  if (!cachedPosts) return null;
  if (Date.now() - cachedAt > CACHE_TTL_MS) return null;
  return cachedPosts;
}

export function loadBlogPosts() {
  const cached = getCachedBlogPosts();
  if (cached) return Promise.resolve(cached);

  if (!inflight) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    inflight = fetch(WORDPRESS_BLOGS, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Blog API Error: ${response.status}`);
        }
        return response.json();
      })
      .then((posts) => {
        const list = Array.isArray(posts) ? posts : posts?.data || [];
        cachedPosts = selectBlogPosts(list);
        cachedAt = Date.now();
        return cachedPosts;
      })
      .catch((error) => {
        inflight = null;
        throw error;
      })
      .finally(() => {
        clearTimeout(timer);
      });
  }

  return inflight;
}

export function getBlogPageData() {
  return loadBlogPosts().then((posts) => ({ data: posts }));
}
