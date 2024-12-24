import React, { useState } from "react";
import img1 from "../../assets/images/4.png";
import img3 from "../../assets/images/5.png";
import img2 from "../../assets/images/6.png";
import Navbar from '../Navbar/Navbar';
import "./Instructions.css";

const Instructions = () => {
    // Define the steps with content and image paths
    const steps = [
        {
            title: "Before you start",
            description: "Learn how to position your device for a perfect photo.",
            image: img1,
            note: "Maintain the smallest possible distance for a clear frame.",
        },
        {
            title: "Ensure Good Lighting",
            description: "Ensure your device is evenly lit for better photo quality.",
            image: img2,
            note: "Avoid shadows and direct sunlight.",
        },
        {
            title: "Keep It Clear",
            description: "The photo should be free of other objects.",
            image: img3,
            note: "Ensure a clear, uncluttered background.",
        },
    ];

    // State to track the current step
    const [currentStep, setCurrentStep] = useState(0);

    // Handlers for navigating the steps
    const goToPreviousStep = () => {
        setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
    };

    const goToNextStep = () => {
        setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    };

    const { title, description, image, note } = steps[currentStep];

    return (
        <div>
            <Navbar />
            <div className="instruction_container">
                <div className="instruction_carousel">
                    <div className="instruction_arrow left" onClick={goToPreviousStep}>
                        &lt;
                    </div>
                    <div className="instruction_content">
                        <h2>{title}</h2>
                        <p>{description}</p>
                        <div className="instruction_illustration">
                            <img src={image} alt="Illustration" />
                        </div>
                        <p>
                            <strong>{note}</strong>
                        </p>
                        <div className="instruction_dots">
                            {steps.map((_, index) => (
                                <span
                                    key={index}
                                    className={`instruction_dot ${index === currentStep ? "active" : ""
                                        }`}
                                ></span>
                            ))}
                        </div>
                    </div>
                    <div className="instruction_arrow right" onClick={goToNextStep}>
                        &gt;
                    </div>
                    <button className="instruction_cta-button">Got It</button>
                </div>
            </div>
        </div>
    );
};

export default Instructions;
