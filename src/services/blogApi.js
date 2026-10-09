import { firstBlogPost } from "../content/firstBlogPost.js";
import { secondBlogPost } from "../content/secondBlogPost.js";
import { thirdBlogPost } from "../content/thirdBlogPost.js";
import { fourthBlogPost } from "../content/fourthBlogPost.js";

const WORDPRESS_POSTS =
  "https://lightpink-duck-532990.hostingersite.com/wp-json/wp/v2/posts?_embed&per_page=12";

const FETCH_TIMEOUT_MS = typeof window === "undefined" ? 2500 : 15000;
const CACHE_TTL_MS = 5 * 60 * 1000;

let cachedPosts = null;
let cachedAt = 0;
let inflight = null;

export function formatWordPressPost(post) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title?.rendered || "",
    excerpt: post.excerpt?.rendered || "",
    content: post.content?.rendered || "",
    date: post.date,
    link: `/blog/${post.slug}`,
    image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
    category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Blog",
  };
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

    inflight = fetch(WORDPRESS_POSTS, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Blog API Error: ${response.status}`);
        }
        return response.json();
      })
      .then((posts) => {
        cachedPosts = posts.map(formatWordPressPost);
        if (cachedPosts[0]) {
          cachedPosts[0] = {
            ...cachedPosts[0],
            title: firstBlogPost.title,
            metaTitle: firstBlogPost.metaTitle,
            metaDescription: firstBlogPost.metaDescription,
            article: firstBlogPost.article,
          };
        }
        const secondIndex = cachedPosts.findIndex(
          (post) => post.slug === secondBlogPost.slug,
        );
        if (secondIndex !== -1) {
          const [matched] = cachedPosts.splice(secondIndex, 1);
          cachedPosts.splice(1, 0, {
            ...matched,
            title: secondBlogPost.title,
            metaTitle: secondBlogPost.metaTitle,
            metaDescription: secondBlogPost.metaDescription,
            article: secondBlogPost.article,
          });
        }
        if (
          cachedPosts[2] &&
          cachedPosts[2].slug !== secondBlogPost.slug &&
          cachedPosts[2].slug !== fourthBlogPost.slug
        ) {
          cachedPosts[2] = {
            ...cachedPosts[2],
            title: thirdBlogPost.title,
            metaTitle: thirdBlogPost.metaTitle,
            article: thirdBlogPost.article,
          };
        }
        const fourthIndex = cachedPosts.findIndex(
          (post) => post.slug === fourthBlogPost.slug,
        );
        if (fourthIndex > 2) {
          const [matched] = cachedPosts.splice(fourthIndex, 1);
          cachedPosts.splice(3, 0, {
            ...matched,
            title: fourthBlogPost.title,
            metaTitle: fourthBlogPost.metaTitle,
            metaDescription: fourthBlogPost.metaDescription,
            article: fourthBlogPost.article,
          });
        }
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
