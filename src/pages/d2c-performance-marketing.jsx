import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Divider from "../components/divider";
import LottieLoop from "../components/lottiecomp";
import { PageSeo } from "../components/PageSeo";
import Hero from "../assets/lotties/servicesHero.json";
import zamZamVideo from "../assets/videos/Zam Zam.mp4";
import rioGrandeVideo from "../assets/videos/Rio Grande .mp4";
import earsVideo from "../assets/videos/Earslovingly.mp4";
import dripVideo from "../assets/videos/Drip Dessert Lab.mp4";
import veeVeeVideo from "../assets/videos/Vee Vee - House Of Cashews.mp4";

const PAGE_PATH = "/d2c-performance-marketing-agency";

const reasons = [
  {
    title: "D2C is our focus, not a side service",
    text: "GrowBrandz understands the realities of ecommerce, from acquisition costs and product margins to repeat purchases and returns. Our approach is built around the challenges D2C founders face every day.",
  },
  {
    title: "Focused on sales, not metrics",
    text: "Clicks and impressions don't pay the bills. We focus on orders, customer acquisition costs, and the numbers that help you understand whether your marketing is working.",
  },
  {
    title: "Unique brand, unique strategy",
    text: "Whether you're launching your first campaign or scaling existing sales, we build your growth plan around your budget, past performance, and business goals.",
  },
];

const stats = [
  {
    figure: "5x",
    title: "Market growth",
    text: "India's D2C market could grow about fivefold by 2030.",
  },
  {
    figure: "3x",
    title: "Faster growth",
    text: "D2C is projected to grow nearly three times faster than traditional online marketplaces.",
  },
  {
    figure: "2 in 3",
    title: "Orders from smaller cities",
    text: "Nearly two-thirds of new D2C orders came from Tier 2 and Tier 3 cities.",
  },
];

const services = [
  {
    title: "Meta ads",
    text: "Reach new customers on Facebook and Instagram with targeted campaigns, product ads, and retargeting.",
    points: [
      "Find new customers who are likely to buy",
      "Show relevant products through catalogue ads",
      "Bring back visitors who left without buying",
      "Test audiences, creatives, and placements to improve results",
    ],
    button: "Explore Meta ads",
  },
  {
    title: "Google ads",
    text: "Reach shoppers across Google Search, Shopping, and YouTube with campaigns focused on bringing the right traffic to your store.",
    points: [
      "Show ads when shoppers search for your products",
      "Display products with prices through Google Shopping",
      "Reach potential customers through YouTube ads",
      "Reconnect with visitors who left without buying",
    ],
    button: "Explore Google ads",
  },
  {
    title: "Email and WhatsApp marketing",
    text: "Turn first-time buyers into repeat customers with timely messages, useful updates, and offers that bring them back.",
    points: [
      "Welcome new subscribers and introduce your brand",
      "Remind shoppers about items left in their cart",
      "Send order updates and back-in-stock alerts",
      "Re-engage past customers with relevant offers",
    ],
    button: "Explore D2C WhatsApp marketing",
  },
  {
    title: "Ad creative",
    text: "Create scroll-stopping ads with product videos, creator content, and fresh ideas tested to find what gets people buying.",
    points: [
      "Create product photos, videos, and UGC-style ads",
      "Test different hooks, messages, and offers",
      "Develop new ad variations with AI-assisted workflows",
      "Refresh creatives regularly to reduce ad fatigue",
    ],
    button: "Explore D2C product photography",
  },
  {
    title: "Storefront improvements",
    text: "Make shopping easier and help more visitors complete their purchase before increasing your ad spend.",
    points: [
      "Improve landing pages and product pages",
      "Make your storefront faster and easier to navigate",
      "Test offers, bundles, and trust-building elements",
      "Simplify checkout, payment, and delivery options",
    ],
    button: "Explore Shopify development",
  },
  {
    title: "Tracking and reporting",
    text: "See which campaigns bring in orders and understand how your marketing spend contributes to store sales.",
    points: [
      "Set up Meta and Google conversion tracking",
      "Compare store orders with ad platform reporting",
      "Track cost per order and return on ad spend",
      "Improve tracking data so ad platforms can optimize campaigns",
    ],
    button: "Explore tracking and reporting",
  },
];

const steps = [
  {
    title: "Let's figure out what's holding you back",
    text: "If you are launching your first D2C product or struggling to grow beyond your current sales, GrowBrandz starts by understanding your business and what you need next.",
  },
  {
    title: "Set goals that make sense for your business",
    text: "At GrowBrandz, we plan around your budget, product margins, and sales targets, so you know what you're working towards before you invest more.",
  },
  {
    title: "Give customers more reasons to buy",
    text: "We help you improve your offers, product pages, and buying experience, so shoppers have fewer reasons to leave and more reasons to choose your brand.",
  },
  {
    title: "Reach the people most likely to buy",
    text: "GrowBrandz brings together campaign strategy, creatives, and customer targeting to help your products reach the right audience and turn interest into orders.",
  },
  {
    title: "Turn what works into your next growth opportunity",
    text: "As your brand gets more orders and customer data, we use those learnings to make better decisions, improve performance, and help you move towards your next milestone.",
  },
];

const categories = [
  {
    title: "FMCG & Consumer Brands",
    text: "Growing direct sales through video marketing, product offers, and customer retention.",
  },
  {
    title: "Food & Beverage",
    text: "Driving repeat orders through social media, subscriptions, and seasonal offers.",
  },
  {
    title: "Health & Wellness",
    text: "Building trust while driving customer acquisition and repeat purchases.",
  },
  {
    title: "Fashion & Apparel",
    text: "Creative-led campaigns that sell new collections and trends.",
  },
  {
    title: "Lifestyle & Consumer Products",
    text: "Turning product discovery into purchases through compelling creatives and targeted campaigns.",
  },
];

const brands = ["Zam Zam", "Rio Grande", "Ears Lovingly", "Drip", "Vee Vee"];

const stories = [
  {
    brand: "Zam Zam",
    industry: "Food & Beverages",
    headline: "Turning store growth into stronger sales.",
    text: "We helped Zamzam strengthen its online presence and drive business growth through a focused digital marketing strategy.",
    stats: [
      { figure: "10–15%", label: "Increase in store sales" },
      { figure: "12.5K", label: "Followers, up from 9.8K" },
    ],
    video: zamZamVideo,
  },
  {
    brand: "Rio Grande",
    industry: "Real Estate",
    headline: "Turning ad spend into a steady flow of leads.",
    text: "We ran targeted Meta Ads campaigns to help Rio reach potential customers and generate daily leads while managing advertising spend.",
    stats: [
      { figure: "15–20", label: "Potential leads generated per day" },
      { figure: "₹1,000–₹1,200", label: "Average daily ad spend" },
    ],
    video: rioGrandeVideo,
  },
  {
    brand: "Earslovingly",
    industry: "Healthcare",
    headline: "Building visibility for a new brand.",
    text: "We focused on growing brand awareness through social media content, helping a new brand reach a wider audience and gain organic attention.",
    stats: [
      { figure: "40K", label: "Organic views on one video" },
      { figure: "New brand", label: "Building awareness and visibility" },
    ],
    video: earsVideo,
  },
  {
    brand: "Drip Dessert Lab",
    industry: "Food & Beverages",
    headline: "Turning local visibility into more store visits.",
    text: "We helped Drip Dessert Lab improve its local brand visibility and attract more customers to its physical store.",
    stats: [
      { figure: "5–10%", label: "Increase in store footfall" },
      { figure: "Local visibility", label: "Greater awareness among potential customers" },
    ],
    video: dripVideo,
  },
  {
    brand: "Vee Vee - House Of Cashews",
    industry: "Food & Beverages",
    headline: "Growing brand visibility and organic enquiries.",
    text: "We helped Vee Vee House of Cashews strengthen brand and founder visibility across Tamil Nadu, creating more opportunities to attract organic enquiries.",
    stats: [
      { figure: "Tamil Nadu", label: "Increased regional brand visibility" },
      { figure: "Organic enquiries", label: "More opportunities to connect with potential customers" },
    ],
    video: veeVeeVideo,
  },
];

function StorySoundIcon({ muted }) {
  if (muted) {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 9h3.2L12 5.2v13.6L7.2 15H4V9zm12.1 3 2.4-2.4 1.1 1.1L17.2 13.1l2.4 2.4-1.1 1.1-2.4-2.4-2.4 2.4-1.1-1.1 2.4-2.4-2.4-2.4 1.1-1.1 2.4 2.4z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 9h3.2L12 5.2v13.6L7.2 15H4V9zm9.5-1.6 1.6 1.3c.8.9 1.3 2.1 1.3 3.3s-.5 2.4-1.3 3.3l-1.6 1.3V7.4zm3.2-2.5 1.4 1.5c1.4 1.5 2.2 3.4 2.2 5.6s-.8 4.1-2.2 5.6l-1.4 1.5V4.9z"
        fill="currentColor"
      />
    </svg>
  );
}

function StoryShowcase() {
  const [active, setActive] = useState(0);
  const [soundIndex, setSoundIndex] = useState(null);
  const videoRefs = useRef([]);
  const story = stories[active];

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      video.muted = soundIndex !== index;
      const play = video.play();
      if (play) play.catch(() => {});
    });
  }, [soundIndex]);

  const toggleSound = (index) => {
    setSoundIndex((current) => (current === index ? null : index));
    setActive(index);
  };

  return (
    <div className="d2cStoryStage">
      <div className="d2cReelRow">
        {stories.map((item, index) => {
          const muted = soundIndex !== index;
          return (
            <article
              key={item.brand}
              className={`d2cReel ${index === active ? "isActive" : ""}`}
              onClick={() => setActive(index)}
            >
              <video
                ref={(node) => {
                  videoRefs.current[index] = node;
                }}
                src={item.video}
                autoPlay
                muted={muted}
                loop
                playsInline
                preload="metadata"
              />
              <div className="d2cReelShade" />
              <p className="d2cReelName">{item.brand}</p>
              <button
                type="button"
                className="d2cStoryMute"
                aria-pressed={!muted}
                aria-label={muted ? `Unmute ${item.brand}` : `Mute ${item.brand}`}
                onClick={(event) => {
                  event.stopPropagation();
                  toggleSound(index);
                }}
              >
                <StorySoundIcon muted={muted} />
              </button>
            </article>
          );
        })}
      </div>
      <article className="d2cStoryCard">
        <div className="d2cStoryCopy">
          <p className="d2cStoryIndustry">{story.industry}</p>
          <h3>{story.headline}</h3>
          <p className="d2cStoryBrand">{story.brand}</p>
          <p>{story.text}</p>
        </div>
        <div className="d2cStoryStats">
          {story.stats.map((stat) => (
            <div key={stat.label}>
              <p className="d2cStoryFigure">{stat.figure}</p>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

const faqs = [
  {
    question: "What does GrowBrandz will do for D2C Brands??",
    answer:
      "GrowBrandz is an end-to-end D2C marketing agency that helps brands grow their online business. From market research and product photography to website development, social media marketing, ad management, and retargeting, we provide complete marketing solutions to help D2C brands increase sales and generate revenue.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Early signals often show in 4 to 6 weeks. Steady growth takes longer because ad platforms need time to learn who buys from you.",
  },
  {
    question: "How much should I spend on D2C Meta ads each month?",
    answer:
      "Enough to get steady orders. Meta's ad system needs around 50 results a week for each ad set to settle, so your budget depends on what an order costs you. We work out the number after reviewing yours.",
  },
  {
    question: "What is the difference between D2C marketing and ecommerce marketing?",
    answer:
      "D2C marketing sells your own products from your own store. Ecommerce marketing is wider and also covers marketplaces like Amazon, Flipkart, and Meesho.",
  },
  {
    question: "How much does D2C marketing cost in India?",
    answer:
      "Marketing for D2C brands has two costs: your ad spend, which you pay to Meta and Google, and our agency fee. Our fee depends on the work you need, and we share a clear quote after the first call.",
  },
 
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GrowBrandz",
  alternateName: "GrowBrandz D2C & Ecommerce Marketing Agency.",
  url: "https://growbrandz.com",
  logo: "https://ik.imagekit.io/growbrandz/GROW%E2%80%A8BRANDZ.svg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-8012005000",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["en", "Hindi", "Tamil"],
  },
  sameAs: [
    "https://www.linkedin.com/company/growbrandz",
    "https://growbrandz.com",
    "https://www.instagram.com/grow_brandz",
  ],
};

function D2cPerformance() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <>
      <PageSeo
        title="D2C Performance Marketing Agency | GrowBrandz"
        description="GrowBrandz helps D2C brands scale profitably with smarter ads and higher conversion rates, turning ad spend into measurable growth."
        path={PAGE_PATH}
      />
      <Helmet>
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            }),
          }}
        />
      </Helmet>

      <main className="d2cPage">
        <section className="container d2cHero servicesHero commonHero">
          <h1>
            D2C Performance Marketing Agency That Turns Ad Spend{" "}
            <span className="word">
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
                  fill="#EC4899"
                />
              </svg>
              <span>Into Sales</span>
            </span>
          </h1>
          <p>
            GrowBrandz is the best D2C performance marketing agency for product
            brands. We find the right buyers, fix what stops them from ordering,
            and show you every sale in plain words.
          </p>
          <div className="d2cHeroActions">
            <Link className="button1" to="/contact">
              Book a call
            </Link>
            <Link className="button2" to={{ hash: "#growth-stories" }}>
              Explore our work
            </Link>
          </div>
          <ul className="d2cBrands">
            {brands.map((brand) => (
              <li key={brand}>{brand}</li>
            ))}
          </ul>
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

        <section className="container d2cReasons">
          <h2>
            Why D2C brands <span>choose</span> GrowBrandz
          </h2>
          <p className="d2cLead">
            You've built a product people want. Now you need marketing that
            turns that demand into consistent sales without eating into your
            margins.
          </p>
          <div className="d2cReasonGrid">
            {reasons.map((item, index) => (
              <article key={item.title}>
                <p>0{index + 1}</p>
                <h3>{item.title}</h3>
                <p className="d2cLead">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <Divider
          bgColor="#FFF2EC"
          fillColor="#6842EF"
          boxStroke="#FFFFFF"
          gridStroke="#000000"
        />

        <section className="container d2cNeed">
          <h2>Why D2C brands need performance marketing</h2>
          <div className="d2cStats">
            {stats.map((item) => (
              <article key={item.figure}>
                <p className="d2cFigure">{item.figure}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p>
            India's D2C market is expanding rapidly, creating new opportunities
            for brands to reach customers and scale their businesses. But with
            increasing competition and changing consumer behavior, sustainable
            growth requires more than just visibility. Performance marketing
            helps D2C brands reach the right audience, optimize ad spend, and
            turn marketing efforts into measurable sales.
          </p>
          <div className="d2cCtaLine">
            <h3>Ready to turn these growth opportunities into sales?</h3>
            <Link className="button1" to="/contact">
              Let's talk
            </Link>
          </div>
        </section>

        <Divider
          bgColor="#6842EF"
          fillColor="#FFF2EC"
          boxStroke="#000000"
          gridStroke="#000000"
        />

        <section className="container d2cServices">
          <h2>Our D2C performance marketing services</h2>
          <p className="d2cLead">
            GrowBrandz's D2C performance marketing covers every step that takes
            a shopper from first view to repeat order.
          </p>
          {services.map((service, index) => (
            <article className="d2cService" key={service.title}>
              <div>
                <p className="d2cIndex">0{index + 1}</p>
                <h3>{service.title}</h3>
              </div>
              <div>
                <p>{service.text}</p>
                <ul>
                  {service.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Link className="button1" to="#">
                  {service.button}
                </Link>
              </div>
            </article>
          ))}
        </section>

        <Divider
          bgColor="#FFF2EC"
          fillColor="#6842EF"
          boxStroke="#FFFFFF"
          gridStroke="#000000"
        />

        <section className="container d2cSteps">
          <h2>How GrowBrandz helps your D2C brand grow</h2>
          <p className="d2cLead">From first call to steady sales in 5 steps.</p>
          <ol>
            {steps.map((step, index) => (
              <li key={step.title}>
                <p className="d2cIndex">0{index + 1}</p>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="container d2cCall">
          <h2>Ready to find what is slowing your D2C sales?</h2>
          <p>
            Book a 30-minute call. Bring your store link and ad numbers. We
            will tell you what we would fix first.
          </p>
          <Link className="button1" to="/contact">
            Book a call
          </Link>
        </section>

        <Divider
          bgColor="#6842EF"
          fillColor="#FFF2EC"
          boxStroke="#000000"
          gridStroke="#000000"
        />

        <section className="container d2cCategories">
          <h2>Our D2C brand marketing for every category</h2>
          <p className="d2cLead">
            We understand that every category has different buyers, buying
            habits, and growth challenges. Our performance marketing approach
            adapts to what works for your category.
          </p>
          <div className="d2cCategoryGrid">
            {categories.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container d2cStories" id="growth-stories">
          <h2>Explore our D2C growth stories</h2>
          <p className="d2cLead">
            A closer look at how we help D2C brands turn performance marketing
            into measurable business outcomes.
          </p>
          <StoryShowcase />
        </section>

        <Divider
          bgColor="#EC4899"
          fillColor="#FFF2EC"
          boxStroke="#000000"
          gridStroke="#000000"
        />

        <section className="homeFAQ">
          <h2>Questions D2C founders ask us</h2>
          <div className="FAQ">
            {faqs.map((item, index) => (
              <div
                key={item.question}
                className={`faqItem ${activeIndex === index ? "open" : ""}`}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <h4 className="faqQuestion">
                  {item.question}
                  <span className="d2cFaqMark" aria-hidden="true">
                    {activeIndex === index ? "–" : "+"}
                  </span>
                </h4>
                {activeIndex === index && (
                  <p className="faqAnswer">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default D2cPerformance;
