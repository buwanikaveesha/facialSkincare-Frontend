import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>FacialCure</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/features">Features</Link>
        <Link to="/howToDo">How it Works</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <button className="login_home_btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default Navbar;