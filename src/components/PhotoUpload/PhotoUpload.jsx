import React from "react";
import HealthyFace from "../../assets/images/healthy face.png";
import "./PhotoUpload.css";

const PhotoUpload = ({ onStartAnalysis }) => {
  return (
    <div className="skin-coach-container">
      <div className="image-section">
        <div className="image-wrapper">
          <img
            src={HealthyFace}
            alt="Skin Coach Illustration"
            className="image"
          />
        </div>
        <h1 className="skin-coach-title">
          FACIAL <span className="ai-text">AI</span> COACH
        </h1>
      </div>
      <div className="info-section">
        <h2 className="info-title">
          Get a healthy, glowing face with just 1 selfie
        </h2>
        <p className="info-description">
          FacialCure AI analyzes five key aspects of healthy, glowing skin 
          to help you unlock your glow with a single selfie.
        </p>
        <button 
          onClick={onStartAnalysis}
          className="start-button"
        >
          Start My Face Analysis
        </button>
      </div>
    </div>
  );
};

export default PhotoUpload;
