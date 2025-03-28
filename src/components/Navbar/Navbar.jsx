import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = ({ isUserLoggedIn, setIsUserLoggedIn }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfilePhoto, setUserProfilePhoto] = useState(null);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    return () => window.removeEventListener("storage", checkLoginStatus);
  }, []);

  useEffect(() => {
    const fetchUserProfilePhoto = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get(`${apiUrl}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserProfilePhoto(response.data.profile_img || null);
      } catch (error) {
        console.error("Error fetching user profile photo:", error);
        setUserProfilePhoto(null);
      }
    };

    if (isLoggedIn) {
      fetchUserProfilePhoto();
    } else {
      setUserProfilePhoto(null);
    }
  }, [isLoggedIn, apiUrl]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsUserLoggedIn(false);
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
        <Link to="/contactUs">Contact Us</Link>
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
