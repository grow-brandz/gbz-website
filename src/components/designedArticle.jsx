import { Link } from "react-router-dom";

function RichText({ value }) {
  if (!value) return null;
  if (typeof value === "string") return value;

  return value.map((part, index) =>
    typeof part === "string" ? (
      <span key={index}>{part}</span>
    ) : (
      <Link key={index} className="articleInline" to={part.href}>
        {part.text}
      </Link>
    ),
  );
}

function ArticleBlocks({ blocks }) {
  if (!blocks?.length) return null;

  return blocks.map((block, index) => (
    <p key={index}>
      <RichText value={block} />
    </p>
  ));
}

function DesignedArticle({ article }) {
  return (
    <section className="container designedArticle">
      {(article.intro?.length > 0 || article.thesis) && (
        <div className="articleIntro">
          <ArticleBlocks blocks={article.intro} />
          {article.thesis && <p className="articleThesis">{article.thesis}</p>}
        </div>
      )}

      {article.sections?.map((section, index) => (
        <article className="articleSection" key={section.title}>
          <div className="articleSectionHead">
            <span className="articleIndex">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{section.title}</h3>
          </div>
          <ArticleBlocks blocks={section.paragraphs} />
          {section.faqs?.length > 0 && (
            <div className="articleFaqs">
              {section.faqs.map((faq) => (
                <div className="articleFaq" key={faq.question}>
                  <h4>{faq.question}</h4>
                  <ArticleBlocks blocks={faq.answers} />
                </div>
              ))}
            </div>
          )}
          {section.items?.length > 0 && (
            <div className="articleCards">
              {section.items.map((item) => (
                <p className="articleCard" key={item}>
                  {item}
                </p>
              ))}
            </div>
          )}
          {section.steps?.length > 0 && (
            <ol className="articleSteps">
              {section.steps.map((step, stepIndex) => (
                <li key={step}>
                  <span>{String(stepIndex + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          )}
          <ArticleBlocks blocks={section.after} />
          {section.highlight && (
            <p className="articleHighlight">
              <RichText value={section.highlight} />
            </p>
          )}
          <ArticleBlocks blocks={section.closing} />
        </article>
      ))}

      {article.cta && (
        <aside className="articleCta">
          <p>
            <RichText value={article.cta.text} />
          </p>
          <Link className="button1" to={article.cta.href}>
            {article.cta.label}
          </Link>
        </aside>
      )}

      {article.closing && (
        <article className="articleSection articleClose">
          <h3>{article.closing.title}</h3>
          <ArticleBlocks blocks={article.closing.paragraphs} />
          {article.closing.highlight && (
            <p className="articleThesis">{article.closing.highlight}</p>
          )}
        </article>
      )}
    </section>
  );
}

export default DesignedArticle;
