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
import shopHero from "../assets/img/shopify-website-development1.jpg";
import shopPay from "../assets/img/shopify-website-development2.jpg";
import shopReview from "../assets/img/shopify-website-development3.jpg";
import razorpayLogo from "../assets/img/razorpay.png";
import payuLogo from "../assets/img/payu.png";
import cashfreeLogo from "../assets/img/cashfree.png";
import shiprocketLogo from "../assets/img/shiprocket.png";
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

const typeIcons = [
  <Icon key="theme"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M4 9h16M8 13h5" /></Icon>,
  <Icon key="apps"><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></Icon>,
  <Icon key="custom"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4" /></Icon>,
  <Icon key="store"><path d="M4 10h16l-1.2 9H5.2L4 10z" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Icon>,
];

const serviceIcons = [
  <Icon key="dev"><path d="M6 9h12l-1 10H7L6 9z" /><path d="M9 9V7a3 3 0 0 1 6 0v2" /></Icon>,
  <Icon key="design"><path d="M5 16l4-8 3 5 2-3 5 6" /><path d="M4 19h16" /></Icon>,
  <Icon key="move"><path d="M4 7h7v10H4z" /><path d="M13 12h6" /><path d="M16 9l3 3-3 3" /></Icon>,
  <Icon key="theme"><path d="M4 6h16v12H4z" /><path d="M8 6V4h8v2" /></Icon>,
  <Icon key="apps"><path d="M12 4v16M4 12h16" /><circle cx="12" cy="12" r="8" /></Icon>,
  <Icon key="speed"><path d="M5 16a7 7 0 1 1 14 0" /><path d="M12 13l3-3" /></Icon>,
];

const teamIcons = [
  <Icon key="designers"><circle cx="12" cy="8" r="3" /><path d="M6 19c1.2-2.6 3.2-4 6-4s4.8 1.4 6 4" /></Icon>,
  <Icon key="devs"><path d="M8 8l-4 4 4 4M16 8l4 4-4 4" /></Icon>,
  <Icon key="lead"><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /><path d="M6 19c1-2.4 3-3.5 6-3.5S17 16.6 18 19" /><path d="M18 8h3M19.5 6.5v3" /></Icon>,
  <Icon key="growth"><path d="M4 16l5-5 3 3 8-8" /><path d="M14 6h6v6" /></Icon>,
];

const PAGE_PATH = "/shopify-website-development";

const storeTypes = [
  {
    title: "Customised Shopify theme",
    text: "Start with a proven Shopify theme and customise its colours, fonts, product pages, and collections to match your brand. A good choice if you are launching your first online store. Typical timeline: 3-4 weeks.",
  },
  {
    title: "Shopify theme with essential apps",
    text: "Add apps for customer reviews, product bundles, subscriptions, and COD verification. We select and test the apps your store actually needs, without adding unnecessary features. Typical timeline: 4-6 weeks.",
  },
  {
    title: "Custom Shopify development",
    text: "Need something beyond standard themes and apps? We build custom sections, product layouts, and additional features to match your business requirements. Typical timeline: 6-10 weeks.",
  },
  {
    title: "Fully custom Shopify storefront",
    text: "Get a storefront designed around your brand, product catalogue, and shopping experience. This approach is suitable for businesses with more complex design and functionality requirements. Typical timeline: 10 weeks or more.",
  },
];

const indiaSetup = [
  {
    title: "UPI, cards, and wallet payments",
    text: "Connect payment gateways such as Razorpay, Paytm, and Cashfree to accept UPI, debit cards, credit cards, and supported wallets. We test the payment flow to make sure customers can complete their purchases without unnecessary steps.",
  },
  {
    title: "Cash on delivery with order verification",
    text: "Give customers the option to pay when their orders arrive. We can integrate COD verification tools with OTP confirmation and other checks to help reduce fake orders and unnecessary returns.",
  },
  {
    title: "GST and invoice configuration",
    text: "Set up your product tax settings and invoice generation based on your business requirements, making order and tax records easier to manage.",
  },
  {
    title: "Shipping and delivery integration",
    text: "Connect courier platforms such as Shiprocket and other supported delivery partners. Customers can check delivery availability, receive tracking updates, and follow their orders after purchase.",
  },
  {
    title: "Address and PIN code validation",
    text: "Help customers enter complete delivery details during checkout. PIN code serviceability checks and address validation can reduce avoidable delivery issues.",
  },
];

const services = [
  {
    title: "Shopify store development",
    text: "Launch a new Shopify store with your product catalogue, collections, payment gateways, shipping options, and essential store settings configured before launch.",
  },
  {
    title: "Shopify website design",
    text: "Create a store that reflects your brand and makes shopping simple. We design homepages, product pages, collection pages, and other important sections with mobile shoppers in mind.",
  },
  {
    title: "Shopify store migration",
    text: "Moving from WooCommerce, Wix, Magento, or another platform? We help transfer your products, customer information, and important website data while planning URL redirects to protect your existing search visibility.",
  },
  {
    title: "Shopify theme customization",
    text: "Make your existing Shopify theme work better for your business. We customise layouts, sections, navigation, and product pages to match your requirements.",
  },
  {
    title: "Shopify apps and custom features",
    text: "Need product reviews, subscriptions, loyalty programmes, or other features? We integrate suitable Shopify apps or develop custom functionality when existing apps do not meet your needs.",
  },
  {
    title: "Shopify store optimisation",
    text: "Improve page loading speed, mobile usability, navigation, and checkout experience. We identify issues that make shopping difficult and work on practical improvements.",
  },
];

const team = [
  {
    title: "Shopify website designers",
    text: "Our designers create the visual layout of your store, including the homepage, product pages, and shopping experience. The focus is on making your brand look consistent and your products easy to explore.",
  },
  {
    title: "Shopify website developers",
    text: "Our Shopify web developers bring the designs to life. They handle theme development, custom features, payment integrations, shipping connections, and technical setup.",
  },
  {
    title: "Dedicated project lead",
    text: "You have one point of contact throughout the project. They share progress updates, coordinate tasks, and help you get answers to your questions.",
  },
  {
    title: "Growth marketing support",
    text: "We also consider what happens after launch. Our marketing team checks important SEO elements, analytics, and conversion tracking so your store is better prepared for marketing campaigns.",
  },
];

const migration = [
  {
    range: "01",
    title: "Transfer your important store data",
    text: "We migrate your products, images, customer information, and other supported store data. We also check the transferred information against your existing store.",
  },
  {
    range: "02",
    title: "Set up redirects for existing URLs",
    text: "Your old website URLs are mapped to their relevant new Shopify pages. This helps customers find the right products and helps search engines understand the changes.",
  },
  {
    range: "03",
    title: "Test before your new store goes live",
    text: "We build and test your Shopify store before switching over. Once the important pages, payments, and checkout are ready and you approve the store, we plan the launch.",
  },
];

const afterLaunch = [
  {
    title: "Week 1 - Order and payment checks",
    text: "We monitor the initial orders and check for payment, checkout, shipping, and tracking issues. Any identified problems are addressed.",
  },
  {
    title: "Weeks 2-3 - Store performance review",
    text: "We review page speed, mobile experience, checkout behaviour, and tracking to identify areas that need improvement.",
  },
  {
    title: "Week 4 - Your next improvement plan",
    text: "You receive a prioritised list of recommended improvements based on the issues identified and opportunities to improve your store.",
  },
];

const tools = [
  { name: "Razorpay", src: razorpayLogo, dark: true },
  { name: "PayU", src: payuLogo },
  { name: "Cashfree", src: cashfreeLogo },
  { name: "Shiprocket", src: shiprocketLogo },
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
    question: "What does Shopify website development include?",
    answer:
      "Shopify website development includes designing, building, and setting up your online store. It covers theme customization, product pages, payment gateways, shipping integrations, apps, testing, and launch. You also receive a handover to help you manage your store.",
  },
  {
    question: "How much does Shopify website development cost in India?",
    answer:
      "The cost depends on your store design, required features, integrations, and level of customization. You should also consider ongoing expenses such as your Shopify subscription, payment gateway charges, applicable transaction fees, GST, and paid apps. GrowBrandz provides a project scope and quotation based on your requirements.",
  },
  {
    question: "How long does it take to build a Shopify store?",
    answer:
      "A Shopify store using a customised theme usually takes 3-4 weeks. Stores requiring additional apps may take 4-6 weeks, while custom development can take 6-10 weeks or longer. The final timeline depends on the project scope and requirements.",
  },
  {
    question: "Is Shopify Payments available in India?",
    answer:
      "No. Shopify Payments is currently unavailable to merchants in India. Indian Shopify stores can use supported third-party payment gateways such as Razorpay, PayU, and Cashfree. Additional transaction fees may apply depending on your Shopify plan and payment setup.",
  },
  {
    question: "Do I need a Shopify website designer or developer?",
    answer:
      "A designer focuses on your store's appearance, layout, and shopping experience. A developer handles the technical side, including theme customization, integrations, and custom features. If you need a complete online store, having both skills within one team makes the process easier.",
  },
  {
    question: "Should I hire a Shopify web development agency or a freelancer?",
    answer:
      "A freelancer can be suitable for smaller tasks, such as changing a theme section or fixing a particular issue. A Shopify web development agency is a better option when you need design, development, integrations, testing, and ongoing support together.",
  },
  {
    question: "Is Shopify better than WooCommerce for an Indian D2C brand?",
    answer:
      "Both platforms can work well. Shopify is a good choice if you want a managed ecommerce platform with hosting, security, and updates handled for you. WooCommerce may suit businesses that need more control over their WordPress website and technical setup. The right choice depends on your business requirements.",
  },
  {
    question: "Will I own my Shopify store after development?",
    answer:
      "Yes. Your Shopify store and domain should be registered under your business ownership. Custom code and third-party apps should also have clear ownership and access arrangements. You can work with another development partner whenever you choose.",
  },
  {
    question: "Can you migrate my existing store to Shopify without losing SEO rankings?",
    answer:
      "We plan migrations to minimise SEO impact. This includes mapping old URLs to new pages, setting up 301 redirects, transferring relevant content, and checking important pages after launch. However, no agency can guarantee that rankings will remain exactly the same during a platform migration.",
  },
  {
    question: "Do I need Shopify Plus for my D2C business?",
    answer:
      "Not necessarily. Most growing D2C businesses can start with a standard Shopify plan. Shopify Plus is worth considering when your business needs advanced features, higher-volume operations, or more complex checkout requirements.",
  },
  {
    question: "Do you provide support after my Shopify store goes live?",
    answer:
      "Yes. We review the store during the first 30 days, checking orders, payments, speed, checkout, and tracking. We can also discuss ongoing maintenance and improvement requirements based on your business needs.",
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

function ShopifyDevelopment() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const homeData = useSsrPageData("/", getHomeData);
  const story = homeData?.our_story;
  const openForm = () => setFormOpen(true);

  return (
    <>
      <PageSeo
        title="Shopify Website Development Agency in India | GrowBrandz"
        description="GrowBrandz is a Shopify website development agency in India. We build D2C stores with UPI, COD, GST, and speed setup from day one."
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
              Shopify Website Development Built for{" "}
              <Highlight>UPI, COD, and Mobile Shoppers</Highlight>
            </h1>
            <p>
              Your customers shop on their phones, pay through UPI, and often
              prefer cash on delivery. Your Shopify store should make all of
              this easy.
            </p>
            <p>
              GrowBrandz is a Shopify website development agency in India. We
              design and build Shopify stores that match how Indian customers
              browse, shop, and pay. From your first store to a complete
              redesign, we help you create an online store that is easy to use
              and ready to grow.
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
            src={shopHero}
            alt="A phone held over a card machine at a shop checkout"
          />
        </section>

        <section className="container ecomStages">
          <h2>What type of Shopify store does your business need?</h2>
          <p className="ecomIntro">
            Not every business needs a fully custom Shopify store. The right
            approach depends on your products, features, budget, and business
            goals. Here are four ways we can build your store.
          </p>
          <div className="ecomStageGrid">
            {storeTypes.map((item, index) => (
              <article key={item.title}>
                <span>{typeIcons[index]}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <p className="ecomIntro">
            Not sure which option is right for your business? Share your
            requirements, and we will recommend a practical approach that fits
            your needs.
          </p>
          <div className="ecomWhyActions">
            <button type="button" className="button1" onClick={openForm}>
              Book a call
            </button>
          </div>
        </section>

        <section className="ecomWhy">
          <div className="container">
            <div className="ecomSplit">
              <div>
                <h2>Shopify stores designed for the way Indian customers shop</h2>
                <p className="ecomIntro">
                  Indian customers have different payment and delivery
                  preferences. Your store should support these needs from the
                  beginning. We configure your Shopify store with the right
                  payment, checkout, tax, and shipping features.
                </p>
              </div>
              <EcomPhoto
                src={shopPay}
                alt="A courier with a card machine and a parcel while a customer waits"
              />
            </div>
            <ol>
              {indiaSetup.map((item, index) => (
                <li key={item.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="ecomServices">
          <div className="container">
            <div className="ecomServicesHead">
              <h2>Our Shopify website development and design services</h2>
              <p className="ecomIntro">
                Whether you are starting a new online store or improving an
                existing one, our Shopify website development services cover the
                complete process.
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

        <section className="container ecomStages">
          <h2>Meet the team behind your Shopify store</h2>
          <p className="ecomIntro">
            A successful Shopify project needs more than someone who can design
            a website or write code. You need a team that understands the
            complete shopping experience.
          </p>
          <p className="ecomIntro">
            At GrowBrandz, different specialists work together to take your
            store from idea to launch.
          </p>
          <div className="ecomStageGrid">
            {team.map((item, index) => (
              <article key={item.title}>
                <span>{teamIcons[index]}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ceoSection">
          <div className="container row">
            <div className="imageSide">
              <img
                className="homeceoFloat1"
                src="https://ik.imagekit.io/growbrandz/homeabout1.png"
                alt="Creative elements representing Shopify store building"
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
            alt="Shopify store design visual element"
          />
          <img
            className="homeceoExtra2"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo2.png"
            alt="Product pages planned for a Shopify store"
          />
          <img
            className="homeceoExtra3"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo3.png"
            alt="Design process behind a Shopify website"
          />
          <img
            className="homeceoExtra4"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo4.png"
            alt="Checkout planning for an Indian Shopify store"
          />
          <img
            className="homeceoExtra5"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo5.png"
            alt="Team working on a Shopify store launch"
          />
        </section>

        <section className="container ecomDays">
          <h2>Moving your existing store to Shopify? We make the transition easier</h2>
          <p className="ecomIntro">
            Changing your ecommerce platform can feel risky, especially when you
            already have customers and search traffic. We plan the migration
            carefully to minimise disruption.
          </p>
          <ol className="ecomDayTrack">
            {migration.map((item, index) => (
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

        <section className="ecomFestive">
          <div className="container">
            <h2>What happens after your Shopify store launches?</h2>
            <p className="ecomIntro">
              Launching your store is only the beginning. We also help you
              monitor its performance during the first 30 days.
            </p>
            <div className="ecomFestiveBoard">
              <EcomPhoto
                src={shopReview}
                alt="A team reviewing work together on a screen"
              />
              <ol className="ecomFestiveSteps">
                {afterLaunch.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="ecomMarket">
          <div className="container ecomMarketInner">
            <div>
              <h2>Connect your Shopify store with the tools you already use</h2>
              <p>
                Your online store should work smoothly with the tools that
                support your business operations. We integrate suitable Shopify
                apps and platforms for payments, shipping, customer reviews,
                email marketing, and more.
              </p>
              <button type="button" className="button1" onClick={openForm}>
                Book a call
              </button>
            </div>
            <div className="ecomMarketCollage ecomPayCollage quad">
              {tools.map((tool) => (
                <span key={tool.name} className={tool.dark ? "logoDark" : undefined}>
                  <img src={tool.src} alt={`${tool.name} logo`} />
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="container ecomStories" id="growth-stories">
          <h2>Explore our growth stories</h2>
          <StoryShowcase />
        </section>

        <Divider
          bgColor="#EC4899"
          fillColor="#FFD703"
          boxStroke="#000000"
          gridStroke="#000000"
        />

        <section className="homeFAQ">
          <h2>Frequently asked questions about Shopify website development</h2>
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

export default ShopifyDevelopment;
