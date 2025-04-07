import React, { useState } from "react";
import EditProfile from "../EditProfile/EditProfile";
import { Link } from "react-router-dom";
import DeleteModel from "./components/DeleteModel";
import "./ProfileCard.css";

const ProfileCard = ({ profileDetail }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {!isEditing ? (
        <div className="profile-card">
          <div className="profile-card-container">
            {profileDetail && (
              <>
                <div className="">
                  <img src={profileDetail.profile_img} className="profile-card-profile-image" />
                  <div className="profile-card-personal-info">
                    <h3>
                      {profileDetail.firstName} {profileDetail.lastName}
                    </h3>
                    <p>{profileDetail.email}</p>
                  </div>
                </div>

                <div className="profile-card-buttons">
                  <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                  <Link to="/history">
                    <button style={{ backgroundColor: "#FFA725" }}>History</button>
                  </Link>
                  <DeleteModel/>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <EditProfile profileDetail={profileDetail} setIsEditing={setIsEditing} />
      )}
    </div>
  );
};

export default ProfileCard;
