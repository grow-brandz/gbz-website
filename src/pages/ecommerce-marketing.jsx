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
import ecomHero from "../assets/img/ecom-hero.png";
import ecomWhyTeam from "../assets/img/ecom-why-team.png";
import ecomFestive from "../assets/img/ecom-festive.jpg";
import amazonLogo from "../assets/img/amazon.png";
import flipkartLogo from "../assets/img/flipkart.png";
import meeshoLogo from "../assets/img/meesho.png";
import myntraLogo from "../assets/img/myntra.png";
import ajioLogo from "../assets/img/ajio.png";
import nykaaLogo from "../assets/img/nykaa.png";
import jiomartLogo from "../assets/img/jiomart.png";
import snapdealLogo from "../assets/img/snapdeal.png";
import ecomCall from "../assets/img/ecom-call.jpg";
import "./ecommerce-marketing.css";

function StageIcon({ index }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const icons = [
    <svg key="launch" {...common}><path d="M6 20V4" /><path d="M6 5h9l-2 3 2 3H6" /></svg>,
    <svg key="uneven" {...common}><path d="M3 14c2-3.5 4-3.5 6 0s4 3.5 6 0 4-3.5 6 0" /></svg>,
    <svg key="grow" {...common}><path d="M4 16l5-5 3 3 8-8" /><path d="M14 6h6v6" /></svg>,
    <svg key="markets" {...common}><path d="M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11z" /><circle cx="12" cy="10" r="2.2" /></svg>,
  ];
  return icons[index];
}

function BrandIcon({ index }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const icons = [
    <svg key="new" {...common}><path d="M12 21V11" /><path d="M12 15c-3-.8-5-3.4-5-6.2 3 .2 5.4 2 5 6.2z" /><path d="M12 14c3-.6 5.6-2.6 6-5.6-3 .6-5.2 2.4-6 5.6z" /></svg>,
    <svg key="national" {...common}><circle cx="6" cy="15" r="2" /><circle cx="12" cy="7" r="2" /><circle cx="18" cy="15" r="2" /><path d="M7.6 13.6L10.4 8.6" /><path d="M13.6 8.6l2.8 5" /></svg>,
    <svg key="direct" {...common}><path d="M3 8h8v8H3z" /><path d="M13 12h7" /><path d="M17 9l3 3-3 3" /></svg>,
    <svg key="market" {...common}><path d="M4 10h16" /><path d="M6 10l1.5-4h9L18 10" /><path d="M6 10v8h12v-8" /><path d="M10 18v-4h4v4" /></svg>,
  ];
  return icons[index];
}

function ServiceIcon({ index }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const icons = [
    <svg key="ads" {...common}><path d="M4 10h3l6-4v12l-6-4H4z" /><path d="M16 9.5a3.5 3.5 0 0 1 0 5" /></svg>,
    <svg key="search" {...common}><circle cx="11" cy="11" r="6" /><path d="M16 16l4 4" /></svg>,
    <svg key="messages" {...common}><path d="M5 6h14v9H8l-3 3V6z" /></svg>,
    <svg key="creators" {...common}><circle cx="12" cy="8" r="3" /><path d="M6 19c1.2-2.6 3.2-4 6-4s4.8 1.4 6 4" /></svg>,
    <svg key="photos" {...common}><path d="M4 8h3l1.5-2h7L17 8h3v10H4z" /><circle cx="12" cy="13" r="3" /></svg>,
    <svg key="social" {...common}><path d="M12 19s-6-3.6-6-8a3.4 3.4 0 0 1 6-2 3.4 3.4 0 0 1 6 2c0 4.4-6 8-6 8z" /></svg>,
    <svg key="store" {...common}><path d="M6 8h12l-1 11H7L6 8z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>,
  ];
  return <span className="ecomServiceIcon">{icons[index]}</span>;
}

const marketplaces = [
  { name: "Amazon", src: amazonLogo },
  { name: "Flipkart", src: flipkartLogo },
  { name: "Meesho", src: meeshoLogo },
  { name: "Myntra", src: myntraLogo },
  { name: "Ajio", src: ajioLogo },
  { name: "Nykaa", src: nykaaLogo },
  { name: "JioMart", src: jiomartLogo },
  { name: "Snapdeal", src: snapdealLogo },
];

function MarketCollage() {
  return (
    <div className="ecomMarketCollage">
      {marketplaces.map((item) => (
        <span key={item.name}>
          <img src={item.src} alt={`${item.name} logo`} />
        </span>
      ))}
    </div>
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

const PAGE_PATH = "/ecommerce-marketing-agency";

const reasons = [
  {
    title: "One team for every channel",
    text: "Ads, search, messages and creators usually sit with different vendors who never talk to each other. At GrowBrandz they sit with one team, so a change in one place is planned with the rest in mind.",
  },
  {
    title: "Your numbers on the table from day one",
    text: "You see your orders, what each order costs and where it came from, in plain words, from the first month. If something is not working, we say so before you have to ask.",
  },
  {
    title: "Your accounts and data stay yours",
    text: "Your ad accounts, store data and customer lists are set up in your name. If you ever decide to part ways, you keep everything and nothing is held back.",
  },
];

const stages = [
  {
    title: "Just launched",
    text: "You have a product and a store but very few orders. We would start with who your first buyers are, what to say to them, and whether your store is ready for visitors.",
  },
  {
    title: "Orders come in unevenly",
    text: "Some weeks are great and others are quiet. We would look for what causes the swings, such as one ad carrying everything, and build a steadier base.",
  },
  {
    title: "Growing steadily",
    text: "Things are working and you want more without wasting money. GrowBrandz would find which channels deserve a bigger share of your budget and which have stopped paying back.",
  },
  {
    title: "Ready for new markets",
    text: "You sell well in your home region and want to reach the rest of India. The new cities and their buyers get studied first, and then you enter them one step at a time.",
  },
];

const services = [
  {
    title: "Ads that find new buyers",
    text: "Paid campaigns on Meta and Google that reach people likely to buy, with each rupee tracked back to an order.",
    button: "Explore Meta ads",
  },
  {
    title: "Search traffic that keeps coming",
    text: "Product and category pages that show up when shoppers search on Google and in AI answers, so orders keep arriving even when ads are paused.",
    button: "Book a call",
  },
  {
    title: "Messages that bring buyers back",
    text: "WhatsApp and email messages for left carts, order updates and reorders, so a first purchase has a reason to become a second.",
    button: "Explore WhatsApp marketing",
    to: "/d2c-whatsapp-marketing",
  },
  {
    title: "Creators your customers trust",
    text: "Creator campaigns that put your product in front of people who already follow and trust the person recommending it.",
    button: "Find ideal influencers for your brand",
    to: "/d2c-influencer-marketing",
  },
  {
    title: "Photos and videos that sell",
    text: "Product photos, model shoots and short videos made for your product pages and your ads.",
    button: "Book a call",
  },
  {
    title: "Social media that builds trust",
    text: "A steady social presence that shows real people using your product, so new visitors feel safe buying.",
    button: "Explore social media marketing",
  },
  {
    title: "A store that is easy to buy from",
    text: "Faster pages, clearer product details and a simpler checkout, so the visitors you pay for actually place an order.",
    button: "Explore ecommerce website development",
    to: "/ecommerce-website-development",
  },
];

const days = [
  {
    range: "1–30",
    title: "Days 1 to 30: get the basics right",
    text: "We study your store, your buyers and your past results, and set up tracking so every order can be traced to where it came from. You receive a short plan that says what will happen first and why.",
  },
  {
    range: "31–60",
    title: "Days 31 to 60: test what sells",
    text: "The first campaigns go live as small tests. GrowBrandz tries different offers, messages and channels, then keeps what brings orders and drops what does not.",
  },
  {
    range: "61–90",
    title: "Days 61 to 90: grow what works",
    text: "Budget moves toward the channels that are paying back, and the next set of ideas goes into testing. By the end of month three you have a clear picture of what works for your store and a plan for the next quarter.",
  },
];

const seasons = [
  {
    title: "Before the sale: get ready early",
    text: "Planning starts weeks ahead and covers offers, stock levels, creatives, store speed and the messages you will send. This is also when your customer list is warmed up.",
  },
  {
    title: "During the sale: stay on top of it",
    text: "Budgets and ads are checked every day, so money moves quickly to what is selling and away from what is not.",
  },
  {
    title: "After the sale: keep the new buyers",
    text: "Festive shoppers are often one-time buyers. Follow-up messages and offers give them a reason to come back once the rush is over.",
  },
];

const reportParts = [
  {
    title: "Orders and revenue",
    text: "How many orders came in and how much they brought, compared with last month.",
  },
  {
    title: "Cost per order",
    text: "What you spent to win each order, split by channel.",
  },
  {
    title: "Repeat buyers",
    text: "How many customers came back to order again.",
  },
  {
    title: "Best channel this month",
    text: "Which channel brought the most orders for the money, and which one fell behind.",
  },
  {
    title: "What we changed",
    text: "The tests that were run, what was stopped and the reason why.",
  },
  {
    title: "What happens next",
    text: "The plan for the coming month, so there are no surprises.",
  },
];

const brands = [
  {
    title: "New D2C brands",
    text: "You are building your first online sales and want a plan that is not guesswork.",
  },
  {
    title: "Regional brands going national",
    text: "You are well known in your region and want buyers in new cities.",
  },
  {
    title: "Product companies going direct",
    text: "You already sell through shops or distributors and want your own direct channel, without upsetting the partners you have.",
  },
  {
    title: "Stores selling on marketplaces too",
    text: "You sell on marketplaces and want your own store to bring in customers that you keep.",
  },
];

const checks = [
  {
    title: "Who will run my account?",
    text: "A named person who works on your account every week and whom you can message directly. You are not handed to a junior after the sales call.",
  },
  {
    title: "Will I own my ad accounts and data?",
    text: "Yes. Your ad accounts, tracking and customer lists sit in your name, so you can leave at any time with everything.",
  },
  {
    title: "What will you report each month?",
    text: "Orders, cost per order, repeat buyers and what was changed. Clicks and likes only appear when they help explain an order.",
  },
  {
    title: "How long is the contract?",
    text: "Our terms are solid and defined, so you never feel stuck if the work is not right for you.",
  },
  {
    title: "Have you worked with brands like mine?",
    text: "Ask to see stories from brands of your size and category, with real numbers. The growth stories below are a good place to start.",
  },
  {
    title: "What will you not do for me?",
    text: "We will not promise a fixed number of orders, spend your budget without your approval, or hide a bad month from you.",
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
    question: "How much does an ecommerce marketing company charge in India?",
    answer:
      "Most stores pay for two things: the money spent on ads and the agency's own fee. The fee depends on how many channels you need and how much work each one takes, so a store that needs only ads pays less than one that needs the full plan. GrowBrandz puts the fee in writing after a short call, with nothing hidden.",
  },
  {
    question: "Ecommerce marketing firm, freelancer or in-house team?",
    answer:
      "A freelancer works well for one task, such as running ads. An in-house team gives you full control but takes time and salary to build. An ecommerce marketing firm like GrowBrandz makes sense when you need several skills working together without hiring for each one.",
  },
  {
    question: "Can you help if I sell on marketplaces too?",
    answer:
      "GrowBrandz focuses on growing your own store, because that is where you keep the customer and the data. If you also sell on marketplaces, we can plan your store marketing around that, and we will say which parts we can handle.",
  },
  {
    question: "What do you need from me to start?",
    answer:
      "Access to your store, your ad accounts and any past reports, plus an hour of your time to explain your product and your buyers. If you do not have ad accounts yet, we can help you set them up in your name.",
  },
  {
    question: "Do I have to sign a long contract?",
    answer:
      "No. GrowBrandz is flexible, so you can step away if it is not working for you.",
  },
  {
    question: "How soon will I see more orders?",
    answer:
      "Early changes, such as better tracking or a faster store, can show up within weeks. New campaigns usually need one to two months of testing before the results are clear.",
  },
  {
    question: "How is ecommerce marketing different from digital marketing?",
    answer:
      "Digital marketing covers any promotion online, including for services and offline shops. Ecommerce marketing has one goal, which is getting people to buy products from an online store, so every activity is judged by the orders it brings.",
  },
  {
    question: "Is ecommerce marketing worth it for a small store?",
    answer:
      "It can be, if your product sells and your store is ready for visitors.",
  },
  {
    question: "Which channels work best for an Indian online store?",
    answer:
      "Paid ads on Meta and Google bring new buyers quickly, search brings steady orders over time, and WhatsApp and email bring buyers back. The mix is chosen after studying your product and customers.",
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

function EcomAction({ label, to, tone = "button1", onBook }) {
  if (to) {
    return (
      <Link className={tone} to={to}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" className={tone} onClick={onBook}>
      {label}
    </button>
  );
}

function EcommerceMarketing() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const homeData = useSsrPageData("/", getHomeData);
  const story = homeData?.our_story;
  const openForm = () => setFormOpen(true);

  return (
    <>
      <PageSeo
        title="Ecommerce Marketing Agency in India | GrowBrandz"
        description="GrowBrandz is an ecommerce marketing agency in India. One team plans your ads, search, messages and content so you can see what brings orders."
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
              Ecommerce Marketing Agency in India with{" "}
              <Highlight>One Plan for Every Channel</Highlight>
            </h1>
            <p>
              Selling online means juggling ads, search, messages and content,
              often with a different vendor for each. GrowBrandz is an
              ecommerce marketing agency in India that brings them into one
              plan, so you always know what is working.
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
            src={ecomHero}
            alt="A laptop and phone showing a store, ads, search and messages together"
          />
        </section>

        <section className="ecomWhy">
          <div className="container">
            <div className="ecomSplit">
              <div>
                <h2>Why brands choose us as their ecommerce marketing company</h2>
                <p className="ecomIntro">
                  Many agencies sound alike on a first call. Here are three things
                  you can actually check with us.
                </p>
              </div>
              <EcomPhoto
                src={ecomWhyTeam}
                alt="A team working together around a laptop"
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
          </div>
        </section>

        <section className="container ecomStages">
          <h2>Start where your store is today</h2>
          <p className="ecomIntro">
            Pick the line that sounds most like you and see what we would look
            at first.
          </p>
          <div className="ecomStageGrid">
            {stages.map((item, index) => (
              <article key={item.title}>
                <span>
                  <StageIcon index={index} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="ecomServices">
          <div className="container">
            <div className="ecomServicesHead">
              <h2>Our ecommerce marketing services</h2>
              <p className="ecomIntro">
                Every store needs a different mix. We pick the ones that fit your
                stage and budget, and leave the rest for later.
              </p>
            </div>
            <div className="ecomServiceGrid">
              {services.map((service, index) => (
                <article key={service.title}>
                  <ServiceIcon index={index} />
                  <div>
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                  <EcomAction
                    label={service.button}
                    to={service.to}
                    tone={index % 2 === 0 ? "button1" : "button2"}
                    onBook={openForm}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="ecomMarket">
          <div className="container ecomMarketInner">
            <div>
              <h2>
                Do you also sell on marketplaces? Tell us, and we will plan your
                store marketing around that.
              </h2>
              <button type="button" className="button1" onClick={openForm}>
                Book a call
              </button>
            </div>
            <MarketCollage />
          </div>
        </section>

        <section className="container ecomDays">
          <h2>Your first 90 days with GrowBrandz</h2>
          <p className="ecomIntro">
            Here is what to expect after you say yes, month by month.
          </p>
          <ol className="ecomDayTrack">
            {days.map((item, index) => (
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
            <h2>How we plan for festive and sale seasons</h2>
            <p className="ecomIntro">
              Diwali, wedding season and big sale days can bring a large share
              of a year's orders for many Indian stores. Ad costs often rise at
              the same time, so early planning makes a real difference.
            </p>
            <div className="ecomFestiveBoard">
              <EcomPhoto
                src={ecomFestive}
                alt="A sale tag being cut from jewellery"
              />
              <ol className="ecomFestiveSteps">
                {seasons.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="container ecomReport">
          <h2>What your monthly report looks like</h2>
          <p className="ecomIntro">
            You get one clear report each month, built around six parts. This
            is the layout, with your own numbers filled in.
          </p>
          <div className="ecomDash">
            {reportParts.map((item, index) => (
              <article
                key={item.title}
                className={`ecomDashNote note${index + 1}`}
              >
                <span>{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
            <article className="ecomDashBoard">
              <div className="ecomDashPlate" aria-hidden="true" />
              <div className="ecomDashCard" aria-hidden="true">
                <div className="ecomDashHead">
                  <div className="ecomDashBrand">
                    <svg viewBox="0 0 32 32" aria-hidden="true">
                      <rect width="32" height="32" rx="10" fill="#6842EF" />
                      <path
                        d="M16 7c2 4 6 6 6 11a6 6 0 1 1-12 0c0-5 4-7 6-11z"
                        fill="#fff"
                      />
                    </svg>
                    <div>
                      <b>GrowBrandz</b>
                      <strong>Monthly Performance Report</strong>
                      <small>September 2025</small>
                    </div>
                  </div>
                  <div className="ecomDashTools">
                    <span className="ecomDashDownload">
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path
                          d="M8 2v8M5 7l3 3 3-3M3 13h10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                      Download Report
                    </span>
                    <span className="ecomDashWhen">
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <rect
                          x="2"
                          y="3"
                          width="12"
                          height="11"
                          rx="2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M2 6.5h12M5 2v2M11 2v2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                      vs. August 2025
                    </span>
                  </div>
                </div>

                <div className="ecomDashGrid">
                  <section className="ecomWidget ecomWidgetOrders">
                    <div className="ecomMetricPair">
                      <div>
                        <i className="ecomBubble">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path
                              d="M6 7h12l-1 9H7L6 7zM9 7V6a3 3 0 0 1 6 0v1"
                              fill="none"
                              stroke="#6842EF"
                              strokeWidth="1.6"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </i>
                        <strong>8,450</strong>
                        <em>Orders</em>
                        <b className="up">+12%</b>
                      </div>
                      <div>
                        <i className="ecomBubble">
                          <svg viewBox="0 0 24 24" aria-hidden="true">
                            <circle
                              cx="12"
                              cy="12"
                              r="7"
                              fill="none"
                              stroke="#6842EF"
                              strokeWidth="1.6"
                            />
                            <path
                              d="M12 8v8M9.5 10.5c.6-.8 1.4-1.2 2.5-1.2 1.4 0 2.3.7 2.3 1.8S13.4 13 12 13s-2.3.6-2.3 1.7.9 1.8 2.3 1.8c1.1 0 1.9-.4 2.5-1.1"
                              fill="none"
                              stroke="#6842EF"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                            />
                          </svg>
                        </i>
                        <strong>$248,920</strong>
                        <em>Revenue</em>
                        <b className="up">+15%</b>
                      </div>
                    </div>
                    <svg
                      className="ecomDashLine"
                      viewBox="0 0 320 72"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 50 C40 48 55 36 90 40 C130 45 150 22 190 28 C230 34 260 46 320 18"
                        fill="none"
                        stroke="#d9d3ea"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0 58 C35 52 60 40 95 44 C140 49 155 30 195 36 C235 42 265 24 320 12 V72 H0 Z"
                        fill="#efeaff"
                      />
                      <path
                        d="M0 58 C35 52 60 40 95 44 C140 49 155 30 195 36 C235 42 265 24 320 12"
                        fill="none"
                        stroke="#6842EF"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p className="ecomLegend">
                      <span>
                        <i className="now" /> This month
                      </span>
                      <span>
                        <i className="then" /> Last month
                      </span>
                    </p>
                  </section>

                  <section className="ecomWidget ecomWidgetCost">
                    <div className="ecomWidgetHead">
                      <i className="ecomBubble">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <circle
                            cx="12"
                            cy="12"
                            r="7"
                            fill="none"
                            stroke="#6842EF"
                            strokeWidth="1.6"
                          />
                          <path
                            d="M12 8v8M9.5 10.5c.6-.8 1.4-1.2 2.5-1.2 1.4 0 2.3.7 2.3 1.8S13.4 13 12 13s-2.3.6-2.3 1.7.9 1.8 2.3 1.8c1.1 0 1.9-.4 2.5-1.1"
                            fill="none"
                            stroke="#6842EF"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                      </i>
                      Cost per order
                    </div>
                    <div className="ecomCostBody">
                      <div>
                        <strong>$12.50</strong>
                        <b className="down">-8%</b>
                        <small>vs. $13.60 last month</small>
                      </div>
                      <svg viewBox="0 0 72 72" aria-hidden="true">
                        <circle
                          cx="36"
                          cy="36"
                          r="26"
                          fill="none"
                          stroke="#e7e3f2"
                          strokeWidth="10"
                        />
                        <circle
                          cx="36"
                          cy="36"
                          r="26"
                          fill="none"
                          stroke="#6d5efc"
                          strokeWidth="10"
                          strokeDasharray="66 163"
                          strokeLinecap="butt"
                          transform="rotate(-90 36 36)"
                        />
                        <circle
                          cx="36"
                          cy="36"
                          r="26"
                          fill="none"
                          stroke="#f5a524"
                          strokeWidth="10"
                          strokeDasharray="55 163"
                          strokeDashoffset="-66"
                          transform="rotate(-90 36 36)"
                        />
                        <circle
                          cx="36"
                          cy="36"
                          r="26"
                          fill="none"
                          stroke="#c9c4d8"
                          strokeWidth="10"
                          strokeDasharray="42 163"
                          strokeDashoffset="-121"
                          transform="rotate(-90 36 36)"
                        />
                      </svg>
                      <ul>
                        <li>
                          <i className="meta" /> Meta Ads <b>$5.10</b>
                        </li>
                        <li>
                          <i className="google" /> Google Ads <b>$4.20</b>
                        </li>
                        <li>
                          <i className="other" /> Other <b>$3.20</b>
                        </li>
                      </ul>
                    </div>
                  </section>

                  <section className="ecomWidget ecomWidgetRepeat">
                    <div className="ecomWidgetHead">
                      <i className="ecomBubble">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <circle cx="9" cy="9" r="2.2" fill="#6842EF" />
                          <circle cx="15" cy="9" r="2.2" fill="#6842EF" />
                          <path
                            d="M5 17c.6-2 2.2-3 4-3s3.4 1 4 3M12 17c.5-1.6 1.7-2.5 3.2-2.5 1.4 0 2.6.8 3.1 2.5"
                            fill="none"
                            stroke="#6842EF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </i>
                      Repeat buyers
                    </div>
                    <div className="ecomRepeatBody">
                      <div>
                        <strong>28%</strong>
                        <em>of total orders</em>
                        <b className="up">+3%</b>
                      </div>
                      <svg viewBox="0 0 92 48" aria-hidden="true">
                        <circle cx="28" cy="16" r="8" fill="#d9d0ff" />
                        <circle cx="46" cy="14" r="9" fill="#b7a6ff" />
                        <circle cx="64" cy="16" r="8" fill="#d9d0ff" />
                        <path
                          d="M12 46c2-10 8-14 16-14s14 4 16 14"
                          fill="#d9d0ff"
                        />
                        <path
                          d="M30 46c2-12 8-16 16-16s14 4 16 16"
                          fill="#b7a6ff"
                        />
                        <path
                          d="M48 46c2-10 8-14 16-14s14 4 16 14"
                          fill="#d9d0ff"
                        />
                      </svg>
                    </div>
                  </section>

                  <section className="ecomWidget ecomWidgetChannels">
                    <div className="ecomWidgetHead">
                      <i className="ecomBubble">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M12 4l1.6 4.2L18 10l-4.4 1.8L12 16l-1.6-4.2L6 10l4.4-1.8L12 4z"
                            fill="#6842EF"
                          />
                        </svg>
                      </i>
                      Channel performance
                    </div>
                    <div className="ecomChannelPair">
                      <div>
                        <b>Meta Ads</b>
                        <strong>42%</strong>
                        <em>3,550 orders</em>
                        <span className="good">Top performer</span>
                      </div>
                      <div>
                        <b>Google Ads</b>
                        <strong>34%</strong>
                        <em>2,870 orders</em>
                        <span className="bad">-5% Needs attention</span>
                      </div>
                    </div>
                  </section>

                  <section className="ecomWidget ecomWidgetChanged">
                    <div className="ecomWidgetHead">
                      <i className="ecomBubble">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M9 4h6M10 4v5L6 16a3 3 0 0 0 2.4 4.8h7.2A3 3 0 0 0 18 16l-4-7V4"
                            fill="none"
                            stroke="#6842EF"
                            strokeWidth="1.6"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </i>
                      What we changed
                    </div>
                    <ul>
                      <li>
                        <span>A/B test: New product page design</span>
                        <em className="run">Running</em>
                      </li>
                      <li>
                        <span>Stopped: Holiday offer banner</span>
                        <em className="stop">Stopped</em>
                      </li>
                      <li>
                        <span>Reason: Low impact on conversions</span>
                      </li>
                    </ul>
                  </section>

                  <section className="ecomWidget ecomWidgetNext">
                    <div className="ecomWidgetHead">
                      <i className="ecomBubble">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M12 19c-4-3-6-5.4-6-8a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 2.6-2 5-6 8h-2z"
                            fill="none"
                            stroke="#6842EF"
                            strokeWidth="1.6"
                          />
                        </svg>
                      </i>
                      What&apos;s next
                    </div>
                    <div className="ecomNextBody">
                      <ul>
                        <li>Scale winning Meta Ads campaign</li>
                        <li>Improve product page for mobile</li>
                        <li>Test new email flow for repeat buyers</li>
                      </ul>
                      <svg viewBox="0 0 64 64" aria-hidden="true">
                        <path
                          d="M18 46c8-2 14-10 16-20 6 2 12 8 14 16-8 2-16 1-22 0-2 6-6 8-8 4z"
                          fill="#d9d0ff"
                        />
                        <path
                          d="M32 8l6 14h8L36 32l4 16-8-8-8 8 4-16-10-10h8l6-14z"
                          fill="#6842EF"
                        />
                      </svg>
                    </div>
                  </section>
                </div>
              </div>
              <button
                type="button"
                className="ecomDashCta button1"
                onClick={openForm}
              >
                Book a call
              </button>
            </article>
          </div>
        </section>

        <section className="ecomBrands">
          <div className="container">
            <h2>Brands we work best with</h2>
            <p className="ecomIntro">
              GrowBrandz suits you if you sell your own products directly to
              customers. These are the brands we meet most often.
            </p>
            <div className="ecomBrandGrid">
            {brands.map((item, index) => (
              <article key={item.title}>
                <div>
                  <span className="ecomBrandIcon">
                    <BrandIcon index={index} />
                  </span>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
            </div>
          </div>
        </section>

        <section className="container ecomChoose">
          <h2>How to choose between ecommerce marketing agencies</h2>
          <p className="ecomIntro">
            You will talk to a few agencies before you decide, and they will
            all say they are great. Here are six questions worth asking every
            one of them, including GrowBrandz, with our honest answers.
          </p>
          <div className="ecomCheckList">
            {checks.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="ecomNote">
            A good ecommerce agency in India answers all six without hesitating.
          </p>
        </section>

        <section className="ecomAsk">
          <div className="container ecomAskInner">
            <div>
              <h2>Ask us these six questions on a call</h2>
              <p>
                Pick a time that suits you and bring your questions. We will
                answer them straight, and tell you if a different route would
                suit your store better.
              </p>
              <button type="button" className="button2" onClick={openForm}>
                Book a call
              </button>
            </div>
            <EcomPhoto
              src={ecomCall}
              alt="Two people at a desk, one of them on a phone call"
            />
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
                alt="Creative elements representing ecommerce brand building"
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
            alt="Ecommerce marketing and store growth visual element"
          />
          <img
            className="homeceoExtra2"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo2.png"
            alt="Brand growth illustration for online stores"
          />
          <img
            className="homeceoExtra3"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo3.png"
            alt="Creative process behind ecommerce campaigns"
          />
          <img
            className="homeceoExtra4"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo4.png"
            alt="Design and strategy supporting online store sales"
          />
          <img
            className="homeceoExtra5"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo5.png"
            alt="Team collaboration for ecommerce marketing"
          />
        </section>

        <Divider
          bgColor="#EC4899"
          fillColor="#FFD703"
          boxStroke="#000000"
          gridStroke="#000000"
        />

        <section className="homeFAQ">
          <h2>Ecommerce marketing questions founders ask</h2>
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

export default EcommerceMarketing;
