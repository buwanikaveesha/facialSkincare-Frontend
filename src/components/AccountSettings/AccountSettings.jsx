import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import './AccountSettings.css';
import { FaPen, FaTrash } from 'react-icons/fa';

const AccountSettings = () => {
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", profilePhoto: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({ firstName: "", lastName: "", email: "" });
    const [error, setError] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [showOptions, setShowOptions] = useState(false);

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

    const handlePhotoChange = async (e) => {
        const selectedPhoto = e.target.files[0];
        if (selectedPhoto) {
            setPhoto(selectedPhoto);
            const previewUrl = URL.createObjectURL(selectedPhoto);
            setPhotoPreview(previewUrl);
    
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('JWT token is missing');
                }
    
                const formData = new FormData();
                formData.append('profilePhoto', selectedPhoto);
    
                const response = await axios.put(`${apiUrl}/api/users/profile-photo`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
    
                // Update user profile with new photo
                setUser((prev) => ({ ...prev, profilePhoto: response.data.profilePhoto }));
    
                // Save the profile photo to localStorage to sync with Navbar
                const updatedProfilePhoto = `${apiUrl}${response.data.profilePhoto}`;
                localStorage.setItem('profilePhoto', updatedProfilePhoto);
    
                // Clear any other states
                setPhoto(null);
                setError(null);
                alert('Profile photo updated successfully.');
            } catch (err) {
                console.error('Error uploading photo:', err);
                setError(err.response?.data?.message || 'Failed to upload photo.');
            }
        }
    };

    const handleDeletePhoto = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('JWT token is missing');
            }
    
            await axios.put(`${apiUrl}/api/users/delete-profile-photo`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove photo from user state and reset the profile photo
            setUser((prev) => ({ ...prev, profilePhoto: "" }));
            setPhotoPreview(null);
            localStorage.removeItem('profilePhoto');

            setShowOptions(false);
            alert('Profile photo deleted successfully.');
        } catch (err) {
            console.error('Error deleting photo:', err);
            setError(err.response?.data?.message || 'Failed to delete photo.');
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
            {/* <Navbar /> */}
            <Sidebar />
            <div className="profile-title">
                <h1>My Profile</h1>
                <div className="account-settings">
                    <div className="profile-container">
                        <div className="profile-photo">
                            <div className="photo-circle">
                                {photoPreview || user.profilePhoto ? (
                                    <img
                                        src={`${apiUrl}${user.profilePhoto || photoPreview}`}
                                        alt="Profile"
                                        className="photo-circle-img"
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
                            <div className="photo-buttons">
                                <button className="update-photo" onClick={() => document.getElementById('file-input').click()}>
                                    <FaPen /> Edit Photo
                                </button>
                                <button className="delete-photo" onClick={handleDeletePhoto}>
                                    <FaTrash /> Delete Photo
                                </button>
                            </div>
                            <input
                                id="file-input"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handlePhotoChange}
                            />
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
