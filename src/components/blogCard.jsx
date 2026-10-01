import { Link } from "react-router-dom";
import Blog1 from "../assets/img/blog-img1.jpg";
import Blog2 from "../assets/img/blog-img2.jpg";
import Blog3 from "../assets/img/blog-img3.jpg";

const FALLBACK_IMAGES = [Blog1, Blog2, Blog3];

export function blogImage(post) {
  if (post?.image) return post.image;
  const index = Math.abs(Number(post?.id) || 0);
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

function BlogCard({ post }) {
  return (
    <Link className="blogCard" to={`/blog/${post.slug}`}>
      <div className="blogCardImage">
        <img src={blogImage(post)} alt={post.title} loading="lazy" />
      </div>
      {/* <p className="blogCardDate">{post.date}</p> */}
      {/* <span className="blogCardDivider" /> */}
      <h5 className="blogCardTitle">{post.title}</h5>
      <p className="blogCardExcerpt">{post.excerpt}</p>
    </Link>
  );
}

export default BlogCard;
