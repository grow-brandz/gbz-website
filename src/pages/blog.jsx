import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import BlogCard from "../components/blogCard";
import { useInitialData } from "../ssr/InitialDataContext.jsx";
import { getCachedBlogPosts, loadBlogPosts } from "../services/blogApi.js";

function Blog() {
  const initial = useInitialData();
  const ssrPosts =
    initial?.path === "/blog" && Array.isArray(initial.pageData)
      ? initial.pageData
      : null;

  const [blogPosts, setBlogPosts] = useState(
    () => ssrPosts || getCachedBlogPosts() || [],
  );
  const [error, setError] = useState(false);
  const [settled, setSettled] = useState(
    () => Boolean((ssrPosts || getCachedBlogPosts())?.length),
  );

  useEffect(() => {
    if (settled) return;

    let cancelled = false;

    loadBlogPosts()
      .then((posts) => {
        if (cancelled) return;
        setBlogPosts(posts);
        setSettled(true);
      })
      .catch((err) => {
        console.error("Error fetching blogs:", err);
        if (cancelled) return;
        setError(true);
        setSettled(true);
      });

    return () => {
      cancelled = true;
    };
  }, [settled]);

  return (
    <>
      <Helmet>
        <title>Blog | Growbrandz</title>

        <meta
          name="description"
          content="Stories, perspectives, and process notes from the Growbrandz team on D2C ecommerce marketing, brand growth, and everything in between."
        />

        <meta
          property="og:title"
          content="Blog | Growbrandz"
        />

        <meta
          property="og:description"
          content="Stories, perspectives, and process notes from the Growbrandz team on D2C ecommerce marketing, brand growth, and everything in between."
        />
      </Helmet>

      <main className="blogPage">

        <section className="container blogHero commonHero">
          <h1>
            Behind the{" "}
            <div className="word">
              <svg
                className="highlight-shape"
                width="350"
                height="125"
                viewBox="0 0 350 125"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M0 30.8266L680 0V115.176L340 120.542L0 125V30.8266Z"
                  fill="#EC4999"
                />
              </svg>

              <span>work.</span>
            </div>
          </h1>

          <p>
            Stories is our corner of the site where we get to ramble with
            purpose. It's not a portfolio. It's not an opinion column. It's
            a stack of perspectives, on process, on practice, on what made
            us pause. We write down the things we keep returning to, the
            side quests, the unexpected results.
          </p>
        </section>

        <section className="container blogGrid">
          <div className="blogGridCover">

            {error && (
              <p>Unable to load blogs. Please try again.</p>
            )}

            {!error &&
              blogPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                />
              ))}

            {settled &&
              !error &&
              blogPosts.length === 0 && (
                <p>No blogs published yet.</p>
              )}

          </div>
        </section>

      </main>
    </>
  );
}

export default Blog;
