import { Link } from "react-router-dom";

function BlogCard({ post }) {
  return (
    <Link className="blogCard" to={`/blog/${post.slug}`}>
      <div className="blogCardImage">
        <img src={post.image} alt={post.title} loading="lazy" />
      </div>
      {/* <p className="blogCardDate">{post.date}</p> */}
      {/* <span className="blogCardDivider" /> */}
      <h5 className="blogCardTitle">{post.title}</h5>
      <p className="blogCardExcerpt">{post.excerpt}</p>
    </Link>
  );
}

export default BlogCard;
