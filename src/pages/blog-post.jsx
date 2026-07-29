import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BlogCard from "../components/blogCard";
import blogPosts from "../data/blogPosts";

function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

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
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blogPostHeroContent">
              {/* <p className="blogPostMeta">{post.date}</p> */}
              <h1>{post.title}</h1>
              <p className="l">{post.excerpt}</p>
            </div>
          </div>
        </section>

        <section className="container blogPostBody">
          <div className="blogPostContent">
            {post.content.map((block, index) => {
              if (block.type === "h3") {
                return <h3 key={index}>{block.text}</h3>;
              }
              if (block.type === "quote") {
                return <blockquote key={index}>{block.text}</blockquote>;
              }
              if (block.type === "image") {
                return <img key={index} src={post.image} alt={post.title} />;
              }
              return (
                <p key={index} className="l">
                  {block.text}
                </p>
              );
            })}
          </div>
        </section>

        <section className="container blogPostRelated">
          <h2>More From Blog</h2>
          <div className="blogGridCover">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default BlogPost;
