import { articleRichHtml } from "../utils/sanitizeArticleHtml.js";

function sameTitle(left, right) {
  return (
    String(left || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase() ===
    String(right || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase()
  );
}

function isShortPoint(text) {
  return text.length <= 110 && !text.includes(". ");
}

function contentBlocks(paragraphs) {
  const blocks = [];
  let points = [];

  const flush = () => {
    if (points.length >= 2) {
      blocks.push({ type: "cards", items: points });
    } else {
      points.forEach((text) => blocks.push({ type: "text", text }));
    }
    points = [];
  };

  paragraphs.forEach((text) => {
    if (isShortPoint(text)) {
      points.push(text);
      return;
    }
    flush();
    blocks.push({ type: "text", text });
  });
  flush();

  return blocks;
}

function ParagraphGroup({ paragraphs }) {
  return contentBlocks(paragraphs).map((block, index) => {
    if (block.type === "cards") {
      return (
        <div className="articleCards" key={`cards-${index}`}>
          {block.items.map((item) => (
            <p className="articleCard" key={item}>
              {item}
            </p>
          ))}
        </div>
      );
    }

    return <p key={`text-${index}`}>{block.text}</p>;
  });
}

function sectionImage(section) {
  const image = section?.image;
  const url =
    typeof image === "string" ? image : image?.url || image?.src || "";
  const value = String(url || "").trim();
  if (!value || value.startsWith("//")) return "";
  if (value.startsWith("/")) return value;

  try {
    const parsed = new URL(value);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.href;
    }
  } catch {
    return "";
  }

  return "";
}

function WordpressArticle({ post, paragraphsFor }) {
  const richHtml = articleRichHtml(post?.richContent);
  const sections = post.sections || [];
  const intro = sections.find((section) => sameTitle(section.title, post.title));
  const introImage = sectionImage(intro);
  const introRich = articleRichHtml(intro?.rich_content);
  const introParagraphs = intro && !introRich ? paragraphsFor(intro) : [];
  const thesis =
    introParagraphs.length > 1 ? introParagraphs[introParagraphs.length - 1] : "";
  const introBody = thesis ? introParagraphs.slice(0, -1) : introParagraphs;
  const bodySections = sections.filter((section) => section !== intro);
  const renderedSections = bodySections.flatMap((section, index) => {
    const paragraphs = paragraphsFor(section);
    const rich = articleRichHtml(section.rich_content);
    const image = sectionImage(section);
    if (!section.title && paragraphs.length === 0 && !rich && !image) return [];
    return [{ section, index, paragraphs, rich, image }];
  });

  if (!richHtml && !introRich && !introImage && !introBody.length && !bodySections.length) {
    return (
      <section className="container blogPostBody">
        <p>No content available</p>
      </section>
    );
  }

  return (
    <section className="container designedArticle">
      {richHtml && (
        <div
          className="articleIntro articleRich"
          dangerouslySetInnerHTML={{ __html: richHtml }}
        />
      )}
      {introRich ? (
        <div
          className="articleIntro articleRich"
          dangerouslySetInnerHTML={{ __html: introRich }}
        />
      ) : (
        introBody.length > 0 && (
          <div className="articleIntro">
            {introBody.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {thesis && <p className="articleThesis">{thesis}</p>}
            {introImage && <img src={introImage} alt={intro.title || ""} />}
          </div>
        )
      )}

      {renderedSections.map(({ section, index, paragraphs, rich, image }, position) => {
        const isFaq = /^faqs?$/i.test(String(section.title || "").trim());
        const sectionNumber = String(position + 1).padStart(2, "0");

        return (
          <article className="articleSection" key={`${section.title || "section"}-${index}`}>
            <div className="articleSectionHead">
              <span className="articleIndex">
                {sectionNumber}
              </span>
              {section.title && <h3>{section.title}</h3>}
            </div>
            {image && <img src={image} alt={section.title || ""} />}
            {rich ? (
              <div
                className="articleRich"
                dangerouslySetInnerHTML={{ __html: rich }}
              />
            ) : isFaq ? (
              <div className="articleFaqs">
                {paragraphs.map((paragraph) => (
                  <div className="articleFaq" key={paragraph}>
                    <p>{paragraph}</p>
                  </div>
                ))}
              </div>
            ) : (
              <ParagraphGroup paragraphs={paragraphs} />
            )}
          </article>
        );
      })}
    </section>
  );
}

export default WordpressArticle;
