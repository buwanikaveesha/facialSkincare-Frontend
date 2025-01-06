import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfilePhoto, setUserProfilePhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    // Retrieve the stored profile photo URL from localStorage
    const storedProfilePhoto = localStorage.getItem("profilePhoto");
    if (storedProfilePhoto) {
      setUserProfilePhoto(storedProfilePhoto); // Set it to state
    }
}, []);

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
        // Check if the profilePhoto key is updated in localStorage
        const storedProfilePhoto = localStorage.getItem("profilePhoto");
        if (storedProfilePhoto) {
            setUserProfilePhoto(storedProfilePhoto); // Update state when photo changes
        }
    };

    // Listen for changes in localStorage
    window.addEventListener("storage", handleStorageChange);

    return () => {
        window.removeEventListener("storage", handleStorageChange);
    };
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasAgreed");
    localStorage.removeItem("profilePhoto");
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
                  <FaUserCircle className="profile-icon" />
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
