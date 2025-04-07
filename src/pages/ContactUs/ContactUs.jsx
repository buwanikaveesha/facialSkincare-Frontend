import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = import.meta.env.VITE_GOOGLE_URL;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `Name=${formData.name}&Email=${formData.email}&Message=${formData.message}`,
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Message Sent 👍");
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        } else {
          throw new Error("Failed to send");
        }
      })
      .catch((error) => {
        toast.error("Error sending message ❌");
        console.error("Error:", error);
      });
  };

  return (
    <section className="contact" id="contact">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="contact-container">
        <h2 className="heading">
          Contact <span>Us</span>
        </h2>
        <div className="contact-right">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              rows="6"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <button type="submit" className="btn btn2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
