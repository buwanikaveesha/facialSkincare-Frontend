import React, { useState, useEffect } from "react";
import HealthyFace from "../../assets/images/face2.png";
import "./PhotoUpload.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
// import jwt_decode from "jwt-decode";
// import { jwtDecode } from "jwt-decode";
import { jwtDecode } from "jwt-decode";


const PhotoUpload = ({ onStartAnalysis }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [formData, setFormData] = useState({ feedback: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [feedbacks, setFeedbacks] = useState({});
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [savedResults, setSavedResults] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file.');
            return;
        }

        setError('');
        setPrediction('');
        setRecommendations([]);
        setCurrentIndex(0);

        const formDataUpload = new FormData();
        formDataUpload.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', formDataUpload, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.error) {
                setError(response.data.error);
                return;
            }

            setPrediction(response.data.predicted_class.replace(/_/g, ' '));
            setFeedbacks({});

            const feedbackPromises = response.data.recommendations.map(async (rec) => {
                const treatmentPack = rec['Treatment Pack'];
                try {
                    const feedbackResponse = await axios.get(
                        `http://localhost:3000/api/feedback/${encodeURIComponent(treatmentPack)}`
                    );
                    return { ...rec, UserFeedback: feedbackResponse.data.feedbacks || [] };
                } catch (error) {
                    return { ...rec, UserFeedback: [] };
                }
            });

            const fetchedRecommendations = await Promise.all(feedbackPromises);
            setRecommendations(fetchedRecommendations);
        } catch (err) {
            setError('An error occurred while uploading the image.');
            console.error(err);
        }
    };

    const handleNext = () => {
        if (recommendations.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendations.length);
        }
    };

    const handleFeedbackChange = (e) => {
        const { value } = e.target;
        setFeedbacks({ ...feedbacks, [currentIndex]: value });
    };

    const handleFeedback = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/api/feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    feedback: feedbacks[currentIndex] || '',
                    prediction: prediction,
                    treatmentPack: recommendations[currentIndex]['Treatment Pack'],
                }),
            });

            if (!response.ok) {
                const errorResult = await response.json();
                setMessage(errorResult.message || 'Failed to save feedback.');
                setMessageType('danger');
                return;
            }

            const result = await response.json();
            if (result.success) {
                setMessage('Feedback saved successfully!');
                setMessageType('success');
                setShowFeedbackModal(false);
            } else {
                setMessage(result.message || 'Failed to save feedback.');
                setMessageType('danger');
            }
        } catch (error) {
            console.error('Error saving feedback:', error);
            setMessage('An error occurred while saving feedback.');
            setMessageType('danger');
        }
    };

    const handleSaveResults = async () => {
        const formattedRecommendations = recommendations.map(rec => ({
            treatmentPack: rec['Treatment Pack'],
            ingredients: rec['Ingredients'],
            howToDo: rec['How to do'],
        }));

        const token = localStorage.getItem("token");
        let userEmail = '';

        // Check for token and decode it
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                userEmail = decodedToken.email;
                console.log("User Email:", userEmail);
            } catch (error) {
                console.error("Error decoding token:", error);
                setMessage('Failed to decode token. Please log in again.');
                setMessageType('danger');
                return;
            }
        } else {
            console.log("No token found.");
            setMessage('No token found. Please log in first.');
            setMessageType('danger');
            return; // Stop execution if token is missing
        }

        // If userEmail is still empty after decoding, handle the error
        if (!userEmail) {
            console.error('User email is missing!');
            setMessage('User email is missing. Please log in again.');
            setMessageType('danger');
            return;
        }

        // Prepare the data to be saved
        const resultsToSave = {
            userEmail: userEmail,
            prediction: prediction,
            recommendations: formattedRecommendations,
        };

        // Log the results for debugging purposes
        console.log("Results to save:", resultsToSave);

        // Send the data to the backend via a POST request
        try {
            const response = await axios.post('http://localhost:3000/api/results', resultsToSave, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Handle response success or failure
            if (response.data.success) {
                setSavedResults((prevResults) => [...prevResults, resultsToSave]);
                setMessage('Results saved successfully!');
                setMessageType('success');
            } else {
                setMessage(response.data.message || 'Failed to save results.');
                setMessageType('danger');
            }
        } catch (error) {
            console.error('Error saving results:', error);
            setMessage('An error occurred while saving results: ' + error.message);
            setMessageType('danger');
        }
    };


    return (
        <div>
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
                    </div>

                    {imagePreview && (
                        <button className="upload-button" type="button" onClick={handleUpload}>
                            Analyze
                        </button>
                    )}

                    {imagePreview && (
                        <div className="text-center mb-3">
                            <img
                                src={imagePreview}
                                alt="Uploaded Preview"
                                className="img-fluid rounded mb-2"
                                style={{ border: '1px solid #ddd', maxHeight: '300px' }}
                            />
                        </div>
                    )}

                    {prediction || recommendations.length > 0 || error ? (
                        <div className="results shadow p-4 rounded bg-light text-center mt-4 w-100">
                            {prediction && (
                                <div className="alert alert-success" role="alert">
                                    <h4 className="alert-heading">Predicted As:</h4>
                                    <p className="prediction_result fs-5">{prediction}</p>
                                </div>
                            )}

                            {recommendations.length > 0 && (
                                <div className="recommendations mt-3">
                                    <h3>Treatment Recommendations:</h3>
                                    <table className="table table-striped table-bordered mt-2">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Pack</th>
                                                <th>Ingredients</th>
                                                <th>How to do</th>
                                                <th>User Feedback</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recommendations.map((rec, index) => (
                                                <tr key={index} style={{ display: index === currentIndex ? 'table-row' : 'none' }}>
                                                    <td>{rec['Treatment Pack']}</td>
                                                    <td>{rec['Ingredients']}</td>
                                                    <td>{rec['How to do']}</td>
                                                    <td>
                                                        {rec['UserFeedback'] && rec['UserFeedback'].length > 0 ? (
                                                            <ul>
                                                                {rec['UserFeedback'].map((feedback, idx) => (
                                                                    <li key={idx} style={{ textAlign: 'justify' }}>{feedback.feedback}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            'No feedback available'
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div class="button-container">
                                        <button class="table-button" onClick={handleNext}>Show Alternative</button>
                                        <button class="table-button" onClick={() => setShowFeedbackModal(true)}>Give Feedback</button>
                                        <button class="table-button" onClick={handleSaveResults}>Save Results</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : null}

                    {/* Feedback Modal */}
                    <Modal show={showFeedbackModal} onHide={() => setShowFeedbackModal(false)} centered className={showFeedbackModal ? "show fade" : ""}>
                        <Modal.Header closeButton>
                            <Modal.Title>Provide Feedback</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <textarea
                                className="form-control"
                                value={feedbacks[currentIndex] || ''}
                                onChange={handleFeedbackChange}
                                placeholder="Your feedback..."
                                rows="3"
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-secondary" onClick={() => setShowFeedbackModal(false)}>Close</button>
                            <button className="btn btn-primary" onClick={handleFeedback}>Save Feedback</button>
                        </Modal.Footer>
                    </Modal>

                    {message && (
                        <div className={`alert alert-${messageType} alert-dismissible`} role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotoUpload;
