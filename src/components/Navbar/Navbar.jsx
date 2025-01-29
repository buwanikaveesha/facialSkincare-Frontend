import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isUserLoggedIn }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfilePhoto, setUserProfilePhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [isUserLoggedIn]); // Depend on isUserLoggedIn to re-check auth status

  useEffect(() => {
    if (isLoggedIn) {
      const storedProfilePhoto = localStorage.getItem("profilePhoto");
      if (storedProfilePhoto) {
        const img = new Image();
        img.src = storedProfilePhoto;
        img.onload = () => setUserProfilePhoto(storedProfilePhoto);
        img.onerror = () => setUserProfilePhoto(null);
      }
    } else {
      setUserProfilePhoto(null); // Reset profile photo when logged out
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasAgreed");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <h1>FacialCure</h1>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/howToDo">How it Works</Link>
        <Link to="/faq">FAQ</Link>
      </div>

      <div className="navbar-actions">
        {isLoggedIn ? (
          <>
            <Link to="/accountSettings">
              <div className="profile-icon">
                {userProfilePhoto ? (
                  <img
                    src={userProfilePhoto}
                    alt="Profile"
                    className="profile-icon-img"
                  />
                ) : (
                  <FaUserCircle className="user-icon" />
                )}
              </div>
            </Link>
            <button className="login_home_btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="login_home_btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
