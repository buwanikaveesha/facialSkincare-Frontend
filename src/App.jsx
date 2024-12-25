import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Features from "./components/Features/Features";
import Home from "./components/Home/Home";
import HowToDo from "./components/HowToDo/HowToDo";
import Instructions from "./components/Instructions/Instructions";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import PhotoUpload from "./components/PhotoUpload/PhotoUpload";
import Signup from "./components/Signup/Signup";
import Overlay from "./components/Overlay/Overlay";

const App = () => {
  const user = localStorage.getItem("token");

  //manage overlay visibility
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  // Functions to toggle overlay visibility
  const handleOpenOverlay = () => setOverlayVisible(true);
  const handleCloseOverlay = () => setOverlayVisible(false);

  return (
    <>

      {isOverlayVisible && <Overlay onCloseOverlay={handleCloseOverlay} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/features" element={<Features />} />
        <Route path="/howToDo" element={<HowToDo />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route
          path="/photoUpload"
          element={<PhotoUpload onStartAnalysis={handleOpenOverlay} />} // Pass correct prop
        />
      </Routes>
    </>
  );
};

export default App;
