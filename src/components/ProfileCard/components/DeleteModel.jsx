import React, { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../../lib/apiRequest";
import { jwtDecode } from "jwt-decode";
import "./DeleteModel.css";

const DeleteModel = () => {
  const { token, removeFromSession } = useContext(AuthContext);
  const navigate = useNavigate();

  const deleteProfile = async () => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      await apiRequest.delete(`/user/delete-profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      removeFromSession();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="delete-model-delete-btn"
        onClick={() => {
          document.getElementById("deleteProfileModal").style.display = "flex";
        }}
      >
        Delete Profile
      </button>

      <div id="deleteProfileModal" className="delete-model-overlay">
        <div className="delete-modal-container">
          <div className="delete-modal-header">
            <h1 className="delete-modal-title">Delete Profile</h1>
          </div>
          <div className="delete-modal-body">
            Are you sure you want to delete this profile?
          </div>
          <div className="delete-modal-footer">
            <button
              className="delete-modal-cancel-btn"
              onClick={() => {
                document.getElementById("deleteProfileModal").style.display =
                  "none";
              }}
            >
              Close
            </button>
            <button className="delete-model-delete-btn " onClick={deleteProfile}>
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModel;
