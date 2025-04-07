import React from "react";
import "./Features.css";

const Features = () => {
  const features = [
    {
      icon: <img src="./smart.svg" />,
      title: "Smart",
      description:
        "FacialCure leverages advanced artificial intelligence techniques to analyze facial images with precision. By using AI-driven algorithms, it can detect skin issues like acne, pigmentation, and under-eye darkness with high accuracy.",
    },
    {
      icon: <img src="./clock.svg" />,
      title: "Simple",
      description:
        "The platform is user-friendly, allowing users to upload a face image for analysis and receive customized skincare solutions with clear, easy-to-follow instructions for creating personalized face packs.",
    },
    {
      icon: <img src="./phone.svg" />,
      title: "Accessible",
      description:
        "The website is accessible 24/7 from any device with an internet connection, allowing users to analyze their skin and receive solutions anytime, anywhere, eliminating the need for frequent dermatology visits.",
    },
    {
      icon: <img src="./affordable.svg" />,
      title: "Affordable",
      description:
        "The system offers affordable skincare solutions with DIY face packs using common household ingredients, saving users money while effectively addressing their concerns. It also suggests alternatives for missing ingredients, ensuring cost-effectiveness without compromising results.",
    },
  ];

  return (
    <div>
      <div className="feature-container">
        <h2 className="feature-title">Why is FacialCure worth using?</h2>
        <div className="feature-features">
          {features.map((feature, index) => (
            <div key={index} className="features">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-topic">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
