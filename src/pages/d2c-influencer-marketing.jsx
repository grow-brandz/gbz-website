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
import reel1 from "../assets/videos/brand1.mp4";
import reel2 from "../assets/videos/brand2.mp4";
import reel3 from "../assets/videos/brand3.mp4";
import reel4 from "../assets/videos/brand4.mp4";
import reel5 from "../assets/videos/brand5.mp4";
import { CategoryIcon, StoryShowcase } from "./d2c-performance-marketing.jsx";

const PAGE_PATH = "/d2c-influencer-marketing";

const brands = [
  { name: "Zam Zam", logo: zamZamLogo },
  { name: "Rio Grande", logo: rioGrandeLogo },
  { name: "Ears Lovingly", logo: earsLogoImage },
  { name: "Drip", logo: dripLogo },
  { name: "Vee Vee", logo: veeVeeLogo },
];

const reels = [
  {
    src: reel1,
    href: "https://www.instagram.com/reel/Deg_kEvCE56/?obrf=eDgxaTd1MnBsaWRp",
    label: "Creator reel 1",
  },
  {
    src: reel2,
    href: "https://www.instagram.com/reel/DZrRMu-TNOR/?psln=MTJrdzB0cHBkNjJq",
    label: "Creator reel 2",
  },
  {
    src: reel3,
    href: "https://www.instagram.com/reel/DW0kAaTznVc/?cplk=bjMyMXVuOWZqZTlo",
    label: "Creator reel 3",
  },
  {
    src: reel4,
    href: "https://www.instagram.com/reel/DWs2qF8gHjc/?exln=bmU0ZjJ6dmI1bDZ4",
    label: "Creator reel 4",
  },
  {
    src: reel5,
    href: "https://www.instagram.com/reel/DbfkUzQE5f8/?vrfl=dTJIOWVmc3F1dmJh",
    label: "Creator reel 5",
  },
];

const reasons = [
  {
    title: "We pick influencers your buyers already follow",
    text: "We choose influencers by who follows them, not by how many follow them. If a creator's audience looks like your buyers, even a smaller account can bring you more orders than a famous one.",
  },
  {
    title: "We brief creators so posts feel natural",
    text: "We send each creator a short brief with your product details and the points that matter, then let them explain it their own way. People can tell when someone is reading a script, so we keep the brief light.",
  },
  {
    title: "We follow every campaign through to sales",
    text: "Likes are nice, but you are running a business. So we look at the orders each creator brings to your store, and that tells you who is worth working with again.",
  },
];

const readiness = [
  {
    title: "Early customer reviews",
    text: "Visitors from a creator's post will look for proof that other people like your product. Even a handful of honest reviews can help them decide.",
  },
  {
    title: "A store page ready for traffic",
    text: "If your pages load slowly or checkout takes too long, visitors leave quickly, and the creator's effort is wasted.",
  },
  {
    title: "A test budget set aside",
    text: "Keep a small amount for creator fees and free products, so you can try a few creators and see who works before you spend more.",
  },
];

const services = [
  {
    title: "Finding the right influencer",
    text: "Who you pick matters more than how much you pay. Micro influencers, with roughly 10,000 to 100,000 followers, are often a good place to start because their followers tend to trust their picks.",
    points: [
      "Creators of different sizes, matched to your goal and budget",
      "Audience checks for real followers and real engagement",
      "Past brand collaborations reviewed for fit",
      "A shortlist with a reason for every choice",
    ],
  },
  {
    title: "Campaign plans and briefs",
    text: "A good campaign starts with a plan you can read in two minutes. It covers what you want, how many creators you need, and what each one will make.",
    points: [
      "The goal and the number of creators needed",
      "Content ideas for Reels, Stories, and videos",
      "A posting calendar around your launches and festivals",
      "Content formats matched to each creator's style",
    ],
  },
  {
    title: "Product seeding and gifting",
    text: "Product seeding means sending your product free to creators and seeing who likes it enough to post. It is a gentle way to test creators before you pay them.",
    points: [
      "Gifting lists built around your product and audience",
      "Product packs and delivery handled for you",
      "Follow-ups so creators post on time",
      "A record of which free products led to posts",
    ],
  },
  {
    title: "Paid creator collaborations",
    text: "When you want more say over the message and the timing, paid posts are the better route. Everything is agreed in writing, so there are no surprises.",
    points: [
      "Fees and deliverables agreed before work begins",
      "Reels, YouTube videos, and Stories planned together",
      "Posting dates agreed in writing",
      "Rights to reuse the content on your website and social pages",
    ],
  },
  {
    title: "Codes, links and reports",
    text: "Every creator gets a tracked link and a code of their own. When someone orders with them, it shows up against that creator's name in your report.",
    points: [
      "A unique link and discount code for each creator",
      "Orders matched to each code in your store",
      "Reach, saves, and clicks shown next to sales",
      "A simple report after every campaign",
    ],
  },
  {
    title: "Contracts and ad disclosures",
    text: "Influencer posts count as advertising in India, and the rules apply to you as well as the creator. GrowBrandz makes sure every paid post is labelled, and every product claim can be backed up.",
    points: [
      "Written agreements covering fees, dates, and content",
      "Clear paid partnership or ad labels on every paid post",
      "Checks on product claims, especially for health and food products",
      "A record of every collaboration, kept for you",
    ],
  },
  {
    title: "Long-term creator partnerships",
    text: "A creator who brings you orders once will often do it again. This is how you build a small group of creators who really know your product.",
    points: [
      "Repeat collaborations with your best performers",
      "Creator ambassadors for new launches",
      "Early access to new products for loyal creators",
      "Regular reviews to drop what is not working",
    ],
  },
];

const steps = [
  {
    title: "Set your goal and budget",
    text: "We start with a simple chat about what you want, such as first orders for a new product or more attention for a launch. Then we decide how to split your budget between creator fees and free products.",
  },
  {
    title: "Shortlist and check creators",
    text: "GrowBrandz puts together a shortlist and looks closely at each creator's audience, past posts and engagement. You see the list and approve it before anyone is contacted.",
  },
  {
    title: "Brief creators and approve content",
    text: "Creators get the brief and send you their drafts. Nothing goes live until you are happy with it.",
  },
  {
    title: "Go live and track every sale",
    text: "Posts go live on the agreed dates and orders start appearing against each creator's name. We keep in touch with creators in the first few days, so you do not have to.",
  },
  {
    title: "Review results and plan the next round",
    text: "Once the campaign ends, you get a simple report on what worked and what did not. The best creators and ideas go straight into your next round.",
  },
];

const categories = [
  {
    title: "FMCG & Consumer Brands",
    text: "Everyday products work well with relatable creators, so expect simple reviews, unboxings, and daily-use videos.",
    icon: "bag",
  },
  {
    title: "Food & Beverage",
    text: "Food sells when people see it being enjoyed, so recipe videos and taste tests from food creators work well, with free packs to start.",
    icon: "cup",
  },
  {
    title: "Health & Wellness",
    text: "Trust matters most here, so creators need real expertise or real experience, and every claim is checked before the post goes live.",
    icon: "heart",
  },
  {
    title: "Fashion & Apparel",
    text: "Shoppers want to see how clothes look and fit, so styling videos and try-on reels from creators who match your customers work best.",
    icon: "hanger",
  },
  {
    title: "Lifestyle & Consumer Products",
    text: "Your product needs to be seen in a real home or a real day, so creators who show it in everyday settings do the most for you.",
    icon: "spark",
  },
];

const faqs = [
  {
    question: "What does a D2C influencer marketing agency do?",
    answer: [
      "It finds influencers your customers already follow, plans and manages the collaborations, and shows you the results.",
    ],
  },
  {
    question: "How much does influencer marketing cost in India?",
    answer: [
      "There are three costs: what you pay the influencer, the products you send them, and the agency fee. Creator fees depend on how big their audience is and what you ask them to make.",
      "After your first call, GrowBrandz will send you a clear plan and quote.",
    ],
  },
  {
    question: "Should I hire an agency or work with creators directly?",
    answer: [
      "If you are just starting, working with one or two creators yourself can be a good way to learn.",
      "An agency starts to make sense when you want many creators at once, need contracts and tracking handled, or do not have time to chase posts and payments. That is when influencer campaign management becomes a full-time job.",
    ],
  },
  {
    question: "How do you track sales from influencers?",
    answer: [
      "Each creator gets a personal link and code, and orders using them show up under their name in your store.",
    ],
  },
  {
    question: "Do creators have to say a post is an ad?",
    answer: [
      "Yes, and this includes gifted products as well as paid ones. A clear label such as #ad or the platform's paid partnership tag is needed, and brands share the responsibility.",
    ],
  },
  {
    question: "How long before a campaign shows results?",
    answer: [
      "You will often see the first orders within a few days of a post going live, while the full effect builds over the next few weeks.",
    ],
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

function CreatorReels() {
  const rowRef = useRef(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row || typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const videos = [...row.querySelectorAll("video")];

    const start = () => {
      videos.forEach((video) => {
        if (!video.getAttribute("src")) {
          video.src = video.dataset.src;
          video.load();
        }
        if (!reduced) {
          const play = video.play();
          if (play) play.catch(() => {});
        }
      });
    };

    const onScroll = () => {
      const box = row.getBoundingClientRect();
      if (box.top < window.innerHeight + 200 && box.bottom > -200) start();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="d2cReelRow" ref={rowRef} aria-label="Creator reels">
      {reels.map((reel) => (
        <a
          className="d2cReel"
          key={reel.href}
          href={reel.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={reel.label}
        >
          <video
            data-src={reel.src}
            muted
            loop
            playsInline
            preload="none"
          />
        </a>
      ))}
    </div>
  );
}

function D2cInfluencer() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const homeData = useSsrPageData("/", getHomeData);
  const story = homeData?.our_story;

  return (
    <>
      <PageSeo
        title="D2C Influencer Marketing Agency | GrowBrandz"
        description="GrowBrandz is a D2C influencer marketing agency in India. Find the right influencer, run the campaign, and see which posts bring sales to your store."
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
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer.join(" "),
                },
              })),
            }),
          }}
        />
      </Helmet>

      <main className="d2cPage">
        <section className="container d2cHero servicesHero commonHero">
          <h1>
            D2C Influencer Marketing Agency With{" "}
            <Highlight>Creators Your Buyers Trust</Highlight>
          </h1>
          <p>
            Not sure which creators are worth your money? GrowBrandz is a D2C
            influencer marketing agency in India that finds the right ones,
            runs the campaign, and shows you which posts led to orders.
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

        <section className="container d2cReels">
          <CreatorReels />
        </section>

        <section className="container d2cReasons">
          <h2>
            Why D2C brands choose us for <span>influencer</span> marketing
          </h2>
          <p className="d2cLead">
            Influencer marketing for D2C brands only works when the creator, the
            product, and the audience match. You have probably seen a post
            collect plenty of likes and very few orders, and this is how
            GrowBrandz avoids that.
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

        <section className="container d2cReady">
          <h2>Is your brand ready for influencer marketing?</h2>
          <div className="d2cReadyGrid">
            {readiness.map((item, index) => (
              <article key={item.title}>
                <p className="d2cIndex">0{index + 1}</p>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="d2cReadyClose">
            <div>
              <p>
                Before you spend on influencers, ask yourself one thing: if a
                thousand new people visited your store tomorrow, would it be
                ready for them? Not sure? We will tell you honestly.
              </p>
              <p>
                Book a call and tell us about your brand. GrowBrandz will say
                whether now is a good time, or what to fix first.
              </p>
            </div>
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
          <h2>What we handle in your influencer campaigns</h2>
          <p className="d2cLead">
            Here is what GrowBrandz handles for you. Our influencer marketing
            services for D2C brands cover everything from the first creator
            search to the final report, so you are not left chasing influencers
            over DMs.
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
                <button
                  type="button"
                  className="d2cExploreSoon"
                  onClick={() => setFormOpen(true)}
                >
                  Find my ideal influencers
                </button>
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
          <h2>How an influencer campaign runs with us</h2>
          <p className="d2cLead">From first brief to final report in 5 steps.</p>
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
          <h2>Ready to find which creators could sell your product?</h2>
          <p>
            Tell us what you sell and who buys it, and GrowBrandz will sketch
            out the kind of creators who could work for you. A short call is
            all it takes to get started.
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
          <h2>How creators work for each D2C category</h2>
          <p className="d2cLead">
            Buyers listen to different people in different categories. Someone
            who trusts a fitness creator for supplements may not take skincare
            advice from the same person.
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
            alt="Brand growth and influencer marketing illustration"
          />
          <img
            className="homeceoExtra3"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo3.png"
            alt="Creative process behind influencer campaigns"
          />
          <img
            className="homeceoExtra4"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo4.png"
            alt="Design and strategy supporting online store growth"
          />
          <img
            className="homeceoExtra5"
            src="https://ik.imagekit.io/growbrandz/tr:f-auto/ceo5.png"
            alt="Team collaboration for D2C influencer marketing"
          />
        </section>

        <Divider
          bgColor="#EC4899"
          fillColor="#FFD703"
          boxStroke="#000000"
          gridStroke="#000000"
        />

        <section className="homeFAQ">
          <h2>Influencer marketing questions D2C founders ask</h2>
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
                {activeIndex === index &&
                  item.answer.map((paragraph) => (
                    <p className="faqAnswer" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
              </div>
            ))}
          </div>
        </section>
      </main>
      <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} />
    </>
  );
}

export default D2cInfluencer;
