import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

function ContactFormModal({ open, onClose }) {
  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    services: [],
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.documentElement.classList.add("form-modal-open");
    document.body.style.overflow = "hidden";
    nameInputRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.documentElement.classList.remove("form-modal-open");
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  if (!open) return null;

  return createPortal(
    <div className="formModal popupBg" role="presentation" onClick={onClose}>
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
          onClick={onClose}
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
  );
}

export default ContactFormModal;
