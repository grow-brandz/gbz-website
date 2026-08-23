import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import BlogCard from "../components/blogCard";

const WORDPRESS_API =
  "https://lightpink-duck-532990.hostingersite.com/wp-json/wp/v2/posts?_embed&per_page=12";

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        setError(false);

        const response = await fetch(WORDPRESS_API);

        if (!response.ok) {
          throw new Error(`Blog API Error: ${response.status}`);
        }

        const posts = await response.json();

        const formattedPosts = posts.map((post) => ({
          id: post.id,
          slug: post.slug,
          title: post.title?.rendered || "",
          excerpt: post.excerpt?.rendered || "",
          content: post.content?.rendered || "",
          date: post.date,
          link: `/blog/${post.slug}`,
          image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
          category:
            post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Blog",
        }));

        setBlogPosts(formattedPosts);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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

            {loading && (
              <p>Loading blogs...</p>
            )}

            {error && (
              <p>Unable to load blogs. Please try again.</p>
            )}

            {!loading &&
              !error &&
              blogPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                />
              ))}

            {!loading &&
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
