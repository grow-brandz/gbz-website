import { Link } from "react-router-dom";
import LottieLoop from "../components/lottiecomp";
import Divider from "../components/divider";
import Hero from "../assets/lotties/processHero.json";
import PContent1 from "../assets/lotties/processcontentfloat1.json";
import PContent2 from "../assets/lotties/processcontentfloat2.json";
import Content1 from "../assets/lotties/sadprocess.json";
import Content2 from "../assets/lotties/happyprocess.json";
import { getOurProcessData } from "../services/api";
import { useSsrPageData } from "../hooks/useSsrPageData";
import { PageSeo } from "../components/PageSeo";

function OurProcess() {
  const pageData = useSsrPageData("/our-process", getOurProcessData);

  const bannerData = pageData?.banner || {};
  const ourProcessSection = pageData?.our_process || {};

  const processData = pageData?.a_process_built_around_you || {};
  const processCards = processData?.a_process_built_details || [];

  const deliverResults = pageData?.deliver_results || {};

const traditionalProcess =
  deliverResults?.traditional_process || {};

const growbrandzProcess =
  deliverResults?.growbrandz_process || {};

const approachButton =
  pageData?.our_approach_button || {};
const deliverTitle = deliverResults?.title || "";

const splitIndex = deliverTitle.indexOf("deliver results.");

const normalText =
  splitIndex !== -1
    ? deliverTitle.substring(0, splitIndex)
    : deliverTitle;

const highlightedText =
  splitIndex !== -1
    ? "deliver results."
    : "";
    
const remainingText =
  splitIndex !== -1
    ? deliverTitle.substring(
        splitIndex + "deliver results.".length
      )
    : "";
  return (
    <>
      <PageSeo
        title="Ecommerce Growth Strategy Process for D2C Brands | Growbrandz"
        description="Our ecommerce growth strategy process combines market intelligence, growth marketing frameworks, and a proven D2C scaling process."
        path="/our-process"
      />
      <main className="processPage">
        <section className="container processHero commonHero">
          <h1>
            {(pageData?.banner?.title || "How We Build Brands")
              .split(" ")
              .slice(0, -1)
              .join(" ")}{" "}
            <div className="word">
              <svg
                className="highlight-shape"
                width="680"
                height="125"
                viewBox="0 0 680 125"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M0 30.8266L680 0V115.176L340 120.542L0 125V30.8266Z"
                  fill="#6842EF"
                />
              </svg>

              <span>
                {(pageData?.banner?.title || "How We Build Brands")
                  .split(" ")
                  .slice(-1)}
              </span>
            </div>
          </h1>
          <p>
            {pageData?.banner?.paragraph ||
              "We combine a proven ecommerce strategy framework, a practical growth marketing framework, and a structured D2C scaling process designed for long term results."}
          </p>
          <LottieLoop animationData={Hero} className="commonHeroFloat processHeroFloat" />
        </section>
        <Divider
          bgColor="#6842EF"
          fillColor="#FFD703"
          boxStroke="#000000"
          gridStroke="#000000"
        />
        <section className="container processObservation">
          <h2>
            {pageData?.our_process?.title?.replace("observation", "")}{" "}
            <div className="word">
              <span className="word-text">observation</span>
              <svg
                className="highlight-shape"
                viewBox="0 0 680 125"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 30.8266L680 0V115.176L340 120.542L0 125V30.8266Z"
                  fill="#ED58DF"
                />
              </svg>
            </div>
          </h2>

          <div className="container writeupCover">
            <p>
              {pageData?.our_process?.paragraph?.[0]?.paragraph}
            </p>

            <p className="line">
              {pageData?.our_process?.paragraph?.[1]?.paragraph}
              <LottieLoop
                animationData={PContent1}
                className="processContent1"
              />
            </p>

            <p className="line">
              {pageData?.our_process?.paragraph?.[2]?.paragraph}
              <LottieLoop
                animationData={PContent2}
                className="processContent2"
              />
            </p>
          </div>
        </section>

        <Divider
          bgColor="#FFF2EC"
          fillColor="#6842EF"
          boxStroke="#FFFFFF"
          gridStroke="#000000"
        />
        <section className="container processBuilt">
          <div className="scrollStuck">
            <h2>
              {processData?.title?.split(" ").slice(0, -2).join(" ")}
              <div className="word">
                <span className="word-text">
                  {processData?.title?.split(" ").slice(-2).join(" ")}
                </span>
                <svg
                  className="highlight-shape"
                  viewBox="0 0 680 125"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 30.8266L680 0V115.176L340 120.542L0 125V30.8266Z"
                    fill="#F46C5A"
                  />
                </svg>
              </div>
            </h2>

            <p className="l">
              {processData?.paragraph}
            </p>
          </div>

          <div className="scrollIcons">
            <div className="animatedLine"></div>

            {processCards.map((item, index) => (
              <div
                key={index}
                className={`cards ${index === 0
                  ? "cardOne"
                  : index === 1
                    ? "cardTwo"
                    : index === 2
                      ? "cardThree"
                      : index === 3
                        ? "cardFour"
                        : "cardFive"
                  }`}
              >
                {item?.icon?.url ? (
                  <img
                    src={item.icon.url}
                    alt={item.process_title}
                    width="81"
                    height="81"
                  />
                ) : null}

                <div className="cardContent">
                  <h4>{item.process_title}</h4>

                  <p className="l">
                    {item.process_paragraph}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <Divider
          bgColor="#6842EF"
          fillColor="#FFF2EC"
          boxStroke="#000000"
          gridStroke="#000000"
        />

        <section className="container theyVSus">
<h3>
  {normalText}

  <div className="word">
    <span className="word-text">{highlightedText}</span>
    <svg
      className="highlight-shape"
      viewBox="0 0 680 125"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path
        d="M0 30.8266L680 0V115.176L340 120.542L0 125V30.8266Z"
        fill="#F46C5A"
      />
    </svg>
  </div>

  {remainingText}
</h3>
  <div className="rowCover">
    {/* Traditional Process */}
    <div className="Column traditional">
      <h4>{traditionalProcess?.traditional_process_title}</h4>

      <div className="imageHalf">
        <svg
          className="bgCover"
          viewBox="0 0 477 131"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5004 115.492L68.767 74.2016C171.681 -5.57365 316.006 -3.87526 417.013 78.2997L461.5 114.492"
            stroke="#F46C5A"
            strokeWidth="31"
            strokeLinecap="round"
          />
        </svg>

        <LottieLoop
          animationData={Content1}
          className="theyVSusLottie LottieThey"
        />
      </div>

      <div className="contentHalf">
        {traditionalProcess?.traditional_process_points?.map(
          (item, index) => (
            <div className="contentLine" key={index}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                  fill="#F46C5A"
                />
              </svg>

              <p className="l">{item?.points}</p>
            </div>
          )
        )}
      </div>
    </div>

    <p className="l floater">VS</p>

    {/* Growbrandz Process */}
    <div className="Column us">
      <h4>{growbrandzProcess?.growbrandz_process_title}</h4>

      <div className="imageHalf">
        <svg
          className="bgCover"
          viewBox="0 0 477 131"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M461.502 15.5007L408.143 56.6716C305.051 136.216 160.73 134.194 59.9065 51.7926L15.5008 15.5006"
            stroke="#FFD703"
            strokeWidth="31"
            strokeLinecap="round"
          />
        </svg>

        <LottieLoop
          animationData={Content2}
          className="theyVSusLottie LottieUs"
        />
      </div>

      <div className="contentHalf">
        {growbrandzProcess?.growbrandz_process_points?.map(
          (item, index) => (
            <div className="contentLine" key={index}>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M9.54961 18.0001L3.84961 12.3001L5.27461 10.8751L9.54961 15.1501L18.7246 5.9751L20.1496 7.4001L9.54961 18.0001Z"
                  fill="#309A74"
                />
              </svg>

              <p className="l">{item?.points}</p>
            </div>
          )
        )}
      </div>
    </div>
  </div>

  <Link
    to={approachButton?.url || "/our-approach"}
    className="button1"
    target={approachButton?.target || ""}
  >
    {approachButton?.title || "Our Approach"}
  </Link>
</section>
        <Divider
          bgColor="#FFF2EC"
          fillColor="#6842EF"
          boxStroke="#FFFFFF"
          gridStroke="#000000"
        />
      </main>
    </>
  );
}

export default OurProcess;