import React, { useContext, useState } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import HealthyFace from "../../assets/images/face2.png";
import apiRequest from "../../lib/apiRequest";
import AuthContext from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Analysis.css";

const Analysis = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedbacks, setFeedbacks] = useState({});
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    if (!token) {
      toast.error("Please log in first to upload an image.");
      return;
    }

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    setPrediction("");
    setRecommendations([]);
    setCurrentIndex(0);

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const response = await axios.post(
        import.meta.env.VITE_AI_SERVER_DOMAIN,
        formDataUpload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      }

      setPrediction(response.data.predicted_class.replace(/_/g, " "));
      setFeedbacks({});

      const feedbackPromises = response.data.recommendations.map(
        async (rec) => {
          const treatmentPack = rec["Treatment Pack"];
          try {
            const feedbackResponse = await apiRequest.get(
              `/feedback/get-user-feedback/${encodeURIComponent(treatmentPack)}`
            );
            console.log("Get user feedback" + feedbackResponse.data.feedbacks);
            return {
              ...rec,
              UserFeedback: feedbackResponse.data.feedbacks || [],
            };
          } catch (error) {
            console.error("Error fetching feedback:", error);
            return { ...rec, UserFeedback: [] };
          }
        }
      );

      const fetchedRecommendations = await Promise.all(feedbackPromises);
      setRecommendations(fetchedRecommendations);
    } catch (err) {
      toast.error("An error occurred while processing the image.");
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
      const response = await apiRequest.post(
        "/feedback/add-feedback",
        {
          feedback: feedbacks[currentIndex] || "",
          prediction: prediction,
          treatmentPack: recommendations[currentIndex]["Treatment Pack"],
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        toast.success("Feedback saved successfully!");
        setShowFeedbackModal(false);
      }
    } catch (error) {
      console.error("Error saving feedback:", error);
      toast.error("An error occurred while saving feedback.");
    }
  };

  // const handleSaveResults = async () => {
  //   if (!token) {
  //     toast.error("Please log in to save results.");
  //     return;
  //   }

  //   const formattedRecommendations = recommendations.map((rec) => ({
  //     treatmentPack: rec["Treatment Pack"],
  //     ingredients: rec["Ingredients"],
  //     howToDo: rec["How to do"],
  //   }));

  //   try {
  //     const decodedToken = jwtDecode(token);
  //     let userEmail = decodedToken.email;

  //     const resultsToSave = {
  //       userEmail: userEmail,
  //       prediction: prediction,
  //       recommendations: formattedRecommendations,
  //     };

  //     const response = await apiRequest.post(
  //       "/result/save-result",
  //       resultsToSave,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     if (response.data && response.data.success) {
  //       toast.success("Results saved successfully!");
  //     } else {
  //       toast.error("Failed to save results.");
  //     }
  //   } catch (error) {
  //     console.error("Error saving results:", error);
  //     toast.error("An error occurred while saving results.");
  //   }
  // };

  const handleSaveResults = async () => {
    if (!token) {
      toast.error("Please log in to save results.");
      return;
    }
  
    if (!prediction || recommendations.length === 0) {
      toast.error("No prediction or recommendations to save.");
      return;
    }
  
    const selectedRecommendation = recommendations[currentIndex];
  
    const formattedRecommendation = {
      treatmentPack: selectedRecommendation["Treatment Pack"],
      ingredients: selectedRecommendation["Ingredients"],
      howToDo: selectedRecommendation["How to do"],
    };
  
    try {
      const decodedToken = jwtDecode(token);
      let userEmail = decodedToken.email;
  
      const resultToSave = {
        userEmail: userEmail,
        prediction: prediction,
        recommendations: [formattedRecommendation],
      };
  
      const response = await apiRequest.post(
        "/result/save-result",
        resultToSave,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (response.data && response.data.success) {
        toast.success("Selected result saved successfully!");
      } else {
        toast.error("Failed to save the result.");
      }
    } catch (error) {
      console.error("Error saving results:", error);
      toast.error("An error occurred while saving results.");
    }
  };
  

  return (
    <>
      <Toaster />
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
              Add a photo to make a scan. You can upload a photo from your
              device.
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
              <button
                className="upload-button"
                type="button"
                onClick={handleUpload}
              >
                Analyze
              </button>
            )}

            {imagePreview && (
              <div className="text-center mb-3">
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  className="img-fluid rounded mb-2"
                  style={{ border: "1px solid #ddd", maxHeight: "300px" }}
                />
              </div>
            )}

            {prediction || recommendations.length > 0 ? (
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
                          <tr
                            key={index}
                            style={{
                              display:
                                index === currentIndex ? "table-row" : "none",
                            }}
                          >
                            <td>{rec["Treatment Pack"]}</td>
                            <td>{rec["Ingredients"]}</td>
                            <td>{rec["How to do"]}</td>
                            <td>
                              {rec["UserFeedback"] &&
                              rec["UserFeedback"].length > 0 ? (
                                <ul>
                                  {rec["UserFeedback"].map(
                                    (feedback, index) => (
                                      <li
                                        key={index}
                                        style={{ textAlign: "justify" }}
                                      >
                                        {feedback.feedback}
                                      </li>
                                    )
                                  )}
                                </ul>
                              ) : (
                                "No feedback available"
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="button-container">
                      <button className="upload-button" onClick={handleNext}>
                        Show Alternative
                      </button>
                      <button
                        className="upload-button"
                        onClick={() => setShowFeedbackModal(true)}
                      >
                        Give Feedback
                      </button>
                      <button
                        className="upload-button"
                        onClick={handleSaveResults}
                      >
                        Save Results
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Feedback Modal */}
            <Modal
              show={showFeedbackModal}
              onHide={() => setShowFeedbackModal(false)}
              centered
              className={showFeedbackModal ? "show fade" : ""}
            >
              <Modal.Header closeButton>
                <Modal.Title>Provide Feedback</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <textarea
                  className="form-control"
                  value={feedbacks[currentIndex] || ""}
                  onChange={handleFeedbackChange}
                  placeholder="Your feedback..."
                  rows="3"
                />
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowFeedbackModal(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleFeedback}>
                  Save Feedback
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analysis;
