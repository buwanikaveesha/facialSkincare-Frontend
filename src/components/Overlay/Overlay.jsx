import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Overlay.css";
import { AiOutlineClose } from "react-icons/ai";

const Overlay = ({ onCloseOverlay, onAgree }) => {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const [isOverlayVisible, setIsOverlayVisible] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleAgreeButtonClick = () => {
    onAgree();
    onCloseOverlay();
  
    setTimeout(() => {
      navigate("/photoUpload");
    }, 100);
  };
  
  const closeOverlay = () => {
    setIsOverlayVisible(false);
  };

  return (
    <div className="overlay-container">
      <div className="overlay-slider">
        <button className="overlay-close-button" onClick={onCloseOverlay}>
          <AiOutlineClose size={20} />
        </button>

        <h2>Our Privacy Promise to You</h2>
        <p>
          Picture is exclusively used to perform the beauty profile and is
          deleted immediately after. The use of this website is governed by our
          Terms of Use.
        </p>

        <div className="overlay-checkbox-container">
          <input
            type="checkbox"
            id="privacy-checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="privacy-checkbox">I understand and accept</label>
        </div>

        <button
          className={`overlay-agree-button ${isChecked ? "highlight" : ""}`}
          onClick={handleAgreeButtonClick}
          disabled={!isChecked}
        >
          I Agree
        </button>
        {isOverlayVisible && <Overlay onCloseOverlay={closeOverlay} onAgree={() => console.log("Agreed")} />}
      </div>
    </div>
  );
};

export default Overlay;
