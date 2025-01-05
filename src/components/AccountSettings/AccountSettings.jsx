import React, { useEffect, useState } from 'react';
import './AccountSettings.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';

const AccountSettings = () => {
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", profilePhoto: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ firstName: "", lastName: "", email: "" });
    const [error, setError] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No JWT token found');
                }

                const response = await axios.get(`${apiUrl}/api/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const userData = response.data;
                setUser(userData);
                setEditedUser({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                });
                setPhotoPreview(userData.profilePhoto);
                setError(null);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to fetch user data. Please try again.');
            }
        };

        fetchUserData();
    }, [apiUrl]);

    const handlePhotoChange = (e) => {
        const selectedPhoto = e.target.files[0];
        if (selectedPhoto) {
            setPhoto(selectedPhoto);
            setPhotoPreview(URL.createObjectURL(selectedPhoto));
        }
    };

    const handlePhotoUpload = async () => {
        if (!photo) {
            setError("Please select a photo to upload.");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('JWT token is missing');
            }

            const formData = new FormData();
            formData.append('profilePhoto', photo);

            const response = await axios.put(`${apiUrl}/api/users/profile-photo`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUser((prev) => ({ ...prev, profilePhoto: response.data.profilePhoto }));
            setPhotoPreview(response.data.profilePhoto);
            setPhoto(null);
            setError(null);
            alert('Profile photo updated successfully.');
        } catch (err) {
            console.error('Error uploading photo:', err);
            setError(err.response?.data?.message || 'Failed to upload photo.');
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('JWT token is missing');
            }

            const response = await axios.put(`${apiUrl}/api/users/profile`, editedUser, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(response.data);
            setIsEditing(false);
            setError(null);
            alert('Profile updated successfully.');
        } catch (err) {
            console.error('Error updating user data:', err);
            setError(err.response?.data?.message || 'Failed to update profile.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className="profile-title">
                <h1>My Profile</h1>
                <div className="account-settings">
                    <div className="profile-container">
                        <div className="profile-photo">
                            <div className="photo-circle">
                                {(photoPreview || user.profilePhoto) ? (
                                    <img
                                        src={`${apiUrl}${user.profilePhoto}`}
                                        alt="Profile"
                                        className="photo-circle-img"
                                        onClick={() => document.getElementById('file-input').click()}
                                    />

                                ) : (
                                    <button
                                        className="add-photo-btn"
                                        onClick={() => document.getElementById('file-input').click()}
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handlePhotoChange}
                            />
                            <button className="upload-btn" onClick={handlePhotoUpload}>
                                {photoPreview || user.profilePhoto ? 'Change Photo' : 'Upload Photo'}
                            </button>
                        </div>
                        <div className="personal-info">
                            <h3>Personal Information</h3>
                            {error && <p className="error">{error}</p>}
                            <div className="name-email">
                                {isEditing ? (
                                    <>
                                        <p>
                                            <strong>First Name:</strong>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={editedUser.firstName}
                                                onChange={handleInputChange}
                                            />
                                        </p>
                                        <p>
                                            <strong>Last Name:</strong>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={editedUser.lastName}
                                                onChange={handleInputChange}
                                            />
                                        </p>
                                        <p>
                                            <strong>Email:</strong>
                                            <input
                                                type="email"
                                                name="email"
                                                value={editedUser.email}
                                                onChange={handleInputChange}
                                            />
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                    </>
                                )}
                            </div>
                            {isEditing ? (
                                <button className="save-btn" onClick={handleSaveClick}>Save</button>
                            ) : (
                                <button className="edit-btn" onClick={handleEditClick}>Edit</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
