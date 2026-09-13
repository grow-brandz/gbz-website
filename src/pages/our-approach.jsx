import LottieLoop from "../components/lottiecomp";
import Divider from "../components/divider";
import Hero from "../assets/lotties/approachHero.json";
import Content1 from "../assets/lotties/traditional.json";
import Content2 from "../assets/lotties/us.json";
import { getOurApproachData } from "../services/api";
import { useSsrPageData } from "../hooks/useSsrPageData";
import { PageSeo } from "../components/PageSeo";

function OurApproach() {
  const pageData = useSsrPageData("/our-approach", getOurApproachData);

  const approachHeading = pageData?.our_approach?.heading || "";
  const headingWords = approachHeading.split(" ");

  const firstWord = headingWords[0] || "";
  const highlightWord = headingWords[1] || "";
  const remainingWords = headingWords.slice(2).join(" ");

  const whyData = pageData?.why_choose_us?.why_choose_us_details || [];
  const heading = pageData?.why_choose_us?.heading || "";

  const vsData = pageData?.marketing_agency || {};

  const headingText = vsData?.heading || "";
  const keyword = "Marketing agency";

  let beforeKeyword = headingText;
  let afterKeyword = "";

  if (headingText.includes(keyword)) {
    const index = headingText.indexOf(keyword);
    beforeKeyword = headingText.substring(0, index);
    afterKeyword = headingText.substring(index + keyword.length);
  }

  return (
    <>
      <PageSeo
        title="Strategic Ecommerce Growth Marketing Approach | Growbrandz"
        description="A strategic ecommerce growth marketing approach focused on brand growth, scalable acquisition, and sustainable D2C revenue growth."
        path="/our-approach"
      />
      <main className="approachPage">
        <section className="container approachHero commonHero">
          <h1>
            Why Brands{" "}
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

              <span>choose us</span>
            </div>
          </h1>
          <p>
            {pageData?.banner?.paragraph ||
              "We follow a strategic marketing approach that helps founders scale with confidence, combining a growth marketing approach with a long term brand growth approach that actually works in the real world."}
          </p>
          <LottieLoop animationData={Hero} className="commonHeroFloat approachHeroFloat" />
        </section>
        <Divider
          bgColor="#6842EF"
          fillColor="#EC4899"
          boxStroke="#FFFFFF"
          gridStroke="#FFFFFF"
        />
        <section className="container approachBold">
          <h2>
            {firstWord}{" "}
            <div className="word">
              <span className="word-text">{highlightWord}</span>

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
            {remainingWords}
          </h2>

          <div className="columnCover">
            {pageData?.our_approach?.our_approach_details?.map((item, index) => (
              <div className="column" key={index}>
                {index === 0 && (
                  <svg
                    viewBox="0 0 110 111"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M110 72.3705L97.3078 94.1889L66.6042 75.4704L67.6922 111H42.3078L43.2745 75.4704L12.5714 94.1889L0 72.3705L31.7912 55.4403L0 38.5102L12.5714 16.8109L43.2745 35.5295L42.3078 0H67.6922L66.6042 35.5295L97.3078 16.8109L110 38.5102L78.2088 55.4403L110 72.3705Z"
                      fill="#D8F900"
                    />
                  </svg>
                )}

                {index === 1 && (
                  <svg
                    viewBox="0 0 110 110"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M110 56.2953C100.957 60.0724 93.746 63.3919 88.3663 66.368C82.9866 69.3441 78.7512 72.3202 75.7751 75.2963C72.799 78.2724 69.8233 82.3932 66.8472 87.7729C63.871 93.1526 60.437 100.478 56.5453 109.75H53.4547C49.563 100.478 46.129 93.1526 43.1528 87.7729C40.1767 82.3932 37.2008 78.2724 34.3392 75.2963C31.3632 72.3202 27.128 69.3441 21.7482 66.368C16.3684 63.3919 9.15712 60.0724 0 56.2953V53.2047C9.15712 49.4276 16.3684 46.1081 21.7482 43.132C27.128 40.1559 31.2487 37.1798 34.2248 34.2037C37.0864 31.2276 40.0625 27.1069 43.0386 21.7271C46.0148 16.3473 49.4484 9.02159 53.3405 -0.25H56.4308C60.3224 9.02159 63.7565 16.3473 66.7326 21.7271C69.7087 27.1069 72.6848 31.2276 75.6609 34.2037C78.5224 37.1798 82.6432 40.1559 88.0229 43.132C93.4026 46.1081 100.614 49.5418 109.771 53.2047V56.2953H110Z"
                      fill="#201DFC"
                    />
                  </svg>
                )}

                {index === 2 && (
                  <svg
                    viewBox="0 0 110 110"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M109.75 57.8948L64.9002 57.0678L106.563 73.3727L104.321 78.8077L63.3659 60.7303L95.7048 91.8045L91.574 95.9399L60.5334 63.6843L78.3553 104.565L73.044 106.928L56.7564 65.1021L57.7005 110H51.7995L52.8617 65.1021L36.456 107.046L31.0268 104.683L48.9666 63.8023L17.926 95.9399L13.7951 91.8045L46.1341 60.7303L5.06117 78.8077L2.9367 73.3727L44.5998 57.0678L-0.25 58.0128V51.9872L44.4818 53.0506L2.9367 36.6273L5.06117 31.1923L46.1341 49.2697L13.7951 18.1955L17.926 14.0601L48.9666 46.3157L31.0268 5.31686L36.456 2.95381L52.8617 44.7799L51.7995 0H57.7005L56.7564 44.7799L73.044 3.07196L78.3553 5.43503L60.5334 46.3157L91.574 14.0601L95.7048 18.1955L63.3659 49.2697L104.321 31.1923L106.563 36.6273L64.9002 52.9322L109.75 51.8688V57.8948Z"
                      fill="#FF289A"
                    />
                  </svg>
                )}

                <h5>{item.title}</h5>
                <p className="l">{item.paragraph}</p>
              </div>
            ))}
          </div>
        </section>
        <Divider
          bgColor="#FFF2EC"
          fillColor="#6842EF"
          boxStroke="#FFFFFF"
          gridStroke="#000000"
        />
        <section className="container approachWhy">
          <h2>
            {heading.split(" ").slice(0, 1).join(" ")}{" "}
            <div className="word">
              <span className="word-text">
                {heading.split(" ").slice(1, 2).join(" ")}
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
            </div>{" "}
            {heading.split(" ").slice(2).join(" ")}
          </h2>

          <div className="columnCover">
            {whyData.slice(0, 3).map((item, index) => (
              <div className="column" key={index}>
                <img
                  src={item?.icon?.url}
                  alt={item?.title}
                  width="127"
                  height="127"
                />

                <h5>{item?.title}</h5>
                <p className="l">{item?.paragraph}</p>
              </div>
            ))}
          </div>

          <div className="columnCover">
            {whyData.slice(3, 6).map((item, index) => (
              <div className="column" key={index}>
                <img
                  src={item?.icon?.url}
                  alt={item?.title}
                  width="127"
                  height="127"
                />

                <h5>{item?.title}</h5>
                <p className="l">{item?.paragraph}</p>
              </div>
            ))}
          </div>

          <p className="approachPara">{pageData?.why_choose_us?.paragraph}</p>
        </section>
        <Divider
          bgColor="#6842EF"
          fillColor="#FFF2EC"
          boxStroke="#000000"
          gridStroke="#000000"
        />

        <section className="container theyVSus">
          <h3>
            {beforeKeyword}
            <div className="word">
              <span className="word-text">{keyword}</span>

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
            {afterKeyword}
          </h3>

          <div className="rowCover">
            <div className="Column traditional">
              <h4>{vsData?.traditional_approach?.title}</h4>

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
                {vsData?.traditional_approach?.points?.map((item, index) => (
                  <div className="contentLine" key={index}>
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                        fill="#F46C5A"
                      />
                    </svg>
                    <p className="l">{item.points}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="l floater">VS</p>

            <div className="Column us">
              <h4>{vsData?.growbrandz_approach?.title}</h4>

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
                {vsData?.growbrandz_approach?.points?.map((item, index) => (
                  <div className="contentLine" key={index}>
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9.54961 18.0001L3.84961 12.3001L5.27461 10.8751L9.54961 15.1501L18.7246 5.9751L20.1496 7.4001L9.54961 18.0001Z"
                        fill="#309A74"
                      />
                    </svg>
                    <p className="l">{item.points}</p>
                  </div>
                ))}
              </div>
            </div>
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

export default OurApproach;
