import React, { useState } from 'react';
import "./ContactUs.css";

const ContactForm = () => {
    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    // State for message feedback
    const [msg, setMsg] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const url = import.meta.env.VITE_GOOGLE_URL;
        fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `Name=${formData.name}&Email=${formData.email}&Message=${formData.message}`
        })
            .then((res) => res.text())
            .then((data) => {
                setMsg(data);
            })
            .catch((error) => {
                setMsg("Error sending message");
                console.log(error);
            });
    };

    return (
        <section className="contact" id="contact">
            <h2 className="heading">
                Contact <span>Me</span>
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
                {msg && <span id="msg">{msg}</span>}
            </div>
        </section>
    );
};

export default ContactForm;
