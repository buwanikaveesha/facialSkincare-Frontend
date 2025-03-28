import React from "react";
import Home from "../Home/Home";
import HowToDo from "../HowToDo/HowToDo";
import Features from "../Features/Features";
import "./MainPage.css";
import FAQ from "../FAQ/FAQ"
import ContactUs from "../ContactUs/ContactUs";

const MainPage = () => {
    return (
        <div className="main_page-container">
            <Home />
            <Features />
            <HowToDo />
            <FAQ />
            <ContactUs />
        </div>
    );
};

export default MainPage;
