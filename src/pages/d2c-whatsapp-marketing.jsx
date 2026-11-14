import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Divider from "../components/divider";
import LottieLoop from "../components/lottiecomp";
import ContactFormModal from "../components/contactFormModal";
import { PageSeo } from "../components/PageSeo";
import { getHomeData } from "../services/api";
import { useSsrPageData } from "../hooks/useSsrPageData";
import Hero from "../assets/lotties/servicesHero.json";
import Arrow from "../assets/lotties/right-arrow.json";
import zamZamLogo from "../assets/brands/ZAM_ZAM.png";
import rioGrandeLogo from "../assets/brands/Rio grande.png";
import earsLogoImage from "../assets/brands/Ears Lovingly.png";
import dripLogo from "../assets/brands/Drip.png";
import veeVeeLogo from "../assets/brands/Vee Vee.png";
import {
  CategoryIcon,
  StoryShowcase,
} from "./d2c-performance-marketing.jsx";

const PAGE_PATH = "/d2c-whatsapp-marketing";

const brands = [
  { name: "Zam Zam", logo: zamZamLogo },
  { name: "Rio Grande", logo: rioGrandeLogo },
  { name: "Ears Lovingly", logo: earsLogoImage },
  { name: "Drip", logo: dripLogo },
  { name: "Vee Vee", logo: veeVeeLogo },
];

const reasons = [
  {
    title: "We write messages your customers want to read",
    text: "Each message is written in your brand's voice and asks for one clear action, such as finishing a purchase or reordering a favourite product. We keep the words simple, so customers understand your message at a glance.",
  },
  {
    title: "We send the right message at the right time",
    text: "We group your customers by what they have bought and how often they shop with you. A first-time buyer and a loyal customer then get different messages, each sent when it is most likely to be useful.",
  },
  {
    title: "We keep your WhatsApp account safe",
    text: "WhatsApp can limit accounts that send messages people do not want. We message only customers who have agreed to hear from you and keep the volume sensible, so your account stays in good standing.",
  },
];

const examples = [
  {
    title: "Cart reminder",
    chat: "Hi Priya, your Vitamin C Face Serum is still waiting in your cart. Complete your order whenever you're ready: https://glowcare.in/products/vitamin-c-face-serum",
    result: "Brings back shoppers who got distracted before paying.",
    text: "Your Vitamin C Face Serum is still waiting in your cart. Complete your order whenever you're ready.",
    product: "Vitamin C Face Serum",
    detail: "Still waiting in your cart",
    action: "Go to Checkout",
    note: "Your cart is waiting.",
    time: "10:24 AM",
    link: "glowcare.in/products/vitamin-c-face-serum",
  },
  {
    title: "Order update",
    chat: "Hi Priya, your order #GC10245 has been shipped. Your GlowCare Vitamin C Face Serum should reach you by November 8. Track it here: https://glowcare.in/track/GC10245",
    result: "Keeps customers informed after they buy.",
    text: "Your order #GC10245 has been shipped. Your GlowCare Vitamin C Face Serum should reach you by November 8.",
    product: "Vitamin C Face Serum",
    detail: "Order #GC10245",
    action: "Track order",
    note: "Should reach you by November 8.",
    time: "4:12 PM",
    link: "glowcare.in/track/GC10245",
  },
  {
    title: "Reorder reminder",
    chat: "Hi Priya, it's been a month since you ordered your GlowCare Vitamin C Face Serum. Running low? Get your next bottle here: https://glowcare.in/products/vitamin-c-face-serum",
    result: "Reminds customers when it is time to buy again.",
    text: "It's been a month since you ordered your GlowCare Vitamin C Face Serum. Running low?",
    product: "Vitamin C Face Serum",
    detail: "Time for the next bottle",
    action: "Order again",
    note: "Running low?",
    time: "11:05 AM",
    link: "glowcare.in/products/vitamin-c-face-serum",
  },
];

const services = [
  {
    title: "WhatsApp Business API setup",
    text: "Get an official WhatsApp account that can message many customers at once, instead of one chat at a time.",
    points: [
      "Business verification and account setup",
      "Phone number and display name registration",
      "Connecting your store to your messaging tool",
      "Message template submission for approval",
    ],
  },
  {
    title: "Abandoned cart recovery",
    text: "Remind shoppers who added products to their cart but left before paying.",
    points: [
      "Reminder messages with the product and a checkout link",
      "A short series of messages sent at planned gaps",
      "Optional offers for shoppers who need a small push",
      "Tracking of the orders you win back",
    ],
  },
  {
    title: "Order updates and follow-ups",
    text: "Set up WhatsApp automation that keeps customers informed after they buy and asks for feedback once the parcel arrives.",
    points: [
      "Order confirmation and shipping messages",
      "Delivery updates with tracking links",
      "Review and feedback requests",
      "Usage tips for your product",
    ],
  },
  {
    title: "Offers and launch broadcasts",
    text: "Plan WhatsApp broadcast campaigns that send one message to the right group of customers about a sale, a launch, or a restock.",
    points: [
      "Customer groups based on past orders",
      "Message copy and images ready to send",
      "A monthly calendar around your launches and festivals",
      "A results report for every campaign",
    ],
  },
  {
    title: "Product catalog campaigns",
    text: "Let customers browse your products inside the chat and go straight to your store.",
    points: [
      "Catalog setup with your products and prices",
      "Collection messages for new arrivals and best sellers",
      "Product suggestions based on past orders",
      "Links that take customers to checkout",
    ],
  },
  {
    title: "Loyalty and repeat orders",
    text: "Give customers a reason to buy from you again.",
    points: [
      "Reorder reminders timed to how fast your product gets used",
      "Early access to new products for loyal customers",
      "Rewards and offers for repeat buyers",
      "Win-back messages for customers who stopped ordering",
    ],
  },
  {
    title: "Growing your WhatsApp list",
    text: "Build a bigger audience for your messages over time, so every campaign reaches more people.",
    points: [
      "A sign-up box at checkout",
      "A website pop-up and a WhatsApp chat button",
      "QR codes on packaging and inserts",
      "Click-to-WhatsApp buttons on your ads and social pages",
    ],
  },
  {
    title: "Chatbots for customer questions",
    text: "Answer common questions at any hour and pass tricky ones to your team.",
    points: [
      "Replies about order status, delivery and returns",
      "Answers to product and size questions",
      "A smooth handover to a team member",
      "A list of the questions customers ask most",
    ],
  },
];

const steps = [
  {
    title: "Check your store, list, and current setup",
    text: "We look at your store, your customer list and any WhatsApp number you already use. Then we decide which messages will help you first.",
  },
  {
    title: "Get your WhatsApp account approved",
    text: "We register your business, set up the official account and submit the first message templates. Approval is handled by WhatsApp, so we start this step early.",
  },
  {
    title: "Collect permission the right way",
    text: "We add clear sign-up points to your store and keep a record of each customer's consent. This keeps your list clean from day one.",
  },
  {
    title: "Write messages Meta approves, buyers read",
    text: "We write each message in simple words, add your product details and links, and get it approved before it goes live.",
  },
  {
    title: "Launch, measure and keep improving",
    text: "We start with a small group of customers and check which messages bring replies and orders. Then we improve the wording, timing, and offers every month.",
  },
];

const categories = [
  {
    title: "FMCG & Consumer Brands",
    text: "Growing direct sales through video marketing, product offers, and customer retention.",
    icon: "bag",
  },
  {
    title: "Food & Beverage",
    text: "Driving repeat orders through social media, subscriptions, and seasonal offers.",
    icon: "cup",
  },
  {
    title: "Health & Wellness",
    text: "Building trust while driving customer acquisition and repeat purchases.",
    icon: "heart",
  },
  {
    title: "Fashion & Apparel",
    text: "Creative-led campaigns that sell new collections and trends.",
    icon: "hanger",
  },
  {
    title: "Lifestyle & Consumer Products",
    text: "Turning product discovery into purchases through compelling creatives and targeted campaigns.",
    icon: "spark",
  },
];

const faqs = [
  {
    question: "What does a D2C WhatsApp marketing agency do?",
    answer:
      "It sets up your WhatsApp Business account, writes your messages, and runs your campaigns. The messages cover things like cart reminders, order updates, and offers.",
  },
  {
    question: "Do I need the WhatsApp Business API?",
    answer:
      "Yes, if you want to message many customers, send automatic messages, or connect your store. The free WhatsApp Business app works for small chats, but it has limits on how many people you can reach.",
  },
  {
    question: "Can I message customers who did not opt in?",
    answer:
      "No. WhatsApp's rules say customers must agree before you send them marketing messages. We help you collect that agreement the right way.",
  },
  {
    question: "Will it work with my Shopify or WooCommerce store?",
    answer:
      "Yes, in most cases, because we connect your store to the messaging tool so cart, order and delivery messages go out on their own. Tell us which platform you use and we will confirm the setup on our first call.",
  },
  {
    question: "How soon will I see orders from WhatsApp?",
    answer:
      "Cart reminders and order updates can start working as soon as your account and message templates are approved. Campaign results build up over the first few weeks as we learn what your customers respond to.",
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

const slideTones = ["purple", "yellow", "pink"];

function ServiceSlides({ services, onBook }) {
  const deckRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeline = null;
    let gsap = null;
    let cancelled = false;

    let runId = 0;

    const init = async () => {
      const id = ++runId;
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      if (cancelled || id !== runId) return;

      gsap = gsapModule.gsap || gsapModule.default;
      const ScrollTrigger =
        scrollTriggerModule.ScrollTrigger ||
        scrollTriggerModule.default?.ScrollTrigger;
      if (!gsap || !ScrollTrigger) return;

      gsap.registerPlugin(ScrollTrigger);

      const container = deckRef.current;
      const cards = container ? [...container.querySelectorAll(".waSlide")] : [];
      if (!container || cards.length === 0) return;

      try {
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
      } catch (error) {
        console.error(error);
      }

      const mobile = window.innerWidth <= 766;
      const lip = mobile ? 48 : Math.round(window.innerHeight * 0.045);
      const peek = mobile ? 12 : 0;

      if (mobile) {
        cards.forEach((card) => {
          card.style.height = "auto";
        });
        const tallest = Math.max(...cards.map((card) => card.offsetHeight));
        cards.forEach((card) => {
          card.style.height = `${tallest}px`;
        });
        container.style.height = `${tallest + peek}px`;
      } else {
        cards.forEach((card) => {
          card.style.height = "";
        });
        container.style.height = "";
      }

      cards.forEach((card, index) => {
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 100,
          y: index <= 1 ? 0 : (index - 1) * lip,
          zIndex: cards.length + index,
        });
      });

      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: () => {
            if (window.innerWidth > 766) return "center center";
            const header = document.querySelector("header");
            const headerSpace = header ? Math.ceil(header.getBoundingClientRect().height) + 12 : 88;
            const deckHeight = container.offsetHeight;
            const centered = Math.round((window.innerHeight - deckHeight) / 2);
            return `top ${Math.max(headerSpace, centered)}px`;
          },
          end: () => `+=${(cards.length - 1) * window.innerHeight * (mobile ? 0.72 : 1)}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;
        const at = index - 1;
        timeline.to(
          card,
          { yPercent: 0, y: 0, duration: 1, ease: "power2.inOut" },
          at
        );
        for (let later = index + 1; later < cards.length; later += 1) {
          timeline.to(
            cards[later],
            { y: (later - index - 1) * lip, duration: 1, ease: "power2.inOut" },
            at
          );
        }
      });

      timeline.to({}, { duration: 0.5 });
    };

    init();

    let resizeTimer = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      try {
        timeline?.scrollTrigger?.kill();
        timeline?.kill();
        if (gsap && deckRef.current) {
          gsap.killTweensOf(deckRef.current.querySelectorAll(".waSlide"));
        }
      } catch (error) {
        console.error(error);
      }
    };
  }, [services]);

  return (
    <div className="waSlides" aria-label="WhatsApp services">
      <div className="waDeck" ref={deckRef}>
        {services.map((service, index) => (
          <article
            key={service.title}
            className={`waSlide tone-${slideTones[index % slideTones.length]}`}
          >
            <p className="waSlideIndex">0{index + 1}</p>
            <div className="waSlideCopy">
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <button
                type="button"
                className={
                  slideTones[index % slideTones.length] === "yellow"
                    ? "button2"
                    : "button1"
                }
                onClick={onBook}
              >
                Book a call
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function SerumArt() {
  return (
    <svg className="waSerum" viewBox="0 0 72 72" aria-hidden="true">
      <rect width="72" height="72" rx="10" fill="#f4e4cf" />
      <circle cx="16" cy="54" r="11" fill="#f0a35a" />
      <circle cx="16" cy="54" r="6" fill="#f7c98a" />
      <path d="M48 8h6v7h-6z" fill="#243028" />
      <rect x="49.5" y="14" width="3" height="6" fill="#243028" />
      <rect x="44" y="20" width="14" height="38" rx="6" fill="#8d4e22" />
      <rect x="46" y="34" width="10" height="16" rx="2" fill="#fbf7f0" />
      <path d="M48 39h6M48.5 43h5" stroke="#1b7a46" strokeWidth="1.2" />
      <path d="M54 28c6 2 10 8 8 16" fill="none" stroke="#7dae6a" strokeWidth="1.4" />
    </svg>
  );
}

function CustomerChat({ item }) {
  return (
    <div className="waPhone" role="img" aria-label={item.chat}>
      <div className="waPhoneScreen" aria-hidden="true">
        <div className="waTop">
          <svg className="waBack" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 5 8 12l7 7"
            />
          </svg>
          <span className="waAvatar">
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 3c2 3 2 5 0 8 3-1 6 1 6 5a6 6 0 1 1-12 0c0-4 3-6 6-5-2-3-2-5 0-8z"
              />
            </svg>
          </span>
          <span className="waWho">
            <strong>
              GlowCare
              <svg viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8" fill="#25d366" />
                <path
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  d="M4.5 8.2 7 10.5 11.5 5.5"
                />
              </svg>
            </strong>
            <small>Online</small>
          </span>
          <span className="waTopActions">
            <svg viewBox="0 0 24 24">
              <rect x="3" y="7" width="12" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
              <path fill="currentColor" d="M16 10.5 21 8v8l-5-2.5z" />
            </svg>
            <svg viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7 4h3l1.2 3-2 1.2a12 12 0 0 0 6.6 6.6L17 12.8 20 14v3a2 2 0 0 1-2.2 2A16 16 0 0 1 5 6.2 2 2 0 0 1 7 4z"
              />
            </svg>
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="5" r="1.6" fill="currentColor" />
              <circle cx="12" cy="12" r="1.6" fill="currentColor" />
              <circle cx="12" cy="19" r="1.6" fill="currentColor" />
            </svg>
          </span>
        </div>
        <div className="waChat">
          <span className="waToday">Today</span>
          <div className="waMsg">
            <p className="waHi">Hi Priya 👋</p>
            <p>{item.text}</p>
            <div className="waProduct">
              <SerumArt />
              <div>
                <p className="waProductName">{item.product}</p>
                <p className="waProductDetail">{item.detail}</p>
              </div>
            </div>
            <span className="waGo">
              {item.action}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 6l6 6-6 6"
                />
              </svg>
            </span>
            <p className="waNote">{item.note}</p>
            <p className="waLink">{item.link}</p>
            <p className="waTime">{item.time}</p>
          </div>
        </div>
        <div className="waComposer">
          <span className="waSmile">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="9" cy="10" r="1" fill="currentColor" />
              <circle cx="15" cy="10" r="1" fill="currentColor" />
              <path d="M8.5 14c.8 1.4 2 2 3.5 2s2.7-.6 3.5-2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <span className="waInput">Type a message</span>
          <svg viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              d="M8 12.5 14.5 6a3 3 0 0 1 4.2 4.2l-8.2 8.2a4.2 4.2 0 0 1-6-6l7.4-7.4"
            />
          </svg>
          <svg viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              d="M5 8h3l1.2-2h5.6L16 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
            />
            <circle cx="12" cy="13" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
          </svg>
          <span className="waMic">
            <svg viewBox="0 0 24 24">
              <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
              <path d="M7 11a5 5 0 0 0 10 0M12 16v4M9 20h6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

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

function D2cWhatsapp() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const homeData = useSsrPageData("/", getHomeData);
  const story = homeData?.our_story;

  return (
    <>
      <PageSeo
        title="D2C WhatsApp Marketing Agency | GrowBrandz"
        description="GrowBrandz is a WhatsApp marketing agency for Indian D2C brands. We set up your WhatsApp account, write your messages, and run campaigns."
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
            D2C WhatsApp Marketing Agency for{" "}
            <Highlight>First and Repeat Orders</Highlight>
          </h1>
          <p>
            GrowBrandz is a WhatsApp marketing agency in India for D2C brands.
            We set up your account, write your messages, and run your campaigns,
            so you can reach customers on the app they use every day.
          </p>
          <div className="d2cHeroActions">
            <button
              type="button"
              className="button1"
              onClick={() => setFormOpen(true)}
            >
              Book a call
            </button>
            <Link className="button2" to={{ hash: "#growth-stories" }}>
              Explore our work
            </Link>
          </div>
          <div className="d2cBrandMarquee">
            <div className="d2cBrandTrack">
              {[0, 1].map((copy) => (
                <ul className="d2cBrands" key={copy} aria-hidden={copy === 1}>
                  {brands.map((brand) => (
                    <li key={`${brand.name}-${copy}`}>
                      <img
                        src={brand.logo}
                        alt={copy === 0 ? `${brand.name} logo` : ""}
                      />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <LottieLoop
            animationData={Hero}
            className="commonHeroFloat servicesHeroFloat"
          />
        </section>

        <section className="container d2cReasons">
          <h2>
            Why D2C brands choose us for <span>WhatsApp</span> marketing
          </h2>
          <p className="d2cLead">
            WhatsApp marketing for D2C brands works best when each message
            feels personal and useful the moment it arrives. This is how we
            make sure yours do.
          </p>
          <div className="d2cReasonGrid">
            {reasons.map((item, index) => (
              <article key={item.title}>
                <p className="d2cIndex">0{index + 1}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
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

        <section className="container d2cReasons waPromo">
          <h2>What your customers will see on WhatsApp</h2>
          <div className="waPromoGrid">
            {examples.map((item, index) => (
              <article
                className={`waPromoCard tone-${slideTones[index % slideTones.length]}`}
                key={item.title}
              >
                <p className="waPromoIndex">0{index + 1}</p>
                <h3>{item.title}</h3>
                <p className="waPromoValue">{item.result}</p>
                <CustomerChat item={item} />
              </article>
            ))}
          </div>
          <p className="d2cLead">
            These three examples show the kind of messages we create. Each one
            has a clear purpose and speaks to the customer by name.
          </p>
          <div className="d2cCtaLine">
            <h3>Want to see these messages made for your D2C brand?</h3>
            <button
              type="button"
              className="button1"
              onClick={() => setFormOpen(true)}
            >
              Let's talk
            </button>
          </div>
        </section>

        <section className="container d2cServices">
          <h2>What we run on WhatsApp for D2C brands</h2>
          <p className="d2cLead">
            Our WhatsApp marketing services for D2C brands cover the full path,
            from setting up your account to sending campaigns and reading the
            results.
          </p>
          <ServiceSlides
            services={services}
            onBook={() => setFormOpen(true)}
          />
        </section>

        <Divider
          bgColor="#FFF2EC"
          fillColor="#6842EF"
          boxStroke="#FFFFFF"
          gridStroke="#000000"
        />

        <section className="container d2cSteps">
          <h2>How we set up WhatsApp for your D2C brand</h2>
          <p className="d2cLead">From permission to first sale in 5 steps.</p>
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
          <h2>Ready to find which WhatsApp messages would earn you orders?</h2>
          <p>
            Book a 30-minute call and share your store link. We will look at
            how you talk to customers today and suggest the first messages to
            set up.
          </p>
          <button
            type="button"
            className="button1"
            onClick={() => setFormOpen(true)}
          >
            Book a call
          </button>
        </section>

        <section className="container d2cCategories">
          <h2>How WhatsApp works for each D2C category</h2>
          <p className="d2cLead">
            The messages that work for a snack brand are not the ones that work
            for a clothing brand. Here is how we plan for yours.
          </p>
          <div className="d2cCategoryGrid">
            {categories.map((item) => (
              <article key={item.title}>
                <span className="d2cCategoryIcon">
                  <CategoryIcon name={item.icon} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="container d2cStories" id="growth-stories">
          <h2>Explore our D2C growth stories</h2>
          <p className="d2cLead">
            A closer look at the D2C brands we have helped grow.
          </p>
          <StoryShowcase />
        </section>

        <Divider
          bgColor="#FFD703"
          fillColor="#FFF2EC"
          boxStroke="#000000"
          gridStroke="#FFFFFF"
        />

        <section className="ceoSection">
          <div className="container row">
            <div className="imageSide">
              <img
                className="homeceoFloat1"
                src="https://ik.imagekit.io/growbrandz/homeabout1.png"
                alt="Creative elements representing D2C brand building"
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
              <button
                type="button"
                className="button2"
                onClick={() => setFormOpen(true)}
              >
                Let's talk
              </button>
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
            alt="Brand growth and WhatsApp marketing illustration"
          />
          <img
            className="homeceoExtra3"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo3.png"
            alt="Creative process behind WhatsApp marketing campaigns"
          />
          <img
            className="homeceoExtra4"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo4.png"
            alt="Design and strategy supporting online store growth"
          />
          <img
            className="homeceoExtra5"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo5.png"
            alt="Team collaboration for D2C WhatsApp marketing"
          />
        </section>

        <Divider
          bgColor="#EC4899"
          fillColor="#FFD703"
          boxStroke="#000000"
          gridStroke="#000000"
        />

        <section className="homeFAQ">
          <h2>WhatsApp questions D2C founders ask</h2>
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

export default D2cWhatsapp;
