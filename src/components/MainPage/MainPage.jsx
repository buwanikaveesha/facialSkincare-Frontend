import React from "react";
import Home from "../Home/Home";
import HowToDo from "../HowToDo/HowToDo";
import Features from "../Features/Features";
import "./MainPage.css";
import FAQ from "../FAQ/FAQ"

const MainPage = () => {
    return (
        <div className="main_page-container">
            <Home />
            <Features />
            <HowToDo />
            <FAQ />
        </div>
    );
};

export default MainPage;
