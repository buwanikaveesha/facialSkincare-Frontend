import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Features from "./components/Features/Features";
import Home from "./components/Home/Home";
import HowToDo from "./components/HowToDo/HowToDo";
import Instructions from "./components/Instructions/Instructions";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Signup";
import Overlay from "./components/Overlay/Overlay";
import StartAnalysis from "./components/StartAnalysis/StartAnalysis";
import PhotoUpload from "./components/PhotoUpload/PhotoUpload";

const App = () => {
  const user = localStorage.getItem("token");


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/features" element={<Features />} />
        <Route path="/howToDo" element={<HowToDo />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/startAnalysis" element={<StartAnalysis />} />
        <Route path="/photoUpload" element={<PhotoUpload />} />
      </Routes>
    </>
  );
};

export default App;
