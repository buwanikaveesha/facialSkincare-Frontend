import { useState } from "react";
import "./ContactUs.css";
import React, { useRef } from "react";

const ContactUs = () => {
    const formRef = useRef(null);
    const scriptURL = import.meta.env.REACT_APP_GOOGLE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);

        try {
            const response = await fetch(scriptURL, {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                toast.success("Your message has been successfully sent 👍");
                formRef.current.reset();
            } else {
                console.error("Error submitting form");
            }
        } catch (error) {
            console.error("Error!", error.message);
        }
    };

    // const [formData, setFormData] = useState({
    //     Name: "",
    //     Email: "",
    //     Message: ""
    // });
    // const [msg, setMsg] = useState("");

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(process.env.REACT_APP_GOOGLE_URL, {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(formData),
    //         });

    //         if (response.ok) {
    //             setMsg("Message sent successfully!");
    //             setFormData({ Name: "", Email: "", Message: "" });
    //         } else {
    //             setMsg("Failed to send message.");
    //         }
    //     } catch (error) {
    //         setMsg("Error occurred. Please try again.");
    //     }
    // };


    return (
        <section className="contact" id="contact">
            <h2 className="heading">Contact <span>Us</span></h2>
            <div className="contact-right">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="Name"
                        placeholder="Your Name"
                        value={formData.Name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="Email"
                        placeholder="Your Email"
                        value={formData.Email}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="Message"
                        rows="6"
                        placeholder="Your Message"
                        value={formData.Message}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="btn btn2">Submit</button>
                </form>
                <span id="msg">{msg}</span>
            </div>
        </section>
    );
};

export default ContactUs;
