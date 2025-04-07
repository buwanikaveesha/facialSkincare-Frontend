import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { jwtDecode } from "jwt-decode";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./History.css";

const History = () => {
  const [error, setError] = useState(null);
  const [savedResults, setSavedResults] = useState([]);
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);

  const fetchUserEmail = async () => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const response = await apiRequest.get(`/user/get-profile/${userId}`);
      setUserEmail(response.data.email);
    } catch (error) {
      console.error("Error fetching user email:", error);
      setError("Failed to retrieve user information.");
    }
  };

  const fetchSavedResults = async () => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const userResponse = await apiRequest.get(`/user/get-profile/${userId}`);
      const userEmail = userResponse.data.email;
      const response = await apiRequest.get(
        `/result/get-user-result/${userEmail}`
      );

      setSavedResults(response.data.data);
    } catch (error) {
      console.error(
        "Error fetching saved results:",
        error.response?.data || error.message
      );
      setError("Failed to fetch saved results.");
    }
  };

  useEffect(() => {
    if (userEmail) {
      fetchSavedResults();
    }
  }, [userEmail]);

  useEffect(() => {
    const getUserData = async () => {
      await fetchUserEmail();
    };
    getUserData();
  }, []);

  return (
    <div className="history-container">
      <button className="back-icon" onClick={() => navigate("/profile/:id")}>
        <IoArrowBack size={24} /> Back
      </button>
      <div className="history-content">
        <h2 className="history_title">Results</h2>
        {error && <p className="error-message">{error}</p>}
        {savedResults.length === 0 ? (
          <p className="no-results-message">No results available.</p>
        ) : (
          <div className="results-grid">
            {savedResults.map((result, index) => (
              <div key={index} className="result-card">
                <h3>Prediction: {result.prediction}</h3>
                {result.recommendations.map((rec, idx) => (
                  <div key={idx} className="recommendation-item">
                    <h4>Treatment Pack:</h4>
                    <p>{rec.treatmentPack}</p>

                    <h4>Ingredients:</h4>
                    <p>{rec.ingredients}</p>

                    <h4>How To Do:</h4>
                    <p>{rec.howToDo}</p>

                    <div className="user-feedback">
                      {/* <h4>User Feedback:</h4>
                      <ul>
                        {rec.userFeedback.map((feedback, fIdx) => (
                          <li key={fIdx}>{feedback}</li>
                        ))}
                      </ul> */}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;