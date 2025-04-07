import React from "react";
import "./LoginDialog.css";
import { FaTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const LoginDialog = ({ onClose }) => {
  return (
    <div className="login-dialog-overlay">
      <div className="login-dialog-container">
        <FaTimesCircle onClick={onClose} className="login-dialog-close-icon" />
        <h1 className="login-dialog-title">Join with us</h1>
        <p className="login-dialog-description">Sign in to continue your journey with us!</p>
        <Link to="/login" className="login-dialog-button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default LoginDialog;
