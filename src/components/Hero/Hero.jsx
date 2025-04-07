import React, { useContext, useState } from "react";
import BannerImage from "../../assets/images/banner1.png";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import LoginDialog from "../LoginDialog/LoginDialog";
import "./Hero.css";

const Hero = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleAnalysisClick = () => {
    if (!token) {
      setShowLoginDialog(true);
    } else {
      navigate("/start-analysis");
    }
  };

  return (
    <div>
      <div className="skincare-container">
        <header className="skincare-header">
          <div className="header-image">
            <img src={BannerImage} alt="Skincare AI" />
          </div>
          <div className="header-text">
            <h1>
              FacialCure: Skin Analysis <br /> for Personalised <br /> Facial
              Skincare
            </h1>
            <button className="analysis-button" onClick={handleAnalysisClick}>
              GET YOUR ANALYSIS
            </button>
          </div>
        </header>

        <section className="face-mapping-section">
          <h2 className="facial_topic">What is FacialCure?</h2>
          <p className="home_para">
            FacialCure is an AI-powered skincare platform that detects issues
            like acne and pigmentation from user-uploaded images. It provides
            personalized face pack recipes, suggests ingredient alternatives,
            and gathers user feedback, promoting natural and affordable skincare
            solutions.
          </p>
        </section>
      </div>
      <br />
      <br />

      {showLoginDialog && (
        <LoginDialog onClose={() => setShowLoginDialog(false)} />
      )}
    </div>
  );
};

export default Hero;
