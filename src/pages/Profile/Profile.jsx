import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { jwtDecode } from "jwt-decode";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { IoArrowBack } from "react-icons/io5";
import "./Profile.css";

const Profile = () => {
  const [profileDetail, setProfileDetail] = useState(null);
  const { token } = useContext(AuthContext);

  const GetProfile = async () => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;
      const response = await apiRequest.get(`/user/get-profile/${userId}`);
      setProfileDetail(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      GetProfile();
    }
  }, [token]);

  return (
    <div>
      <button className="back-icon" onClick={() => navigate("/analysis")}>
        <IoArrowBack size={24} /> Back
      </button>
      <div className="profile-page-container">
        <h1 className="profile-page-title">My Profile</h1>
        <div className="profile-page-card">
          <ProfileCard profileDetail={profileDetail} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
