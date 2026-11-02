import { useState } from "react";
import { getBookACallData } from "../services/api";
import LottieLoop from "../components/lottiecomp";
import ContactFormModal from "../components/contactFormModal";
import Hero from "../assets/lotties/contactHero.json";
import { useSsrPageData } from "../hooks/useSsrPageData";
import { PageSeo } from "../components/PageSeo";

function Contact() {
  const contactData = useSsrPageData("/contact", getBookACallData);
  const [formOpen, setFormOpen] = useState(false);

  const bannerTitle =
    contactData?.banner?.title || "Great Work Starts with a Hello";

  return (
    <>
      <PageSeo
        title="Talk to an Ecommerce Growth Partner | Growbrandz"
        description="Talk to an ecommerce growth partner to explore D2C marketing strategies, performance growth plans, and ecommerce growth consultation."
        path="/contact"
      />

      <main className="contactPage">
        <section className="container contactHero commonHero">
          <h1>
            {bannerTitle.replace(" a Hello", "").replace(" a hello", "")}
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
                  fill="#EC4899"
                />
              </svg>

              <span>
                {bannerTitle.includes(" a ")
                  ? `a ${bannerTitle.split(" a ")[1]}`
                  : "a Hello"}
              </span>
            </div>
          </h1>

          <p>{contactData?.banner?.paragraph}</p>

          <button
            type="button"
            className="button1 contactHeroCta"
            onClick={() => setFormOpen(true)}
          >
            Send a message
          </button>

          <LottieLoop
            animationData={Hero}
            className="commonHeroFloat contactHeroFloat"
          />
        </section>
        <ContactFormModal open={formOpen} onClose={() => setFormOpen(false)} />
      </main>
    </>
  );
}

export default Contact;
