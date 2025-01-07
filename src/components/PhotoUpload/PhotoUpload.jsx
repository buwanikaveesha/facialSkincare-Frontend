import React, { useState, useEffect } from "react";
import HealthyFace from "../../assets/images/face2.png";
import "./PhotoUpload.css";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import Overlay from "../Overlay/Overlay";

const PhotoUpload = ({ onStartAnalysis }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [hasAgreed, setHasAgreed] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check for token to determine if logged in
        const token = localStorage.getItem("token");
        const agreementStatus = localStorage.getItem("hasAgreed") === "true";
        setIsLoggedIn(!!token);
        setHasAgreed(agreementStatus);
    }, []);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const openOverlay = () => {
        setIsOverlayVisible(true);
    };

    const closeOverlay = () => {
        setIsOverlayVisible(false);
    };

    const handleAgree = () => {
        localStorage.setItem("hasAgreed", "true");
        setHasAgreed(true);
        closeOverlay();
    };

    const handleUploadClick = () => {
        const token = localStorage.getItem("token");
        const agreementStatus = localStorage.getItem("hasAgreed") === "true";

        // Check if the user is logged in and has agreed to the terms
        if (!token || !agreementStatus) {
            alert("You must agree to the terms and be logged in to upload a photo.");
        } else {
            document.getElementById("upload-input").click();
        }
    };

    return (
        <div>
            {/* <Navbar /> */}

            <div className="photo_upload-container">
                <div className="photo_upload-image-section">
                    <div className="photo_upload-image-wrapper">
                        <img
                            src={HealthyFace}
                            alt="Skin Coach Illustration"
                            className="photo_upload-image"
                        />
                    </div>
                    <h1 className="photo_upload-skin-coach-title">
                        FACIAL <span className="photo_upload-ai-text">AI</span> COACH
                    </h1>
                </div>
                <div className="photo_upload-info-section">
                    <h1 className="photo_upload-info-title">Let's start!</h1>
                    <p className="photo_upload-info-description">
                        Add a photo to make a scan. You can upload a photo from your device.
                    </p>

                    <div className="button-group">
                        <button className="terms-button" onClick={openOverlay}>
                            <FontAwesomeIcon
                                icon={faClipboardCheck}
                                className="icon"
                                style={{ marginRight: "8px" }}
                            />
                            View Terms
                        </button>

                        {isLoggedIn && hasAgreed ? (
                            <>
                                <label htmlFor="upload-input" className="upload-button">
                                    <FontAwesomeIcon
                                        icon={faUpload}
                                        className="icon"
                                        style={{ marginRight: "8px" }}
                                    />
                                    Upload Photo
                                </label>
                                <input
                                    type="file"
                                    id="upload-input"
                                    onChange={handleFileUpload}
                                    accept="image/*"
                                    className="file-input"
                                    style={{ display: "none" }}
                                />
                            </>
                        ) : (
                            <button
                                className="upload-button"
                                onClick={handleUploadClick}
                            >
                                <FontAwesomeIcon
                                    icon={faUpload}
                                    className="icon"
                                    style={{ marginRight: "8px" }}
                                />
                                Upload Photo
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {isOverlayVisible && (
                <Overlay onCloseOverlay={closeOverlay} onAgree={handleAgree} />
            )}
        </div>
    );
};

export default PhotoUpload;
