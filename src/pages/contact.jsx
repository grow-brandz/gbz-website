import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { getBookACallData } from "../services/api";
import { useNavigate } from "react-router-dom";
import LottieLoop from "../components/lottiecomp";
import Hero from "../assets/lotties/contactHero.json";
import { useSsrPageData } from "../hooks/useSsrPageData";
import { PageSeo } from "../components/PageSeo";

function Contact() {
  const contactData = useSsrPageData("/contact", getBookACallData);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [],
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (!formOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.documentElement.classList.add("form-modal-open");
    document.body.style.overflow = "hidden";
    nameInputRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") setFormOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.classList.remove("form-modal-open");
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [formOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
  
    try {
      const emailjs = await import("@emailjs/browser");
  
      await emailjs.default.send(
        "service_teqp124",
        "template_k64xppp",
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          services: formData.services.join(", "),
          message: formData.message,
          to_name: "Growbrandz Team",
        },
        "HoMZyzlh-zHzalxS7"
      );

      navigate("/thankyou");
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {formOpen &&
          createPortal(
            <div
              className="formModal popupBg"
              role="presentation"
              onClick={() => setFormOpen(false)}
            >
              <div
                className="formModalPanel"
                role="dialog"
                aria-modal="true"
                aria-label="Send a message"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  className="formModalClose"
                  onClick={() => setFormOpen(false)}
                  aria-label="Close form"
                >
                  ×
                </button>
                <div className="formModalBody">
                <form className="contactFormBox" onSubmit={handleSubmit}>
                  {submitStatus === "error" && (
                    <div className="formModalError">
                      Oops! Something went wrong. Please try again.
                    </div>
                  )}
                  <div className="formModalFields">
                    <div className="formGroup">
                      <label htmlFor="contact-name">Full Name</label>
                      <input
                        id="contact-name"
                        ref={nameInputRef}
                        name="name"
                        type="text"
                        placeholder="eg: John doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="formGroup">
                      <label htmlFor="contact-email">Email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="johndoe@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="formGroup">
                      <label htmlFor="contact-phone">Phone Number</label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="+91-9876543210"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="formGroup">
                      <label htmlFor="contact-message">Message</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        placeholder="We would love to hear from you!"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <button
                    className="submitBtn button1"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                </form>
                </div>
              </div>
            </div>,
            document.body
          )}
      </main>
    </>
  );
}

export default Contact;
