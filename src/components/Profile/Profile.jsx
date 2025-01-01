import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";

const Profile = () => {
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", facePacksTried: 0, feedbackCount: 0, progress: 0 });
    const [error, setError] = useState(null);
    const [userProfileImage, setUserProfileImage] = useState(null);

    // Handle image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setUserProfileImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No JWT token found');
                    return;
                }

                const response = await axios.get("http://localhost:3000/api/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response.data);

                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to fetch user data');
            }
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="profile-container">
                <h1>My Profile</h1>
                {error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="profile-card">
                        {/* Profile Image */}
                        <div className="profile-image-container">
                            <input type="file" accept="image/*" onChange={handleImageUpload} className="image-upload" />
                            <img
                                src={userProfileImage || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className="profile-image"
                            />
                        </div>
                        <div className="user-info">
                            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>

                        {/* User Stats */}
                        <div className="user-stats">
                            <p>Face Packs Tried: {user.facePacksTried}</p>
                            <p>Feedback Provided: {user.feedbackCount}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="progress-bar">
                            <div className="progress" style={{ width: `${user.progress}%` }}></div>
                        </div>
                    </div>
                )}
                <button className="edit-button">Edit Profile</button>
            </div>
        </div>
    );
};

export default Profile;
