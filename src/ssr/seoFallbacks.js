/**
 * Minimal SEO-safe fallbacks when the CMS API is unavailable during SSR.
 * Keeps H1 / critical copy meaningful in the initial HTML.
 */
export const SEO_FALLBACKS = {
  "/": {
    banner: {
      header: "Brand yourself irreplacable",
      banner_paragraph:
        "We help D2C and product based ecommerce brands unlock real digital sales growth through performance driven branding, content, and websites that go beyond surface level creativity and actually drive online store revenue growth.",
      book_a_consultation: {
        title: "Book a consultation",
        url: "/contact",
      },
    },
    d2c: {
      header:
        "We build campaigns and communication that explain things in a way customers actually understand.",
      check_our_process: { title: "Check our process", url: "/our-process" },
    },
    have_questions: {
      heading: "Have Questions?",
      paragraph:
        "We get it. Choosing the right D2C marketing agency is a big decision. Here are answers to some of the most common questions brands ask us before starting their growth journey.",
      question_and_answer: [
        {
          question: "Do you guarantee growth or results?",
          answer:
            "We do not promise overnight growth or unrealistic numbers. What we do guarantee is a clear strategy, transparent execution, and a performance driven approach focused on sustainable digital sales growth. Real ecommerce growth depends on multiple factors, and we work with you to improve the ones we can control.",
        },
        {
          question: "What kind of brands do you usually work with?",
          answer:
            "We primarily work with D2C brands, ecommerce businesses, and founders who are serious about building long term online store growth. Whether you are launching, scaling, or fixing performance issues, we adapt our approach to your stage of growth.",
        },
        {
          question: "How is Growbrandz different from other marketing agencies?",
          answer:
            "Most agencies focus on either creativity or performance. We focus on both. Our team blends branding, ecommerce marketing, and D2C performance marketing so that every decision supports conversions, retention, and revenue, not just aesthetics.",
        },
        {
          question: "How long does it take to see results?",
          answer:
            "Timelines depend on your current setup, market, and goals. Some improvements can be seen within weeks, while meaningful ecommerce revenue growth typically takes a few months of consistent execution, testing, and optimization.",
        },
        {
          question: "Do you work as a one time project or long term partner?",
          answer:
            "We believe real growth happens through long term collaboration. While we do offer project based engagements, most brands work with us on an ongoing basis to continuously improve performance, scale campaigns, and adapt as the market evolves.",
        },
      ],
    },
  },
  "/about": {
    banner: {
      heading: "A Full solution Creative& Marketing Agency",
      paragraph:
        "We combine market intelligence, strategy, and execution to help businesses scale with clarity, confidence, and measurable results.",
    },
    about: {
      heading: "Built to work with you, across brand & web",
    },
    what_to_expect: {
      heading: "What to expect when working with us",
    },
    founder_details: {
      title: "A letter from our founder",
    },
  },
  "/our-approach": {
    banner: {
      title: "Why Brands choose us",
      paragraph:
        "We follow a strategic marketing approach that helps founders scale with confidence, combining a growth marketing approach with a long term brand growth approach that actually works in the real world.",
    },
    our_approach: {
      heading: "Our approach is bold, future-ready, and deeply human.",
    },
  },
  "/our-process": {
    banner: {
      title: "How We Build Brands",
      paragraph:
        "We combine a proven ecommerce strategy framework, a practical growth marketing framework, and a structured D2C scaling process designed for long term results.",
    },
    our_process: {
      title: "It began with a simple observation",
    },
  },
  "/services": {
    banner: {
      title: "Result driven agency",
      paragraph:
        "We help D2C brands grow through focused ecommerce marketing services that balance strategy, creativity, and performance. From digital campaigns to website optimisation and WhatsApp marketing for D2C, everything we do is built to drive real results.",
    },
    growbrandz_specializes: {
      title:
        "GROWBRANDZ specializes in helping founders build clear brand systems and high converting digital experiences through focused D2C ecommerce marketing services.",
      specializes: [],
      contact_button: { title: "Contact Us", url: "/contact" },
    },
  },
  "/contact": {
    banner: {
      title: "Great Work Starts with a Hello",
      paragraph:
        "Growbrandz works closely with founders and teams to drive sustainable ecommerce growth through thoughtful strategy, clear execution, and honest collaboration. Let's start with a simple ecommerce growth consultation.",
    },
    form_content: {
      title: "Tell us your vision, we'll make it happen.",
      paragraph: "SAY HELLO!",
      mail_id: "hello@growbrandz.com",
      phone_number: "918012005000",
      social_links: { title: "FOLLOW US", links: [] },
      location: {
        title: "LOCATIONS",
        location_name_list: [
          { location_name: "Chennai" },
          { location_name: "Bengaluru" },
          { location_name: "Madurai" },
        ],
      },
    },
  },
};

export const SITE_ORIGIN = "https://growbrandz.com";
export const DEFAULT_OG_IMAGE =
  "https://ik.imagekit.io/growbrandz/tr:f-auto/growbrandzog.png";
