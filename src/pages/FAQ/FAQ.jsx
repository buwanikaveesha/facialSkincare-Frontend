import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How is Machine Learning used in the application?",
      answer:
        "Machine Learning analyzes uploaded images to detect facial skin issues and recommend face packs as solutions.",
    },
    {
      question: "Who should use FacialCure?",
      answer:
        "Anyone seeking affordable and accurate facial skincare advice can use the FacialCure.",
    },
    {
      question: "Does FacialCure replace the Doctor?",
      answer:
        "No, the FacialCure provides recommendations but does not replace professional medical advice.",
    },
    {
      question: "Is my personal information safe?",
      answer:
        "Yes, your information is securely stored and handled in compliance with data protection regulations.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {/* <button className="back-button">&larr; Back</button> */}
      <h1 className="faq-title">FAQ</h1>
      <ul className="faq-list">
        {faqs.map((faq, index) => (
          <li key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span style={{ fontWeight: "bold" }}>{faq.question}</span>
              <span className="faq-arrow">
                {activeIndex === index ? "\u25B2" : "\u25BC"}
              </span>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQ;
