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

    // Retrieve and validate the stored profile photo URL
    const storedProfilePhoto = localStorage.getItem("profilePhoto");
    if (storedProfilePhoto) {
      const img = new Image();
      img.src = storedProfilePhoto;
      img.onload = () => setUserProfilePhoto(storedProfilePhoto); // Valid image
      img.onerror = () => setUserProfilePhoto(null); // Invalid image
    }
  }, []);  // Empty array ensures this effect runs only once on mount

  // Listen for changes in localStorage to update the profile photo dynamically
  useEffect(() => {
    const handleStorageChange = () => {
      const storedProfilePhoto = localStorage.getItem("profilePhoto");
      if (storedProfilePhoto) {
        const img = new Image();
        img.src = storedProfilePhoto;
        img.onload = () => setUserProfilePhoto(storedProfilePhoto);
        img.onerror = () => setUserProfilePhoto(null);
      } else {
        setUserProfilePhoto(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("hasAgreed");
    // Profile photo is still stored, so it persists for the next login
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
