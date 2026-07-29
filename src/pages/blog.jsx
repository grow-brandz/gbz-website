import { Helmet } from "react-helmet-async";
import BlogCard from "../components/blogCard";
import blogPosts from "../data/blogPosts";

function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog | Growbrandz</title>
        <meta name="description"
          content="Stories, perspectives, and process notes from the Growbrandz team on D2C ecommerce marketing, brand growth, and everything in between." />
        <meta property="og:title" content="Blog | Growbrandz" />
        <meta property="og:description"
          content="Stories, perspectives, and process notes from the Growbrandz team on D2C ecommerce marketing, brand growth, and everything in between." />
      </Helmet>
      <main className="blogPage">
        <section className="container blogHero commonHero">
          <h1>Behind the <div className="word">
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
          </div></h1>
          <p>Stories is our corner of the site where we get to ramble with purpose.
            It's not a portfolio. It's not an opinion column. It's a stack of
            perspectives, on process, on practice, on what made us pause. We write
            down the things we keep returning to, the side quests, the unexpected
            results.</p>
        </section>

        <section className="container blogGrid">
          <div className="blogGridCover">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default Blog;
