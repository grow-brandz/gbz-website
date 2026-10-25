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
                aria-labelledby="contact-form-title"
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
                <div className="formModalCopy" id="contact-form-title">
                  <h3>
                    {contactData?.form_content?.title ||
                      "Tell us your vision, we'll make it happen."}
                  </h3>
                  <div className="smallContent">
                    <h6>
                      {contactData?.form_content?.paragraph || "SAY HELLO!"}
                    </h6>
                    <div className="buttons">
                      <a
                        className="button1"
                        href={`mailto:${contactData?.form_content?.mail_id || "hello@growbrandz.com"}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contactData?.form_content?.mail_id || "hello@growbrandz.com"}
                      </a>
                      <a
                        className="button1"
                        href={`tel:${contactData?.form_content?.phone_number || "918012005000"}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contactData?.form_content?.phone_number
                          ? `+${contactData.form_content.phone_number}`
                          : "+91 8012005000"}
                      </a>
                    </div>
                  </div>
                  <div className="smallContent">
                    <h6>
                      {contactData?.form_content?.social_links?.title || "FOLLOW US"}
                    </h6>
                    <div className="buttons socialIcons">
                      {contactData?.form_content?.social_links?.links?.[0] && (
                        <a
                          className="button1"
                          href={
                            contactData.form_content.social_links.links[0].links.url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M18.3952 7.02212C17.6005 7.02368 16.9543 6.3802 16.9528 5.58548C16.9512 4.79076 17.5947 4.14457 18.3898 4.14302C19.1848 4.14146 19.831 4.78531 19.8326 5.58004C19.8338 6.37476 19.1903 7.02057 18.3952 7.02212Z" fill="black" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M12.0115 18.161C8.60909 18.1676 5.8451 15.4149 5.8385 12.0117C5.83188 8.60923 8.58536 5.84481 11.9878 5.8382C15.3909 5.83159 18.1553 8.5859 18.1619 11.9879C18.1685 15.3912 15.4143 18.1544 12.0115 18.161Z" fill="black" />
                          </svg>
                        </a>
                      )}
                      {contactData?.form_content?.social_links?.links?.[1] && (
                        <a
                          className="button1"
                          href={
                            contactData.form_content.social_links.links[1].links.url
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg viewBox="0 0 24 24" fill="none">
                            <path
                              d="M12 0C18.6274 0 24 5.37259 24 12C24 18.1352 19.3955 23.1944 13.4538 23.9121V15.667L16.7001 15.667L17.3734 12H13.4538V10.7031C13.4538 9.73417 13.6439 9.06339 14.0799 8.63483C14.5159 8.20627 15.1979 8.01993 16.1817 8.01993C16.4307 8.01993 16.6599 8.02241 16.8633 8.02736C17.1591 8.03456 17.4002 8.047 17.568 8.06467V4.74048C17.501 4.72184 17.4218 4.70321 17.3331 4.68486C17.1321 4.6433 16.8822 4.60324 16.6136 4.56806C16.0523 4.49453 15.4093 4.4423 14.9594 4.4423C13.1424 4.4423 11.7692 4.83102 10.8107 5.63619C9.65388 6.60791 9.10108 8.18622 9.10108 10.4199V12H6.62659V15.667H9.10108V23.6466C3.87432 22.3498 0 17.6277 0 12C0 5.37259 5.37259 0 12 0Z"
                              fill="black"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="smallContent">
                    <h6>
                      {contactData?.form_content?.location?.title || "LOCATIONS"}
                    </h6>
                    <p>
                      {contactData?.form_content?.location?.location_name_list
                        ?.map((item) => item.location_name.trim())
                        .join(" | ") || "Chennai | Bengaluru | Madurai"}
                    </p>
                  </div>
                </div>
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
