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
    const [photo, setPhoto] = useState(null); // State for selected photo

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

                setUser(response.data);
                setEditedUser({
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                });
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to fetch user data');
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        setEditedUser({
            ...editedUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No JWT token found');
                return;
            }

            const response = await axios.put(
                "http://localhost:3000/api/users/profile",
                editedUser,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUser(response.data);
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating user data:', err);
            setError('Failed to update user data');
        }
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handlePhotoUpload = async () => {
        if (!photo) {
            setError("No photo selected");
            return;
        }

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No JWT token found');
                return;
            }

            const formData = new FormData();
            formData.append("profilePhoto", photo);

            const response = await axios.put(
                "http://localhost:3000/api/users/profile-photo",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setUser({ ...user, profilePhoto: response.data.profilePhoto });
            setError(null);
        } catch (err) {
            console.error('Error uploading photo:', err);
            setError('Failed to upload photo');
        }
    };

    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className='profile-tittle'>
                <h1>My Profile</h1>
                <div className="account-settings">
                    <div className="profile-container">
                        <div className="profile-photo">
                            <div className="photo-circle">
                                {user.profilePhoto ? (
                                    <img src={user.profilePhoto} alt="Profile" className="photo-circle-img" />
                                ) : (
                                    <button className="add-photo-btn">+</button>
                                )}
                            </div>
                            <input type="file" accept="image/*" onChange={handlePhotoChange} />
                            <button className="photo-label" onClick={handlePhotoUpload}>Upload Photo</button>
                        </div>
                        <div className="personal-info">
                            <h3>Personal Information</h3>
                            {error && <p className="error">{error}</p>}
                            <div className='name-email'>
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
