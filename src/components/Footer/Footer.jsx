import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* <div className="footer-links">
          <Link to="/home">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/howToDo">How it Works</Link>
          <Link to="/faq">FAQ</Link>
        </div> */}
        <p className="footer-text">
          &copy; 2025 FacialCure. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
