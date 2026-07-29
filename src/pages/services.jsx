import Hero from "../assets/lotties/servicesHero.json";
import Divider from "../components/divider";
import LottieLoop from "../components/lottiecomp";
import useCardStack from "../components/cardstack";
import S1 from "../assets/lotties/s1.json";
import S2 from "../assets/lotties/s2.json";
import S3 from "../assets/lotties/s3.json";
import S4 from "../assets/lotties/s4.json";
import S5 from "../assets/lotties/s5.json";
import S6 from "../assets/lotties/s6.json";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { getServicesData } from "../services/api";

function Services() {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    getServicesData()
      .then((res) => {
        console.log(res);
        setPageData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useCardStack();

  if (!pageData) {
    return <div>Loading...</div>;
  }

  const banner = pageData?.banner;
  const specialize = pageData?.growbrandz_specializes;

  const serviceAnimations = [S1, S2, S3, S4, S5, S6];

  const bannerTitle = banner?.title || "";

  let normalText = "";
  let highlightText = "";

  if (bannerTitle) {
    const words = bannerTitle.split(" ");
    highlightText = words.slice(-1).join(" ");
    normalText = words.slice(0, -1).join(" ");
  }

  return (
    <>
      <Helmet>
        <title>
          D2C Ecommerce Marketing Services for Scalable Growth | Growbrandz
        </title>

        <meta
          name="description"
          content="End-to-end D2C ecommerce marketing services including performance marketing, WhatsApp marketing, D2C website optimisation, and revenue growth strategies."
        />

        <meta
          property="og:title"
          content="D2C Ecommerce Marketing Services for Scalable Growth | Growbrandz"
        />

        <meta
          property="og:description"
          content="End-to-end D2C ecommerce marketing services including performance marketing, WhatsApp marketing, D2C website optimisation, and revenue growth strategies."
        />
      </Helmet>

      <main className="servicesPage">
        <section className="container servicesHero commonHero">
          <span className="sr-only">
            D2C Ecommerce Marketing Services
          </span>

          <h1>
            {normalText}{" "}
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
                  fill="#f761caff"
                />
              </svg>

              <span>{highlightText}</span>
            </div>
          </h1>

          <p>{banner?.paragraph}</p>

          <LottieLoop
            animationData={Hero}
            className="commonHeroFloat servicesHeroFloat"
          />
        </section>

        <Divider
          bgColor="#6842EF"
          fillColor="#FFF2EC"
          boxStroke="#000000"
          gridStroke="#000000"
        />

        <section className="container allServices">
          <h3>{specialize?.title}</h3>

          <div className="folderCover">
            {specialize?.specializes?.map((item, index) => (
              <div className="folderCard" key={index}>
                <div className="imageSide">
                  <p className="l">
                    ({item.sno}) {item.category}
                  </p>

                  <LottieLoop
                    animationData={serviceAnimations[index]}
                    className="listLottie"
                  />

                  <p>{item.paragraph}</p>
                </div>

                <div className="contentSide">
                  <h3>{item.title}</h3>

                  <div className="servicePoints">
                    {item.specializes_points?.map((point, pointIndex) => (
                      <p key={pointIndex}>{point.points}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            to={specialize?.contact_button?.url || "/contact"}
            className="button1"
          >
            {specialize?.contact_button?.title || "Contact Us"}
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

export default Services;