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

function WordpressArticle({ post, paragraphsFor }) {
  const sections = post.sections || [];
  const intro = sections.find((section) => sameTitle(section.title, post.title));
  const introParagraphs = intro ? paragraphsFor(intro) : [];
  const thesis =
    introParagraphs.length > 1 ? introParagraphs[introParagraphs.length - 1] : "";
  const introBody = thesis ? introParagraphs.slice(0, -1) : introParagraphs;
  const bodySections = sections.filter((section) => section !== intro);
  let sectionNumber = 0;

  if (!introBody.length && !bodySections.length) {
    return (
      <section className="container blogPostBody">
        <p>No content available</p>
      </section>
    );
  }

  return (
    <section className="container designedArticle">
      {introBody.length > 0 && (
        <div className="articleIntro">
          {introBody.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {thesis && <p className="articleThesis">{thesis}</p>}
        </div>
      )}

      {bodySections.map((section, index) => {
        const paragraphs = paragraphsFor(section);
        if (!section.title && paragraphs.length === 0) return null;

        const isFaq = /^faqs?$/i.test(String(section.title || "").trim());
        sectionNumber += 1;

        return (
          <article className="articleSection" key={`${section.title || "section"}-${index}`}>
            <div className="articleSectionHead">
              <span className="articleIndex">
                {String(sectionNumber).padStart(2, "0")}
              </span>
              {section.title && <h3>{section.title}</h3>}
            </div>
            {isFaq ? (
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
