import React from "react";
import { Route, Routes } from "react-router-dom";
import Features from "./components/Features/Features";
import Home from "./components/Home/Home";
import HowToDo from "./components/HowToDo/HowToDo";
import Instructions from "./components/Instructions/Instructions";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Signup/Signup";
import StartAnalysis from "./components/StartAnalysis/StartAnalysis";
import PhotoUpload from "./components/PhotoUpload/PhotoUpload";
import AccountSettings from "./components/AccountSettings/AccountSettings";
import ParentComponent from "./components/ParentComponent/ParentComponent";
import DeleteAccount from "./components/DeleteAccount/DeleteAccount";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";
import FAQ from "./components/FAQ/FAQ";
import History from "./components/History/History";




const App = () => {

  const user = localStorage.getItem("token");

  return (
    <>
      {/* Navbar is placed outside the Routes to ensure it's visible on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/features" element={<Features />} />
        <Route path="/howToDo" element={<HowToDo />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/startAnalysis" element={<StartAnalysis />} />
        <Route path="/photoUpload" element={<PhotoUpload />} />
        <Route path="/accountSettings" element={<AccountSettings />} />
        <Route path="/parentSettings" element={<ParentComponent />} />
        <Route path="/deleteAccount" element={<DeleteAccount />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/History" element={<History />} />




      </Routes>
      {/* Footer rendered at the bottom */}
      <Footer />
    </>
  );
};

export default App;
