import React, { useContext, useEffect, useState } from "react";
import { FaUserCircle, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { jwtDecode } from "jwt-decode";
import "./Navbar.css";

const Navbar = () => {
  const [profileDetail, setProfileDetail] = useState();
  const [menuOpen, setMenuOpen] = useState(false);

  const { token, removeFromSession } = useContext(AuthContext);

  useEffect(() => {
    GetProfile();
  }, [token]);

  const GetProfile = async () => {
    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken._id;

      const response = await apiRequest.get(`/user/get-profile/${userId}`);
      const data = response.data;
      setProfileDetail(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    removeFromSession();
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className={`navbar ${menuOpen ? "show-menu" : ""}`}>
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <h1 className="navbar-title">FacialCure🌿</h1>
        </Link>
        <div className="hamburger" onClick={toggleMenu}>
          <FaBars />
        </div>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/howToDo">How it Works</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>

      <div className="navbar-actions">
        {token ? (
          <>
            <Link to={`/profile/${profileDetail?._id}`}>
              <div className="profile-icon">
                {profileDetail?.profile_img ? (
                  <img
                    src={profileDetail?.profile_img}
                    alt="Profile"
                    className="profile-icon-img"
                  />
                ) : (
                  <FaUserCircle className="user-icon" />
                )}
              </div>
            </Link>

            <span className="logout-text-link" onClick={handleLogout}>
              Logout
            </span>
          </>
        ) : (
          <Link to="/login" className="login-text-link">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
