import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, SITE_ORIGIN } from "../ssr/seoFallbacks.js";

/**
 * Shared route SEO tags. Helmet is the source of truth (not index.html).
 */
export function PageSeo({
  title,
  description,
  path = "/",
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
}) {
  const canonical = path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
