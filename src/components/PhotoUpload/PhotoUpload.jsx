import React, { useState } from "react";
import HealthyFace from "../../assets/images/face2.png";
import "./PhotoUpload.css";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Overlay from "../Overlay/Overlay";  // Import the Overlay component

const PhotoUpload = ({ onStartAnalysis }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false); // State to control the overlay visibility

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Preview image
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setIsOverlayVisible(false);  // Hide the overlay once the image is chosen
            };
            reader.readAsDataURL(file);
        }
    };

    const openOverlay = () => {
        setIsOverlayVisible(true);  // Show overlay when the button is clicked
    };

    const closeOverlay = () => {
        setIsOverlayVisible(false);  // Close overlay
    };

    return (
        <div>
            <Navbar />

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

                    <div className="upload-button-wrapper">
                        <label htmlFor="upload-input" className="upload-button" onClick={openOverlay}>
                            <FontAwesomeIcon icon={faUpload} className="icon" style={{ marginRight: '8px' }} />
                            Upload Photo
                        </label>
                    </div>
                </div>
            </div>

            {/* Show overlay if it's visible */}
            {isOverlayVisible && (
                <Overlay onCloseOverlay={closeOverlay}>
                    {/* Inside the Overlay, we place the file input */}
                    <input
                        type="file"
                        id="upload-input"
                        onChange={handleFileUpload}
                        accept="image/*"
                    />
                </Overlay>
            )}
        </div>
    );
};

export default PhotoUpload;
