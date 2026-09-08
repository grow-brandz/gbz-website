import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Helmet } from "react-helmet-async";
import useCardStack from "../components/cardstack";
import Divider from "../components/divider";
import herofloat1 from "../assets/lotties/homehero1.json";
import herofloat2 from "../assets/lotties/homehero2.json";
import about1 from "../assets/lotties/homeabout2.json";
import MI1 from "../assets/lotties/mi1.json";
import MI2 from "../assets/lotties/mi2.json";
import SD1 from "../assets/lotties/sd1.json";
import SD2 from "../assets/lotties/sd2.json";
import SEO1 from "../assets/lotties/seo1.json";
import SEO2 from "../assets/lotties/seo2.json";
import PM1 from "../assets/lotties/pm1.json";
import PM2 from "../assets/lotties/pm2.json";
import SMM1 from "../assets/lotties/smm1.json";
import SMM2 from "../assets/lotties/smm2.json";
import EWC1 from "../assets/lotties/ewc1.json";
import EWC2 from "../assets/lotties/ewc2.json";
import HF1 from "../assets/lotties/homeframework1.json";
import HFM1 from "../assets/lotties/homeframeworkmain1.json";
import HFM2 from "../assets/lotties/homeframework2.json";
import HFM3 from "../assets/lotties/homeframework3.json";
import HWHY1 from "../assets/lotties/homewhy1.json";
import Arrow from "../assets/lotties/right-arrow.json";
import LottieLoop from "../components/lottiecomp";
import Loader from "../components/loader";
import { getHomeData } from "../services/api";
import { useSsrPageData } from "../hooks/useSsrPageData";
import { PageSeo } from "../components/PageSeo";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function Home() {
  const homeData = useSsrPageData("/", getHomeData);

  useCardStack();
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  // Refs for all sections
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const frameworkRef = useRef(null);
  const whyRef = useRef(null);
  const marqueeRef = useRef(null);
  const ceoRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowLoader(false);
    }, 1500);

    return () => clearTimeout(t);
  }, []);


  useEffect(() => {

      const initAnimations = setTimeout(() => {

      const heroCtx = gsap.context(() => {
        gsap.delayedCall(1.5, () => {
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          tl.to(".homeHero h1", {
            y: 0,
            opacity: 1,
            duration: 1.2,
          })
            .to(".homeHero .word", {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "back.out(1.7)",
            }, "-=0.8")
            .to(".homeHero > p", {
              y: 0,
              opacity: 1,
              duration: 1,
            }, "-=0.6")
            .to(".heroFloat1", { opacity: 1, duration: 1 }, "-=0.8")
            .to(".heroFloat2", { opacity: 1, duration: 1 }, "-=0.9")
            .to(".heroFloat3", { opacity: 1, duration: 1 }, "-=0.9")
            .to(".heroFloat4", { opacity: 1, duration: 1 }, "-=0.9")
            .to(".heroFloat5", { opacity: 1, duration: 1 }, "-=0.9");
        });
      }, heroRef);


      // About Section Animations
      const aboutCtx = gsap.context(() => {
        gsap.from(".homeAbout .word", {
          scale: 0.7,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".homeAbout h2",
            start: "top 70%",
            end: "top 35%",
            scrub: 1,
          }
        });

        gsap.from(".homeAboutFloat1", {
          x: -100,
          opacity: 0,
          rotation: -20,
          scrollTrigger: {
            trigger: ".homeAbout",
            start: "top 70%",
            end: "top 30%",
            scrub: 1.5,
          }
        });

        gsap.from(".homeAboutMain", {
          scale: 0.8,
          opacity: 0,
          scrollTrigger: {
            trigger: ".homeAboutMain",
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        });

        gsap.from(".homeAbout h3", {
          y: 60,
          opacity: 0,
          scrollTrigger: {
            trigger: ".homeAbout h3",
            start: "top 80%",
            end: "top 45%",
            scrub: 1,
          }
        });

        gsap.from(".homeAbout > p", {
          y: 50,
          opacity: 0,
          scrollTrigger: {
            trigger: ".homeAbout > p",
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          }
        });
      }, aboutRef);

      // Services Section Animations
      const servicesCtx = gsap.context(() => {

        gsap.from(".homeServices > p", {
          y: 50,
          opacity: 0,
          scrollTrigger: {
            trigger: ".homeServices > p",
            start: "top 80%",
            end: "top 45%",
            scrub: 1,
          }
        });

        // Animate each service list item
        gsap.from(".list", {
          y: 60,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".servicesList",
            start: "top 75%",
            end: "top 25%",
            scrub: 1.5,
          }
        });
      }, servicesRef);

      // Framework Section Animations
      const frameworkCtx = gsap.context(() => {
        gsap.from(".homeFrameWork h2", {
          y: 80,
          opacity: 0,
          scrollTrigger: {
            trigger: ".homeFrameWork",
            start: "top 75%",
            end: "top 35%",
            scrub: 1,
          }
        });

        gsap.from(".headingDec", {
          scale: 0,
          rotation: 180,
          scrollTrigger: {
            trigger: ".homeFrameWork h2",
            start: "top 70%",
            end: "top 40%",
            scrub: 1,
          }
        });

        gsap.from(".folderCard", {
          y: 80,
          opacity: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".folderCover",
            start: "top 75%",
            end: "top 30%",
            scrub: 1.5,
          }
        });
      }, frameworkRef);

      // Why Section Animations - FIXED AND IMPROVED
      const whyCtx = gsap.context(() => {
        // Animate heading
        gsap.from(".homeWhy h2", {
          y: 80,
          opacity: 0,
          scrollTrigger: {
            trigger: ".homeWhy h2",
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          }
        });

        // Animate all boxes together first
        gsap.from(".box", {
          y: 100,
          opacity: 0,
          scale: 0.95,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".bentoCover",
            start: "top 80%",
            end: "top 30%",
            scrub: 1.5,
          }
        });

        // Individual floater animations with delays
        gsap.from(".boxOne .floater", {
          scale: 0,
          rotation: -180,
          opacity: 0,
          scrollTrigger: {
            trigger: ".boxOne",
            start: "top 70%",
            end: "top 35%",
            scrub: 1.5,
          }
        });

        gsap.from(".boxTwo .floater", {
          x: 100,
          opacity: 0,
          scrollTrigger: {
            trigger: ".boxTwo",
            start: "top 70%",
            end: "top 35%",
            scrub: 1.5,
          }
        });

        gsap.from(".boxThree .floater", {
          y: -100,
          opacity: 0,
          scrollTrigger: {
            trigger: ".boxThree",
            start: "top 70%",
            end: "top 35%",
            scrub: 1.5,
          }
        });

        gsap.from(".boxFour .floater", {
          scale: 0,
          rotation: 180,
          opacity: 0,
          scrollTrigger: {
            trigger: ".boxFour",
            start: "top 70%",
            end: "top 35%",
            scrub: 1.5,
          }
        });
      }, whyRef);

      // Marquee Section Animations - Remove context scope since no container class
      const marqueeCtx = gsap.context(() => {
        gsap.to(".marqueeCover .rowOne", {
          x: -500,
          scrollTrigger: {
            trigger: ".marqueeCover",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          }
        });

        gsap.to(".marqueeCover .rowTwo", {
          x: 500,
          scrollTrigger: {
            trigger: ".marqueeCover",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          }
        });
      }); // Remove marqueeRef parameter

      // CEO Section Animations - Use document scope
      const ceoCtx = gsap.context(() => {
        gsap.from(".ceoSection .imageSide", {
          x: -100,
          opacity: 0,
          scrollTrigger: {
            trigger: ".ceoSection",
            start: "top 75%",
            end: "top 30%",
            scrub: 1.5,
          }
        });

        gsap.from(".ceoSection .contentSide", {
          x: 100,
          opacity: 0,
          scrollTrigger: {
            trigger: ".ceoSection",
            start: "top 75%",
            end: "top 30%",
            scrub: 1.5,
          }
        });

        gsap.from([".homeceoExtra1", ".homeceoExtra2", ".homeceoExtra3", ".homeceoExtra4", ".homeceoExtra5"], {
          scale: 0,
          opacity: 0,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".ceoSection",
            start: "top 60%",
            end: "top 20%",
            scrub: 2,
          }
        });
      });

      // FAQ Section Animations
      const faqCtx = gsap.context(() => {
        gsap.from(".homeFAQ h2", {
          y: 80,
          opacity: 0,
          scrollTrigger: {
            trigger: ".homeFAQ",
            start: "top 75%",
            end: "top 35%",
            scrub: 1,
          }
        });

        gsap.from(".headingPara", {
          y: 50,
          opacity: 0,
          scrollTrigger: {
            trigger: ".headingPara",
            start: "top 80%",
            end: "top 45%",
            scrub: 1,
          }
        });

        gsap.from(".faqItem", {
          y: 60,
          opacity: 0,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".FAQ",
            start: "top 75%",
            end: "top 30%",
            scrub: 1.5,
          }
        });

        gsap.from(".bookCall", {
          y: 50,
          opacity: 0,
          scrollTrigger: {
            trigger: ".bookCall",
            start: "top 80%",
            end: "top 45%",
            scrub: 1,
          }
        });
      }, faqRef);

      // Refresh ScrollTrigger after all animations are set up
      ScrollTrigger.refresh();

      // Store contexts for cleanup
      return () => {
        heroCtx.revert();
        aboutCtx.revert();
        servicesCtx.revert();
        frameworkCtx.revert();
        whyCtx.revert();
        marqueeCtx.revert();
        ceoCtx.revert();
        faqCtx.revert();
      };
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(initAnimations);
    };
  }, []);


  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "Do you guarantee growth or results?",
      answer:
        "We do not promise overnight growth or unrealistic numbers. What we do guarantee is a clear strategy, transparent execution, and a performance driven approach focused on sustainable digital sales growth. Real ecommerce growth depends on multiple factors, and we work with you to improve the ones we can control."
    },
    {
      question: "What kind of brands do you usually work with?",
      answer:
        "We primarily work with D2C brands, ecommerce businesses, and founders who are serious about building long term online store growth. Whether you are launching, scaling, or fixing performance issues, we adapt our approach to your stage of growth."
    },
    {
      question: "How is Growbrandz different from other marketing agencies?",
      answer:
        "Most agencies focus on either creativity or performance. We focus on both. Our team blends branding, ecommerce marketing, and D2C performance marketing so that every decision supports conversions, retention, and revenue, not just aesthetics."
    },
    {
      question: "How long does it take to see results?",
      answer:
        "Timelines depend on your current setup, market, and goals. Some improvements can be seen within weeks, while meaningful ecommerce revenue growth typically takes a few months of consistent execution, testing, and optimization."
    },
    {
      question: "Do you work as a one time project or long term partner?",
      answer:
        "We believe real growth happens through long term collaboration. While we do offer project based engagements, most brands work with us on an ongoing basis to continuously improve performance, scale campaigns, and adapt as the market evolves."
    }
  ];


  const faqItems =
    homeData?.have_questions?.question_and_answer?.length > 0
      ? homeData.have_questions.question_and_answer
      : faqData;

  const inactiveIcon = `
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="44" height="44" rx="22" fill="#EFECFD"/>
  <path d="M16 19L22 25L28 19" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  const activeIcon = `
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="44" height="44" rx="22" fill="#6842EF"/>
  <path d="M16 19L22 25L28 19" stroke="#EFECFD" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
  </svg>
  `;

  return (
    <>
      <PageSeo
        title="D2C Marketing Agency for Ecommerce Sales Growth | Growbrandz"
        description="Growbrandz is a D2C ecommerce marketing agency helping product brands scale digital sales through performance marketing, SEO, Shopify, and conversion-focused branding."
        path="/"
      />
      <Helmet>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Growbrandz",
              url: "https://growbrandz.com/",
              logo: "https://ik.imagekit.io/growbrandz/GROW%E2%80%A8BRANDZ.svg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+918012005000",
                contactType: "customer service",
                areaServed: "IN",
                availableLanguage: "en",
              },
              sameAs: [
                "https://www.instagram.com/grow_brandz/",
                "https://www.linkedin.com/company/growbrandz/",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Growbrandz",
              url: "https://growbrandz.com/",
            }),
          }}
        />
      </Helmet>
      {showLoader && <Loader />}
      <main className="homePage">
        {/* Hero */}
        <section className="container homeHero" ref={heroRef}>
          <h1>
            {homeData?.banner?.header?.split(" ")[0]}{" "}
            {homeData?.banner?.header?.split(" ")[1]}{" "}
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
                  fill="#EC4999"
                />
              </svg>

              <span>
                {homeData?.banner?.header?.split(" ").slice(2).join(" ")}
              </span>
            </div>
          </h1>

          <p>{homeData?.banner?.banner_paragraph}</p>

          <Link
            to={homeData?.banner?.book_a_consultation?.url || "/contact"}
            className="button1"
          >
            {homeData?.banner?.book_a_consultation?.title}
          </Link>

          <LottieLoop
            animationData={herofloat1}
            className="heroFloat heroFloat1"
          />
          <LottieLoop
            animationData={herofloat2}
            className="heroFloat heroFloat2"
          />
          <img
            className="heroFloat heroFloat3"
            src="https://ik.imagekit.io/growbrandz/homehero3.svg"
            alt="Growbrandz"
          />
          <img
            className="heroFloat heroFloat4"
            src="https://ik.imagekit.io/growbrandz/homehero4.svg"
            alt="Growbrandz"
          />
          <img
            className="heroFloat heroFloat5"
            src="https://ik.imagekit.io/growbrandz/homehero5.svg"
            alt="Growbrandz"
          />
        </section>
        <Divider
          bgColor="#FFF2EC"
          fillColor="#6842EF"
          boxStroke="#FFFFFF"
          gridStroke="#000000"
        />
        {/* About */}
        <section className="container homeAbout" ref={aboutRef}>
          <h2>
            Making it big on{" "}
            <div className="word">
              <span className="word-text">D2C</span>
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
            <br />
            is tougher than you think.
          </h2>

          <img
            className="homeAboutFloat1"
            src="https://ik.imagekit.io/growbrandz/homeabout1.png"
            alt="D2C brand growth illustration showing ecommerce marketing journey"
          />

          <LottieLoop
            animationData={about1}
            className="homeAboutMain"
          />

          <h3>{homeData?.d2c?.header}</h3>

          <p>{homeData?.d2c?.d2c_paragraph}</p>

          <Link
            to={homeData?.d2c?.check_our_process?.url || "/our-process"}
            className="button1"
          >
            {homeData?.d2c?.check_our_process?.title}
          </Link>
        </section>
        <Divider
          bgColor="#6842EF"
          fillColor="#FFF2EC"
          boxStroke="#000000"
          gridStroke="#000000"
        />
        {/* Services */}
        <section className="container homeServices" ref={servicesRef}>
          <h2>
            From Idea to{" "}
            <div className="word">
              <span className="word-text">
                {homeData?.services_list?.header?.replace("From Idea to ", "")}
              </span>
              <svg
                className="highlight-shape"
                viewBox="0 0 680 125"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 30.8266L680 0V115.176L340 120.542L0 125V30.8266Z"
                  fill="#EC4999"
                />
              </svg>
            </div>
          </h2>

          <p>{homeData?.services_list?.paragrapgh}</p>

          <div className="servicesList">

            {homeData?.services_list?.services_list?.map((service, index) => {
              const animations = [
                { one: MI1, two: MI2, className: "listOne" },
                { one: SD1, two: SD2, className: "listTwo" },
                { one: SEO1, two: SEO2, className: "listThree" },
                { one: PM1, two: PM2, className: "listFour" },
                { one: SMM1, two: SMM2, className: "listFive" },
                { one: EWC1, two: EWC2, className: "listSix" },
              ];

              const animation = animations[index];

              return (
                <h3
                  key={index}
                  className={`list ${animation?.className}`}
                >
                  <LottieLoop
                    animationData={animation?.one}
                    className="listLottie One"
                  />

                  <Link to={service?.services_link?.url || "/services"}>
                    {service?.services_name}
                  </Link>

                  <LottieLoop
                    animationData={animation?.two}
                    className="listLottie Two"
                  />
                </h3>
              );
            })}

          </div>

          <Link
            to={homeData?.services_list?.all_services_button?.url || "/services"}
            className="button1"
          >
            {homeData?.services_list?.all_services_button?.title}
          </Link>
        </section>
        <Divider
          bgColor="#FFF2EC"
          fillColor="#6842EF"
          boxStroke="#FFFFFF"
          gridStroke="#000000"
        />
        {/* FrameWork */}
        <section className="container homeFrameWork" ref={frameworkRef}>
          <h2>
            Frameworks <br /> powering
            <LottieLoop animationData={HF1} className="headingDec" />
            our
            <div className="word">
              <span className="word-text">approach:</span>
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
          </h2>

          <div className="folderCover">
            {homeData?.our_approach?.approach_list?.map((item, index) => (
              <div
                key={index}
                className={`folderCard ${index === 0
                    ? "purposeSection"
                    : index === 1
                      ? "strategySection"
                      : "builtSection"
                  }`}
              >
                <LottieLoop
                  animationData={
                    index === 0 ? HFM1 : index === 1 ? HFM2 : HFM3
                  }
                  className="folderCardLottie"
                />

                <div className="content">
                  <h3>{item.our_approach_title}</h3>
                  <p>{item.our_approach_paragraph}</p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to={homeData?.our_approach?.check_our_approach?.url || "/our-approach"}
            className="button1"
          >
            {homeData?.our_approach?.check_our_approach?.title}
          </Link>
        </section>
        {/* Why Us */}
        <section className="container homeWhy" ref={whyRef}>
          <h2>
            Why <LottieLoop animationData={HWHY1} className="headingDec" />
            Choose
            <div className="word">
              <span className="word-text">Growbrandz</span>
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
          </h2>

          <div className="bentoCover">
            <div className="row rowOne">

              <div className="box boxOne">
                <h4>
                  {homeData?.why_choose_growbrandz?.choose_growbrandz?.[0]?.heading}
                </h4>
                <p>
                  {homeData?.why_choose_growbrandz?.choose_growbrandz?.[0]?.paragraph}
                </p>
                <img
                  className="floater"
                  src="https://ik.imagekit.io/growbrandz/tr:f-auto/homewhy1.png"
                  alt="D2C market analysis and customer insight research"
                />
              </div>

              <div className="box boxTwo">
                <h4>
                  {homeData?.why_choose_growbrandz?.choose_growbrandz?.[1]?.heading}
                </h4>
                <p>
                  {homeData?.why_choose_growbrandz?.choose_growbrandz?.[1]?.paragraph}
                </p>
                <img
                  className="floater"
                  src="https://ik.imagekit.io/growbrandz/tr:f-auto/homewhy2.png"
                  alt="Brand digitization across websites and ecommerce channels"
                />
              </div>

            </div>

            <div className="row rowTwo">

              <div className="box boxThree">
                <h4>
                  {homeData?.why_choose_growbrandz?.choose_growbrandz?.[2]?.heading}
                </h4>
                <p>
                  {homeData?.why_choose_growbrandz?.choose_growbrandz?.[2]?.paragraph}
                </p>
                <img
                  className="floater"
                  src="https://ik.imagekit.io/growbrandz/tr:f-auto/homewhy3.png"
                  alt="Experienced ecommerce and D2C marketing team at work"
                />
              </div>

              <div className="box boxFour">
                <h4>
                  {homeData?.why_choose_growbrandz?.choose_growbrandz?.[3]?.heading}
                </h4>
                <p>
                  {homeData?.why_choose_growbrandz?.choose_growbrandz?.[3]?.paragraph}
                </p>
                <img
                  className="floater"
                  src="https://ik.imagekit.io/growbrandz/tr:f-auto/homewhy4.png"
                  alt="Long term support for D2C brand growth and ecommerce marketing"
                />
              </div>

            </div>
          </div>
        </section>
        {/* Marquee */}
        <section className="marqueeCover" ref={marqueeRef}>
          <div className="rowOne">
            <h4 className="shopify">Shopify Development</h4>
            <h4 className="seo">SEO for Ecommerce</h4>
            <h4 className="email">Email Marketing</h4>
            <h4 className="whatsapp">WhatsApp Marketing</h4>
            <h4 className="performance">D2C Performance Marketing</h4>
            <h4 className="d2c">D2C Marketing Agency</h4>

            <h4 className="shopify">Shopify Development</h4>
            <h4 className="seo">SEO for Ecommerce</h4>
            <h4 className="email">Email Marketing</h4>
            <h4 className="whatsapp">WhatsApp Marketing</h4>
            <h4 className="performance">D2C Performance Marketing</h4>
            <h4 className="d2c">Ecommerce Marketing Agency</h4>
          </div>

          <div className="rowTwo">
            <h4 className="shopify">Shopify Development</h4>
            <h4 className="seo">Ecommerce SEO</h4>
            <h4 className="email">Email Campaigns</h4>
            <h4 className="whatsapp">WhatsApp Campaigns</h4>
            <h4 className="performance">Performance Marketing</h4>
            <h4 className="d2c">Online Store Growth</h4>

            <h4 className="shopify">Shopify Development</h4>
            <h4 className="seo">SEO for Online Stores</h4>
            <h4 className="email">Email Marketing</h4>
            <h4 className="whatsapp">WhatsApp Marketing</h4>
            <h4 className="performance">D2C Performance Marketing</h4>
            <h4 className="d2c">Digital Sales Growth</h4>
          </div>
        </section>


        <Divider
          bgColor="#FFD703"
          fillColor="#FFF2EC"
          boxStroke="#000000"
          gridStroke="#FFFFFF"
        />
        {/* CEO */}
        <section className="ceoSection" ref={ceoRef}>
          <div className="container row">
            <div className="imageSide">
              <img
                className="homeceoFloat1"
                src="https://ik.imagekit.io/growbrandz/homeabout1.png"
                alt="Creative elements representing D2C brand building"
              />

              <a
                href={homeData?.our_story?.linkedin_id?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="homeceoImage"
                  src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceoImage.png"
                  alt={homeData?.our_story?.team_member_name}
                />
              </a>

              <LottieLoop animationData={Arrow} className="homeceoFloat2" />
            </div>

            <div className="contentSide">
              <h2>{homeData?.our_story?.heading}</h2>

              <p>{homeData?.our_story?.paragraph}</p>

              <Link
                to={homeData?.our_story?.our_story_button?.url || "/about"}
                className="button2"
              >
                {homeData?.our_story?.our_story_button?.title}
              </Link>
            </div>
          </div>

          <img
            className="homeceoExtra1"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo1.png"
            alt="D2C marketing and ecommerce strategy visual element"
          />
          <img
            className="homeceoExtra2"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo2.png"
            alt="Brand growth and performance marketing illustration"
          />
          <img
            className="homeceoExtra3"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo3.png"
            alt="Creative process behind ecommerce marketing campaigns"
          />
          <img
            className="homeceoExtra4"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo4.png"
            alt="Design and strategy supporting online store growth"
          />
          <img
            className="homeceoExtra5"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo5.png"
            alt="Team collaboration for D2C performance marketing"
          />
        </section>
        <Divider
          bgColor="#EC4899"
          fillColor="#FFD703"
          boxStroke="#000000"
          gridStroke="#000000"
        />
        <section className="homeFAQ" ref={faqRef}>
          <h2>
            <div className="word">
              <span className="word-text">
                {homeData?.have_questions?.heading}
              </span>

              <svg
                className="highlight-shape"
                viewBox="0 0 680 125"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 30.8266L680 0V115.176L340 120.542L0 125V30.8266Z"
                  fill="#6842EF"
                />
              </svg>
            </div>
          </h2>

          <p className="headingPara">
            {homeData?.have_questions?.paragraph}
          </p>

          <div className="FAQ">
            {faqItems.map((item, index) => (
                <div
                  key={index}
                  className={`faqItem ${activeIndex === index ? "open" : ""
                    }`}
                  onClick={() => toggleFAQ(index)}
                >
                  <h5 className="faqQuestion">
                    {item.question}

                    <div
                      className={`faqIcon ${activeIndex === index ? "rotate" : ""
                        }`}
                      dangerouslySetInnerHTML={{
                        __html:
                          activeIndex === index
                            ? activeIcon
                            : inactiveIcon,
                      }}
                    />
                  </h5>

                  {activeIndex === index && (
                    <p className="faqAnswer">{item.answer}</p>
                  )}
                </div>
            ))}
          </div>

          <div className="bookCall">
            <div className="content">
              <h5>{homeData?.book_a_call?.heading}</h5>
              <p>{homeData?.book_a_call?.paragraph}</p>
            </div>

            <Link
              to={
                homeData?.book_a_call?.book_a_call_button?.url ||
                "/contact"
              }
              className="button2"
            >
              {homeData?.book_a_call?.book_a_call_button?.title}
            </Link>
          </div>
        </section>

        <Divider
          bgColor="#FFF2EC"
          fillColor="#EC4899"
          boxStroke="#000000"
          gridStroke="#FFFFFF"
        />
      </main>
    </>
  );
}

export default Home;
