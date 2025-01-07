import React from "react";
import Home from "../Home/Home";
import HowToDo from "../HowToDo/HowToDo";
import Features from "../Features/Features";
import "./MainPage.css";

const MainPage = () => {
    return (
        <div className="main_page-container">
            <Home />
            <HowToDo />
            <Features />
        </div>
    );
};

export default MainPage;
