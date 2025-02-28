import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../Sidebar/Sidebar";
import "./History.css";

const History = () => {
    const [error, setError] = useState(null);
    const [savedResults, setSavedResults] = useState([]);
    const [userEmail, setUserEmail] = useState(null);

    // Function to fetch logged-in user's email
    const fetchUserEmail = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('User not authenticated.');
                return;
            }

            const response = await axios.get(`${import.meta.env.REACT_APP_API_URL || 'http://localhost:3000'}/api/users/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUserEmail(response.data.email);
        } catch (error) {
            console.error('Error fetching user email:', error);
            setError('Failed to retrieve user information.');
        }
    };

    // Function to fetch saved results
    const fetchSavedResults = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("User not authenticated.");
                return;
            }
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };

            // Fetch user profile to get email
            const userResponse = await axios.get("http://localhost:3000/api/users/profile", { headers });
            const userEmail = userResponse.data.email;
            
            // Fetch the saved results based on the userEmail
            const response = await axios.get(
                `http://localhost:3000/api/results/${userEmail}`,
                { headers }
            );

            setSavedResults(response.data.data);
        } catch (error) {
            console.error("Error fetching saved results:", error.response?.data || error.message);
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

    useEffect(() => {
        if (userEmail) {
            fetchSavedResults();
        }
    }, [userEmail]);

    return (
        <div className="history-container">
            <Sidebar />
            <h2 className='history_title'>Results</h2>
            {error && <p>{error}</p>}
            {savedResults.length === 0 ? (
                <p>No results available.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Prediction</th>
                            <th>Recommendations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {savedResults.map((result, index) => (
                            <tr key={index}>
                                <td>{result.prediction}</td>
                                <td>
                                    {result.recommendations.map((rec, idx) => (
                                        <div key={idx} className="recommendation-item">
                                            <h4>Treatment Pack:</h4>
                                            <p>{rec.treatmentPack}</p>

                                            <h4>Ingredients:</h4>
                                            <p>{rec.ingredients}</p>

                                            <h4>How To Do:</h4>
                                            <p>{rec.howToDo}</p>

                                            <div className="user-feedback">
                                                <h4>User Feedback:</h4>
                                                <ul>
                                                    {rec.userFeedback.map((feedback, fIdx) => (
                                                        <li key={fIdx}>{feedback}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default History;
