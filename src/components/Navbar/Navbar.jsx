import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isUserLoggedIn, setIsUserLoggedIn }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfilePhoto, setUserProfilePhoto] = useState(null);
  const navigate = useNavigate();

  // Check login status when component mounts and when `isUserLoggedIn` updates
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus(); // Run on mount

    // Listen for localStorage changes (useful for multi-tab scenarios)
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  // Fetch profile photo when user is logged in
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
      setUserProfilePhoto(null);
    }
  }, [isLoggedIn]);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasAgreed");
    setIsLoggedIn(false);
    setIsUserLoggedIn(false); // Update parent state
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
