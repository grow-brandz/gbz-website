import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import LottieLoop from "../components/lottiecomp";
import ContactFormModal from "../components/contactFormModal";
import { PageSeo } from "../components/PageSeo";
import { getHomeData } from "../services/api";
import { useSsrPageData } from "../hooks/useSsrPageData";
import Arrow from "../assets/lotties/right-arrow.json";
import { StoryShowcase } from "./d2c-performance-marketing.jsx";
import Divider from "../components/divider";
import webHero from "../assets/img/ecommerce-website-development1.jpg";
import webTeam from "../assets/img/ecommerce-website-development2.jpg";
import webChoice from "../assets/img/ecommerce-website-development3.jpg";
import razorpayLogo from "../assets/img/razorpay.png";
import googlePayLogo from "../assets/img/googlepay.png";
import creditCardLogo from "../assets/img/creditcard.jpg";
import shiprocketLogo from "../assets/img/shiprocket.png";
import paytmLogo from "../assets/img/paytm.png";
import billdeskLogo from "../assets/img/billdesk.jpg";
import "./ecommerce-marketing.css";

function Icon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const includeIcons = [
  <Icon key="design"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M4 9h16M8 13h4" /></Icon>,
  <Icon key="dev"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4" /></Icon>,
  <Icon key="pay"><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18M7 15h4" /></Icon>,
  <Icon key="test"><path d="M8 12l2.5 2.5L16 9" /><circle cx="12" cy="12" r="8" /></Icon>,
];

const serviceIcons = [
  <Icon key="new"><path d="M6 9h12l-1 10H7L6 9z" /><path d="M9 9V7a3 3 0 0 1 6 0v2" /></Icon>,
  <Icon key="redesign"><path d="M4 12a8 8 0 0 1 13.5-5.8" /><path d="M16 4v4h-4" /><path d="M20 12a8 8 0 0 1-13.5 5.8" /><path d="M8 20v-4h4" /></Icon>,
  <Icon key="move"><path d="M4 7h7v10H4z" /><path d="M13 12h6" /><path d="M16 9l3 3-3 3" /></Icon>,
  <Icon key="custom"><path d="M12 4v16M4 12h16" /><circle cx="12" cy="12" r="8" /></Icon>,
  <Icon key="speed"><path d="M5 16a7 7 0 1 1 14 0" /><path d="M12 13l3-3" /></Icon>,
  <Icon key="care"><path d="M12 4l7 3v5c0 4.2-2.8 6.8-7 8-4.2-1.2-7-3.8-7-8V7l7-3z" /></Icon>,
];

const platformIcons = [
  <Icon key="hosted"><path d="M7 16h10a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.6-1.2A3.5 3.5 0 0 0 7 16z" /></Icon>,
  <Icon key="woo"><path d="M5 8h14v9H5z" /><path d="M8 8V6a4 4 0 0 1 8 0v2" /></Icon>,
  <Icon key="custom"><path d="M5 8l7-4 7 4v8l-7 4-7-4z" /><path d="M12 12l7-4M12 12v8M12 12L5 8" /></Icon>,
];

const categoryIcons = [
  <Icon key="fmcg"><path d="M4 8h16v10H4z" /><path d="M8 8V6h8v2M4 12h16" /></Icon>,
  <Icon key="food"><path d="M12 20V10" /><path d="M12 14c-3-.6-5-2.6-5-5 3 .2 5 2 5 5z" /><path d="M12 13c3-.5 5-2 5.4-4.4-3 .4-4.8 1.8-5.4 4.4z" /></Icon>,
  <Icon key="health"><path d="M12 20s-6-3.6-6-8a3.4 3.4 0 0 1 6-2 3.4 3.4 0 0 1 6 2c0 4.4-6 8-6 8z" /></Icon>,
  <Icon key="fashion"><path d="M8 6l4 3 4-3 3 2-3 3v9H8V11L5 8z" /></Icon>,
  <Icon key="life"><path d="M12 8v5M12 13l4 7H8z" /><path d="M8 8h8" /></Icon>,
];

const PAGE_PATH = "/ecommerce-website-development";

const includes = [
  {
    title: "Store design and user experience",
    text: "How your store looks and feels, from the home page to the product pages and the cart. Good ecommerce web design services make products easy to find and the next step obvious, especially on a mobile device.",
  },
  {
    title: "Store development and admin",
    text: "The code and tools behind the design. This covers your product catalogue, search and filters, discount codes, order management and a simple admin panel you can run yourself.",
  },
  {
    title: "Payments, shipping and integrations",
    text: "UPI, cards and cash on delivery are connected, along with your courier partners, GST invoices and the tools you already use. Orders then move from checkout to doorstep without manual work.",
  },
  {
    title: "Testing, launch and support",
    text: "Every page, payment, and device is checked before launch. After that, the store is handed over, and we stay available if something needs fixing.",
  },
];

const services = [
  {
    title: "New store development",
    text: "Build a new online store from scratch, from the first design to the day it goes live.",
  },
  {
    title: "Store redesign",
    text: "Give an older store a cleaner look and an easier path to checkout, without losing what already works.",
  },
  {
    title: "Platform migration",
    text: "Move your store to a better platform, with your products, customers, and Google rankings carried across with care.",
  },
  {
    title: "Custom features and integrations",
    text: "Add what your store is missing, such as subscriptions, bundles, size guides, loyalty points, or links to your inventory and shipping tools.",
  },
  {
    title: "Speed and conversion fixes",
    text: "Find what slows your store down or makes shoppers leave, then fix the pages and steps that matter most.",
  },
  {
    title: "Store care and support",
    text: "Monthly help to keep your store updated, secure, and running smoothly, so a small issue never costs you a sale.",
  },
];

const reasons = [
  {
    title: "Built by a marketing team",
    text: "GrowBrandz also runs ads, search, and messages for top ecommerce brands in India. Your store is built by people who know how visitors arrive and what makes them buy, and pages are planned around what shoppers click, not just how they look.",
  },
  {
    title: "Product pages ready for Google and AI search",
    text: "Clean page structure, complete product details, and the right markup help your products show up in Google and in AI search like ChatGPT, Claude, Perplexity and more. This is set up while the store is built, not added later.",
  },
  {
    title: "Fast and smooth on every device",
    text: "Most shoppers browse on a mobile device, so every page is built mobile first and tested on different screens and slower networks. A fast store also keeps visitors from leaving before they see your product.",
  },
  {
    title: "A checkout made for Indian shoppers",
    text: "UPI, cards, wallets, and cash on delivery sit in a short checkout with PIN code checks, so shoppers do not give up halfway.",
  },
  {
    title: "Tracking ready for marketing from day one",
    text: "Your analytics and ad tracking are set up before launch, so from the first order you can see where your buyers came from.",
  },
  {
    title: "You own your store and its code",
    text: "The store, the domain, and the code all belong to you from the first day, so changing partners later never means starting over.",
  },
];

const platforms = [
  {
    title: "Hosted store platforms",
    text: "Platforms like Shopify look after the technical side for you. They suit most D2C brands that want to launch quickly and keep the store easy to manage.",
  },
  {
    title: "WordPress with WooCommerce",
    text: "A good fit if you already run a WordPress site or want full control over content and features. It needs more care with hosting, updates, and speed.",
  },
  {
    title: "Custom-built stores",
    text: "Best for stores with unusual needs, such as complex pricing, many product options, or links to your own systems. It takes longer to build and needs more upkeep.",
  },
];

const phases = [
  {
    range: "1–2",
    title: "Weeks 1 and 2: Plan and design",
    text: "We agree on what the store needs and map out the pages. Then you get design samples for the home page, a product page, and the checkout, and you approve a direction before any building starts.",
  },
  {
    range: "3–5",
    title: "Weeks 3 to 5: Build and connect",
    text: "The store is built on a private link that you can open at any time. Products, payments, shipping, and tracking are connected as we go, and you can review progress every week.",
  },
  {
    range: "6",
    title: "Week 6: Test and go live",
    text: "Every page, payment, and device is tested, and your team is shown how the admin works. The store then goes live on a day you choose, and you receive the logins and files on the same day.",
  },
];

const tools = [
  { name: "Razorpay", src: razorpayLogo, dark: true },
  { name: "Google Pay", src: googlePayLogo },
  { name: "Credit Cards", src: creditCardLogo },
  { name: "Shiprocket", src: shiprocketLogo },
  { name: "Paytm", src: paytmLogo },
  { name: "BillDesk", src: billdeskLogo },
];

const categories = [
  {
    title: "FMCG & Consumer Brands",
    text: "Bundles, pack sizes and easy reordering for products that customers buy again and again.",
  },
  {
    title: "Food & Beverage",
    text: "Pin code checks for delivery, subscriptions, and clear details on ingredients and shelf life.",
  },
  {
    title: "Health & Wellness",
    text: "Clear product information, trust signals and wording that stays within the advertising rules for health claims.",
  },
  {
    title: "Fashion & Apparel",
    text: "Size guides, clear returns information and image galleries that show fit and fabric.",
  },
  {
    title: "Lifestyle & Consumer Products",
    text: "Gift options, collections, and product pages that show the item in real use.",
  },
];

const inactiveFaqIcon = `
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="44" height="44" rx="22" fill="#EFECFD"/>
  <path d="M16 19L22 25L28 19" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
  </svg>
`;

const activeFaqIcon = `
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="44" height="44" rx="22" fill="#6842EF"/>
  <path d="M16 19L22 25L28 19" stroke="#EFECFD" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
  </svg>
`;

const faqs = [
  {
    question: "What is ecommerce website development and what does it include?",
    answer:
      "Ecommerce website development, also called ecommerce web development, is the work of building an online store where customers can browse, pay, and place orders. Ecommerce web development services usually cover the design, the store's code and admin, payment and shipping connections, and testing before launch.",
  },
  {
    question: "How much does ecommerce website development cost in India?",
    answer:
      "The cost depends on three things: the platform, how custom the design is, and how many features you need. GrowBrandz gives you a written scope and quote after a short call.",
  },
  {
    question: "How long does it take to build an ecommerce website?",
    answer:
      "A typical store takes about six weeks from the first call to launch. A larger catalogue, custom features or a platform move can add time, and a clear plan with dates is agreed at the start.",
  },
  {
    question: "Which platform is best for an Indian online store?",
    answer:
      "For most D2C brands, a hosted platform such as Shopify is the easiest way to launch and manage a store. WooCommerce suits brands that already use WordPress, and a custom build suits stores with unusual needs. The best choice depends on your products, your team and how fast you plan to grow.",
  },
  {
    question: "Can you move my store without losing my Google rankings?",
    answer:
      "Yes, if the move is planned properly. Old page addresses are matched to the new ones, redirects are set up, and rankings are checked after the move. Some small movement is normal in the first few weeks.",
  },
  {
    question: "Will my store work well on mobile?",
    answer:
      "Yes, stores are designed for phones first, then adapted for larger screens, and tested on different devices and networks before launch.",
  },
  {
    question: "Are my customers' data and payments safe on my store?",
    answer:
      "Payments are handled by established payment gateways, so card details do not sit on your own server. Your store also gets an SSL certificate, regular backups, and security updates.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes, after launch there is a support window for fixes, and you can continue with monthly care for updates, security, and improvements.",
  },
  {
    question: "Do I need my own store if I sell on marketplaces?",
    answer:
      "Marketplaces bring buyers, but you do not own the customer or the data. Your own store lets you build your brand, keep customer details, and run your own offers, and many brands use both.",
  },
  {
    question: "Can you add features to my existing store?",
    answer:
      "Yes, common additions include subscriptions, bundles, size guides, loyalty points, and links to inventory or shipping tools. We first check how your store was built, so new features do not slow it down.",
  },
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GrowBrandz",
  alternateName: "GrowBrandz D2C & Ecommerce Marketing Agency",
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

function Highlight({ children }) {
  return (
    <span className="word">
      <svg
        className="highlight-shape"
        width="680"
        height="125"
        viewBox="0 0 680 125"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0 30.8266L680 0V115.176L340 120.542L0 125V30.8266Z"
          fill="#EC4899"
        />
      </svg>
      <span>{children}</span>
    </span>
  );
}

function EcomPhoto({ src, alt, priority = false }) {
  if (!src) return null;
  return (
    <figure className="ecomPhoto">
      <img
        src={src}
        alt={alt}
        width={640}
        height={480}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </figure>
  );
}

function EcommerceWebsite() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const homeData = useSsrPageData("/", getHomeData);
  const story = homeData?.our_story;
  const openForm = () => setFormOpen(true);

  return (
    <>
      <PageSeo
        title="Ecommerce Website Development Company in India | GrowBrandz"
        description="GrowBrandz is an ecommerce website development company in India. We build fast online stores with UPI, COD, SEO, and tracking set up from day one."
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

      <main className="ecomPage">
        <section className="container ecomHero">
          <div className="ecomHeroCopy">
            <h1>
              Ecommerce Website Development Company in India for{" "}
              <Highlight>Stores Built to Sell</Highlight>
            </h1>
            <p>
              GrowBrandz is an ecommerce website development company in India.
              We design and build stores with the checkout, speed, and tracking
              that an Indian brand needs from day one.
            </p>
            <div className="ecomHeroActions">
              <button type="button" className="button1" onClick={openForm}>
                Book a call
              </button>
              <Link className="button2" to={{ hash: "#growth-stories" }}>
                Explore our work
              </Link>
            </div>
          </div>
          <EcomPhoto
            priority
            src={webHero}
            alt="Hands on a laptop showing an online clothing store, with a phone and a payment card on the desk"
          />
        </section>

        <section className="container ecomStages">
          <h2>What our ecommerce website development includes</h2>
          <p className="ecomIntro">
            Ecommerce website development is everything that goes into building
            an online store that people can find, trust, and buy from. Most
            projects are made up of four parts.
          </p>
          <div className="ecomStageGrid">
            {includes.map((item, index) => (
              <article key={item.title}>
                <span>{includeIcons[index]}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ecomServices">
          <div className="container">
            <div className="ecomServicesHead">
              <h2>Our ecommerce website development services</h2>
              <p className="ecomIntro">
                Whether you are starting fresh or fixing a store you already
                have, these are the ecommerce website development services
                GrowBrandz offers.
              </p>
            </div>
            <div className="ecomServiceGrid">
              {services.map((service, index) => (
                <article key={service.title}>
                  <span className="ecomServiceIcon">{serviceIcons[index]}</span>
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                  <button
                    type="button"
                    className={index % 2 === 0 ? "button1" : "button2"}
                    onClick={openForm}
                  >
                    Book a call
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ecomWhy">
          <div className="container">
            <div className="ecomSplit">
              <div>
                <h2>Why GrowBrandz stands out from other ecommerce website companies</h2>
                <p className="ecomIntro">
                  Every ecommerce website development agency says it has an
                  expert team and delivers on time. Here is what is actually
                  different about working with GrowBrandz.
                </p>
              </div>
              <EcomPhoto
                src={webTeam}
                alt="Three people planning a layout together around a laptop"
              />
            </div>
            <ol>
              {reasons.map((item, index) => (
                <li key={item.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="ecomWhyActions">
              <button type="button" className="button1" onClick={openForm}>
                Book a call
              </button>
            </div>
          </div>
        </section>

        <section className="container ecomStages">
          <h2>Which platform fits your store?</h2>
          <p className="ecomIntro">
            The right platform depends on your products, your team, and how
            fast you want to grow. Here is a plain guide to the three common
            routes.
          </p>
          <div className="ecomStageGrid thirds">
            {platforms.map((item, index) => (
              <article key={item.title}>
                <span>{platformIcons[index]}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ecomAsk">
          <div className="container ecomAskInner">
            <div>
              <h2>Not sure which to pick?</h2>
              <p>
                Tell us what you sell, whether you have a store today, and when
                you would like to launch. GrowBrandz will reply with the
                platform we would suggest, the pages your store needs and a
                realistic timeline.
              </p>
              <button type="button" className="button2" onClick={openForm}>
                Book a call
              </button>
            </div>
            <EcomPhoto
              src={webChoice}
              alt="Two people reviewing a product catalogue together on a laptop"
            />
          </div>
        </section>

        <section className="container ecomDays">
          <h2>From first call to launch day</h2>
          <p className="ecomIntro">
            Most stores launch in about six weeks, though the exact time
            depends on how many products and features you need. Here is how it
            usually goes.
          </p>
          <ol className="ecomDayTrack">
            {phases.map((item, index) => (
              <li key={item.title}>
                <div className="ecomDayMark" aria-hidden="true">
                  <span>0{index + 1}</span>
                  <strong>{item.range}</strong>
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="ecomMarket">
          <div className="container ecomMarketInner">
            <div>
              <h2>Connected to the payment and shipping tools you already use</h2>
              <button type="button" className="button1" onClick={openForm}>
                Book a call
              </button>
            </div>
            <div className="ecomMarketCollage ecomPayCollage">
              {tools.map((tool) => (
                <span key={tool.name} className={tool.dark ? "logoDark" : undefined}>
                  <img src={tool.src} alt={`${tool.name} logo`} />
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="ecomBrands">
          <div className="container">
            <h2>Stores built for your category</h2>
            <p className="ecomIntro">
              Shoppers in different categories look for different things, so
              each store is planned around what your buyers need.
            </p>
            <div className="ecomBrandGrid categories">
              {categories.map((item, index) => (
                <article key={item.title}>
                  <div>
                    <span className="ecomBrandIcon">{categoryIcons[index]}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="container ecomStories" id="growth-stories">
          <h2>Explore our growth stories</h2>
          <StoryShowcase />
        </section>

        <section className="ceoSection">
          <div className="container row">
            <div className="imageSide">
              <img
                className="homeceoFloat1"
                src="https://ik.imagekit.io/growbrandz/homeabout1.png"
                alt="Creative elements representing ecommerce store building"
              />
              {story?.linkedin_id?.url ? (
                <a
                  href={story.linkedin_id.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="homeceoImage"
                    src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceoImage.png"
                    alt={story?.team_member_name || "Jafer, Chief executive officer"}
                  />
                </a>
              ) : (
                <img
                  className="homeceoImage"
                  src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceoImage.png"
                  alt={story?.team_member_name || "Jafer, Chief executive officer"}
                />
              )}
              <LottieLoop animationData={Arrow} className="homeceoFloat2" />
            </div>
            <div className="contentSide">
              <div className="ceoHeading">
                {story?.heading ||
                  "We are passionate about creative ideas that actually make sense."}
              </div>
              <p>
                {story?.paragraph ||
                  "Growbrandz was built with one clear belief. Creativity should solve real business problems. After working closely with founders and fast growing D2C brands, we saw a gap between beautiful work and work that truly drives digital sales growth. So we built a team that thinks in strategy, performance, and long term ecommerce revenue growth, not just visuals. We partner closely with brands, understand their goals deeply, and work as an extension of their team to help them scale with clarity and confidence."}
              </p>
              <button type="button" className="button2" onClick={openForm}>
                Let's talk
              </button>
            </div>
          </div>
          <img
            className="homeceoExtra1"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo1.png"
            alt="Ecommerce store design and development visual element"
          />
          <img
            className="homeceoExtra2"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo2.png"
            alt="Online store pages planned for product sales"
          />
          <img
            className="homeceoExtra3"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo3.png"
            alt="Design process behind an ecommerce website"
          />
          <img
            className="homeceoExtra4"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo4.png"
            alt="Checkout and product page planning for an online store"
          />
          <img
            className="homeceoExtra5"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo5.png"
            alt="Team working on an ecommerce website launch"
          />
        </section>

        <Divider
          bgColor="#EC4899"
          fillColor="#FFD703"
          boxStroke="#000000"
          gridStroke="#000000"
        />

        <section className="homeFAQ">
          <h2>Ecommerce website development questions founders ask</h2>
          <div className="FAQ">
            {faqs.map((item, index) => (
              <div
                key={item.question}
                className={`faqItem ${activeIndex === index ? "open" : ""}`}
                onClick={() =>
                  setActiveIndex(activeIndex === index ? null : index)
                }
              >
                <div className="faqQuestion">
                  {item.question}
                  <div
                    className={`faqIcon ${activeIndex === index ? "rotate" : ""}`}
                    dangerouslySetInnerHTML={{
                      __html:
                        activeIndex === index ? activeFaqIcon : inactiveFaqIcon,
                    }}
                  />
                </div>
                {activeIndex === index && (
                  <p className="faqAnswer">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}

export default EcommerceWebsite;
