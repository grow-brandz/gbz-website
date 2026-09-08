import LottieLoop from "../components/lottiecomp";
import Divider from "../components/divider";
import Hero from "../assets/lotties/aboutHero.json";
import Content1 from "../assets/lotties/aboutcontentfloat1.json";
import Content2 from "../assets/lotties/aboutcontentfloat2.json";
import { getAboutData } from "../services/api";
import { useSsrPageData } from "../hooks/useSsrPageData";
import { PageSeo } from "../components/PageSeo";

function About() {
  const pageData = useSsrPageData("/about", getAboutData);

  const banner = pageData?.banner;
  const expectHeading = pageData?.what_to_expect?.heading || "";
  const bannerHeading = pageData?.banner?.heading || "";

  const fullSolutionSplit = bannerHeading.split("Full solution");
  const bannerBeforeText = fullSolutionSplit[0] || "A ";
  const bannerAfterText =
    fullSolutionSplit[1] || " Creative& Marketing Agency";

  const splitIndex = expectHeading.toLowerCase().indexOf("expect");
  const beforeText =
    splitIndex !== -1 ? expectHeading.slice(0, splitIndex) : "What to";
  const afterText =
    splitIndex !== -1
      ? expectHeading.slice(splitIndex + "expect".length)
      : "when working with us";

  return (
    <>
      <PageSeo
        title="D2C Growth Partners for Ecommerce Brands | Growbrandz"
        description="Growbrandz is a D2C growth partner helping ecommerce brands scale with market intelligence, performance marketing, and proven ecommerce growth strategies."
        path="/about"
      />

      <main className="aboutPage">
        {/* HERO SECTION */}
        <section className="container aboutHero commonHero">
          <h1>
            {bannerBeforeText}
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

              <span>Full solution</span>
            </div>
            {bannerAfterText}
          </h1>

          <p>{banner?.paragraph}</p>

          <LottieLoop animationData={Hero} className="commonHeroFloat aboutHeroFloat" />
        </section>

        <Divider
          bgColor="#FFF2EC"
          fillColor="#EC4899"
          boxStroke="#000000"
          gridStroke="#FFFFFF"
        />
        {/* ABOUT BUILT SECTION */}
        <section className="container aboutBuilt">
          <h2>
            {pageData?.about?.heading?.split("Creative&")[0] ||
              "Built to work with you, across"}{" "}
            <div className="word">
              <span className="word-text">brand & web</span>

              <svg
                className="highlight-shape"
                viewBox="0 0 680 125"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 30.8266L680 0V115.176L340 120.542L0 125V30.8266Z"
                  fill="#FFD703"
                />
              </svg>
            </div>
            {pageData?.about?.heading?.split("Creative&")?.[1] ||
              "Marketing Agency"}
          </h2>

          <div className="container writeupCover">
            {/* Paragraph 1 */}
            <p>
              It started with a{" "}
              <div className="word">
                <span className="word-text">simple gap:</span>
                <svg
                  className="highlight-shape"
                  viewBox="0 0 680 125"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 30.8266L680 0V115.176L340 120.542L0 125V30.8266Z"
                    fill="#FFD703"
                  />
                </svg>
              </div>{" "}
              {pageData?.about?.paragraph?.[0]?.paragraph}
            </p>

            {/* Paragraph 2 */}
            <p className="line">
              <b>Our role is direct: </b>
              make it effortless for people to understand who you are and{" "}
              <LottieLoop animationData={Content1} className="aboutContent1" />{" "}
              <b>trust what you offer.</b>
            </p>

            {/* Paragraph 3 */}
            <p className="line">
              From <b>D2C marketing</b> to conversion ready{" "}
              <LottieLoop animationData={Content2} className="aboutContent2" /> builds to
              sharp, modern communication, we help brands grow with confidence and{" "}
              <b>
                {pageData?.about?.paragraph?.[2]?.paragraph?.includes("voice")
                  ? "speak in a voice that truly resonates."
                  : "grow with clarity and impact."}
              </b>
            </p>
          </div>
        </section>

        <section className="container aboutExpect">
          <h3>
            {beforeText}{" "}
            <div className="word">
              <span className="word-text">expect</span>

              <svg
                className="highlight-shape"
                viewBox="0 0 680 125"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 30.8266L680 0V115.176L340 120.542L0 125V30.8266Z"
                  fill="#EC4899"
                />
              </svg>
            </div>{" "}
            {afterText}
          </h3>
          <div className="columnCover">
            {pageData?.what_to_expect?.expect?.map((item, index) => (
              <div className="column" key={index}>
                <img
                  src={item?.icon?.url}
                  alt={item?.icon?.title || item?.expect_title}
                  width="127"
                  height="127"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "/fallback-icon.svg";
                  }}
                />

                <h4>{item?.expect_title}</h4>

                <p className="l">{item?.expect_paragraph}</p>
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
        <section className="container aboutFounder">
          <div className="imageSide">
            <img
              className="homeceoFloat1"
              src="https://ik.imagekit.io/growbrandz/homeabout1.png"
              alt="Creative background element representing brand growth"
            />

            <a
              href="https://www.linkedin.com/in/jafer-ali"
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="homeceoImage"
                src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceoImage.png"
                alt="Founder of Growbrandz, a D2C growth and ecommerce marketing partner"
              />
            </a>
          </div>

          <div className="contentSide">
            <h2>{pageData?.founder_details?.title || "A letter from our founder"}</h2>

            {pageData?.founder_details?.expect_paragraph?.map((item, index) => (
              <p key={index}>{item?.paragraph}</p>
            ))}
          </div>
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

export default About;
