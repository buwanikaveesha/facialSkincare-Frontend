import React from "react";
import Navbar from '../Navbar/Navbar';
import "./HowToDo.css";

// Importing PNG icons
import FocusIcon from "../../assets/images/1.png";
import SendIcon from "../../assets/images/2.png";
import SaveIcon from "../../assets/images/3.png";

const HowToDo = () => {
    const steps = [
        {
            icon: <img src={FocusIcon} alt="Focus Icon" className="step-icon" />,
            title: "Take a photo",
            description:
                "Keep zoomed at the closest distance (less than 10 cm), keep in focus and center only the face.",
        },
        {
            icon: <img src={SendIcon} alt="Send Icon" className="step-icon" />,
            title: "Identify and send",
            description:
                "Send your photo to the Artificial Intelligence. The system will analyze it and send you a risk assessment.",
        },
        {
            icon: <img src={SaveIcon} alt="Save Icon" className="step-icon" />,
            title: "Receive your risk assessment",
            description:
                "Get the result within 60 seconds and related advice on the next steps to take.",
        },
    ];

    return (
        <div>
            <Navbar />
            <div className="HowToDo-container">
                <h1>How to use FacialCure?</h1>
                <div className="HowToDo_steps">
                    {steps.map((step, index) => (
                        <div key={index} className="HowToDo_step tt-icon-box style-eleven">
                            <span className="process-count" data-step={index + 1}>
                                {index + 1}
                            </span>
                            <div>{step.icon}</div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowToDo;
