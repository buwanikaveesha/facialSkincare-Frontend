import React from "react";
import { Route, Routes } from "react-router-dom";
import AccountSettings from "./components/AccountSettings/AccountSettings";
import DeleteAccount from "./components/DeleteAccount/DeleteAccount";
import FAQ from "./components/FAQ/FAQ";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
import History from "./components/History/History";
import Home from "./components/Home/Home";
import HowToDo from "./components/HowToDo/HowToDo";
import Instructions from "./components/Instructions/Instructions";
import Login from "./components/Login/Login";
import MainPage from "./components/MainPage/MainPage";
import Navbar from "./components/Navbar/Navbar";
import ParentComponent from "./components/ParentComponent/ParentComponent";
import PhotoUpload from "./components/PhotoUpload/PhotoUpload";
import Signup from "./components/Signup/Signup";
import StartAnalysis from "./components/StartAnalysis/StartAnalysis";
import ContactUs from "./components/ContactUs/ContactUs";

const App = () => {

  const user = localStorage.getItem("token");

  return (
    <>
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
        <Route path="/contactUs" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
