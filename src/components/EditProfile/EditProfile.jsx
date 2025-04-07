import React, { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import toast, { Toaster } from "react-hot-toast";
import "./EditProfile.css";

const EditProfile = ({ profileDetail, setIsEditing }) => {
  const [firstName, setFirstName] = useState(profileDetail?.firstName);
  const [lastName, setLastName] = useState(profileDetail?.lastName);
  const [email, setEmail] = useState(profileDetail?.email);
  const { token } = useContext(AuthContext);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
      const updatedData = { firstName, lastName, email };

      await apiRequest.put(`/user/update-profile/${userId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Profile updated successfully");

      profileDetail.firstName = firstName;
      profileDetail.lastName = lastName;
      profileDetail.email = email;
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    }
  };

  return (
    <>
      <Toaster />
      {profileDetail && (
        <div className="edit-profile-card">
          <div className="edit-profile-container">
            <img
              src={profileDetail.profile_img}
              className="edit-profile-image"
            />
            <div className="edit-profile-personal-info">
              <form onSubmit={handleUpdateProfile}>
                <div className="edit-profile-row">
                  <label>First Name: </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="edit-profile-row">
                  <label>Last Name: </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="edit-profile-row">
                  <label>Email: </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="edit-profile-buttons">
                  <button type="submit">Update Profile</button>
                  <button type="button" onClick={() => setIsEditing(false)}>
                    Back to Profile
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
