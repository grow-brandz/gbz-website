import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogCard, { blogImage } from "../components/blogCard";
import Loader from "../components/loader";
import { getCachedBlogPosts, loadBlogPosts } from "../services/blogApi.js";

function postsExcept(posts, slug) {
  return posts.filter((post) => post.slug !== slug).slice(0, 3);
}

function BlogPost() {
  const { slug } = useParams();
  const cachedPosts = getCachedBlogPosts() || [];
  const cachedPost = cachedPosts.find((post) => post.slug === slug) || null;

  const [fetchedPost, setFetchedPost] = useState(null);
  const [fetchedRelated, setFetchedRelated] = useState([]);
  const [loading, setLoading] = useState(!cachedPost);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const post = cachedPost || fetchedPost;
  const relatedPosts = cachedPost
    ? postsExcept(cachedPosts, slug)
    : fetchedRelated;

  useEffect(() => {
    if (cachedPost) return;

    let cancelled = false;
    setLoading(true);
    setError(false);
    setNotFound(false);

    loadBlogPosts()
      .then((posts) => {
        if (cancelled) return;
        const match = posts.find((item) => item.slug === slug) || null;
        if (!match) {
          setFetchedPost(null);
          setNotFound(true);
        } else {
          setFetchedPost(match);
          setFetchedRelated(postsExcept(posts, slug));
        }
        setLoading(false);
      })
      .catch((fetchError) => {
        console.error("Error fetching blog:", fetchError);
        if (cancelled) return;
        setError(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, cachedPost]);

  if (loading && !post) {
    return <Loader />;
  }

  if (error || notFound || !post) {
    const message = error
      ? "Unable to load this blog. Please try again."
      : "Blog not found.";

    return (
      <>
        <Helmet>
          <title>Blog | Growbrandz</title>
        </Helmet>
        <main className="blogInnerPage">
          <section className="container blogPostBody">
            <p>{message}</p>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | Growbrandz</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} | Growbrandz`} />
        <meta property="og:description" content={post.excerpt} />
      </Helmet>
      <main className="blogInnerPage">
        <section className="blogPostHero">
          <div className="container blogPostHeroInner">
            <div className="blogPostHeroImage">
              <img src={blogImage(post)} alt={post.title} />
            </div>
            <div className="blogPostHeroContent">
              {/* <p className="blogPostMeta">{post.date}</p> */}
              <h1>{post.title}</h1>
              <div
                className="l"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </div>
          </div>
        </section>

        <section className="container blogPostBody">
          <div
            className="blogPostContent"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </section>

        {relatedPosts.length > 0 && (
          <section className="container blogPostRelated">
            <h2>More From Blog</h2>
            <div className="blogGridCover">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

export default BlogPost;
