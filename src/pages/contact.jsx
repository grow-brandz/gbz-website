import { useEffect, useState } from "react";
import { getBookACallData } from "../services/api";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import LottieLoop from "../components/lottiecomp";
import Hero from "../assets/lotties/contactHero.json";
import Divider from "../components/divider";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Contact() {
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBookACallData();

        console.log("FULL RESPONSE =>", response);
        console.log("RESPONSE.DATA =>", response.data);

        setContactData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter((s) => s !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.send(
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

  const instagramLink =
    contactData?.form_content?.social_links?.links?.find(
      (item) =>
        item?.links?.title?.toLowerCase() === "instagram"
    )?.links?.url;

  const facebookLink =
    contactData?.form_content?.social_links?.links?.find(
      (item) =>
        item?.links?.title?.toLowerCase() === "facebook"
    )?.links?.url;

  return (
    <>
      <Helmet>
        <title>Talk to an Ecommerce Growth Partner | Growbrandz</title>
        <meta name="description"
          content="Talk to an ecommerce growth partner to explore D2C marketing strategies, performance growth plans, and ecommerce growth consultation." />
        <meta property="og:title" content="Talk to an Ecommerce Growth Partner | Growbrandz" />
        <meta property="og:description"
          content="Talk to an ecommerce growth partner to explore D2C marketing strategies, performance growth plans, and ecommerce growth consultation." />
      </Helmet>

      <main className="contactPage">
        <section className="container contactHero commonHero">
          <h1>
            {contactData?.banner?.title
              ?.replace(" a Hello", "")
              ?.replace(" a hello", "")}

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
                {contactData?.banner?.title?.includes(" a ")
                  ? `a ${contactData.banner.title.split(" a ")[1]}`
                  : ""}
              </span>
            </div>
          </h1>

          <p>{contactData?.banner?.paragraph}</p>

          <LottieLoop
            animationData={Hero}
            className="commonHeroFloat contactHeroFloat"
          />
        </section>
        <Divider
          bgColor="#6842EF"
          fillColor="#FFF2EC"
          boxStroke="#000000"
          gridStroke="#000000"
        />
        <section className="container contactForm">
          <div className="contentSide">
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
                  href={`mailto:${contactData?.form_content?.mail_id || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contactData?.form_content?.mail_id || "hello@growbrandz.com"}
                </a>

                <a
                  className="button1"
                  href={`tel:${contactData?.form_content?.phone_number || ""}`}
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

                {/* Instagram */}
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

                {/* Facebook */}
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
              <div style={{ padding: "1rem", marginBottom: "1rem", backgroundColor: "#f8d7da", color: "#721c24", borderRadius: "4px" }}>
                Oops! Something went wrong. Please try again.
              </div>
            )}

            <div className="formGroup">
              <label>Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="eg: John doe"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="johndoe@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>Phone Number</label>
              <input
                name="phone"
                type="number"
                placeholder="+91-9876543210"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="formGroup">
              <label>What can we do for you?</label>

              <div className="tagContainer" role="group" aria-label="Services">
                <div className="tagItem">
                  <input
                    className="tagCheckbox"
                    type="checkbox"
                    id="t-d2c"
                    name="services"
                    value="D2C Marketing"
                    onChange={handleCheckboxChange}
                  />
                  <label className="tagLabel" htmlFor="t-d2c">
                    <span className="tagText">D2C Marketing</span>
                    <span className="tagIcon" aria-hidden></span>
                  </label>
                </div>

                <div className="tagItem">
                  <input
                    className="tagCheckbox"
                    type="checkbox"
                    id="t-mi"
                    name="services"
                    value="Market Intelligence"
                    onChange={handleCheckboxChange}
                  />
                  <label className="tagLabel" htmlFor="t-mi">
                    <span className="tagText">Market Intelligence</span>
                    <span className="tagIcon" aria-hidden></span>
                  </label>
                </div>

                <div className="tagItem">
                  <input
                    className="tagCheckbox"
                    type="checkbox"
                    id="t-shop"
                    name="services"
                    value="Shopify Development"
                    onChange={handleCheckboxChange}
                  />
                  <label className="tagLabel" htmlFor="t-shop">
                    <span className="tagText">Shopify Development</span>
                    <span className="tagIcon" aria-hidden></span>
                  </label>
                </div>

                <div className="tagItem">
                  <input
                    className="tagCheckbox"
                    type="checkbox"
                    id="t-smm"
                    name="services"
                    value="Social Media Marketing"
                    onChange={handleCheckboxChange}
                  />
                  <label className="tagLabel" htmlFor="t-smm">
                    <span className="tagText">Social Media Marketing</span>
                    <span className="tagIcon" aria-hidden></span>
                  </label>
                </div>

                <div className="tagItem">
                  <input
                    className="tagCheckbox"
                    type="checkbox"
                    id="t-email"
                    name="services"
                    value="Email/Whatsapp Campaign"
                    onChange={handleCheckboxChange}
                  />
                  <label className="tagLabel" htmlFor="t-email">
                    <span className="tagText">Email/Whatsapp Campaign</span>
                    <span className="tagIcon" aria-hidden></span>
                  </label>
                </div>

                <div className="tagItem">
                  <input
                    className="tagCheckbox"
                    type="checkbox"
                    id="t-perf"
                    name="services"
                    value="Performance Marketing"
                    onChange={handleCheckboxChange}
                  />
                  <label className="tagLabel" htmlFor="t-perf">
                    <span className="tagText">Performance Marketing</span>
                    <span className="tagIcon" aria-hidden></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="formGroup">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="We would love to hear from you!"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <button
              className="submitBtn button1"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </section>
        <Divider
          bgColor="#FFF2EC"
          fillColor="#6842EF"
          boxStroke="#FFFFFF"
          gridStroke="#000000"
        />
      </main>

    </>
  );
}

export default Contact;