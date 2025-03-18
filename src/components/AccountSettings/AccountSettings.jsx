import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import "./AccountSettings.css";
import { FaPen, FaTrash } from "react-icons/fa";

const AccountSettings = () => {
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", profilePhoto: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [error, setError] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) throw new Error("No JWT token found");

                const response = await axios.get(`${apiUrl}/api/users/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data);
                setEditedUser(response.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("Failed to fetch user data.");
            }
        };

        fetchUserData();
    }, [apiUrl]);

    // const handlePhotoChange = async (e) => {
    //     const selectedPhoto = e.target.files[0];
    //     if (!selectedPhoto) return;

    //     setPhotoPreview(URL.createObjectURL(selectedPhoto));

    //     try {
    //         const token = localStorage.getItem("token");
    //         if (!token) throw new Error("JWT token is missing");

    //         const formData = new FormData();
    //         formData.append("profilePhoto", selectedPhoto);

    //         const response = await axios.put(`${apiUrl}/api/users/profile-photo`, formData, {
    //             headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    //         });

    //         setUser((prev) => ({ ...prev, profilePhoto: response.data.profilePhoto }));
    //         localStorage.setItem("profilePhoto", response.data.profilePhoto);
    //         alert("Profile photo updated successfully.");
    //     } catch (err) {
    //         console.error("Error uploading photo:", err);
    //         setError("Failed to upload photo.");
    //     }
    // };

    // const handleDeletePhoto = async () => {
    //     try {
    //         const token = localStorage.getItem("token");
    //         if (!token) throw new Error("JWT token is missing");

    //         await axios.put(`${apiUrl}/api/users/delete-profile-photo`, {}, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         });

    //         setUser((prev) => ({ ...prev, profilePhoto: "" }));
    //         setPhotoPreview(null);
    //         localStorage.removeItem("profilePhoto");
    //         alert("Profile photo deleted successfully.");
    //     } catch (err) {
    //         console.error("Error deleting photo:", err);
    //         setError("Failed to delete photo.");
    //     }
    // };

    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("JWT token is missing");

            const response = await axios.put(`${apiUrl}/api/users/profile`, editedUser, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setUser(response.data);
            setEditedUser(response.data);
            setIsEditing(false);
            alert("Profile updated successfully.");
        } catch (err) {
            console.error("Error updating user data:", err);
            setError("Failed to update profile.");
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="profile-title">
                <h1 className="my_profile">My Profile</h1>
                <div className="account-settings">
                    <div className="profile-container">
                        <div className="profile-photo">
                            {/* <div className="photo-circle">
                                {photoPreview || user.profilePhoto ? (
                                    <img src={user.profilePhoto || photoPreview} alt="Profile" className="photo-circle-img" />
                                ) : (
                                    <button className="add-photo-btn" onClick={() => document.getElementById("file-input").click()}>+</button>
                                )}
                            </div> */}
                            {/* <div className="photo-buttons">
                                <button className="update-photo" onClick={() => document.getElementById("file-input").click()}>
                                    <FaPen /> Edit Photo
                                </button>
                                <button className="delete-photo" onClick={handleDeletePhoto}>
                                    <FaTrash /> Delete Photo
                                </button>
                            </div> */}
                            {/* <input id="file-input" type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoChange} /> */}
                        </div>

                        <div className="personal-info">
                            <h3>Personal Information</h3>
                            {error && <p className="error">{error}</p>}
                            <div className="name-email">
                                {isEditing ? (
                                    <>
                                        <p><strong>First Name:</strong> <input type="text" name="firstName" value={editedUser.firstName} onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })} /></p>
                                        <p><strong>Last Name:</strong> <input type="text" name="lastName" value={editedUser.lastName} onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })} /></p>
                                        <p><strong>Email:</strong> <input type="email" name="email" value={editedUser.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} /></p>
                                    </>
                                ) : (
                                    <>
                                        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                    </>
                                )}
                            </div>
                            {isEditing ? <button className="save-btn" onClick={handleSaveClick}>Save</button> : <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
