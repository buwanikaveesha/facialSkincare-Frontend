import React from "react";
import Hero from "../../components/Hero/Hero";
import HowToDo from "../HowToDo/HowToDo";
import FAQ from "../FAQ/FAQ";
import Features from "../Features/Features";


const Home = () => {
  return (
    <div className="main_page-container">
      <Hero />
      <Features />
      {/* <HowToDo /> */}
      <FAQ/>
    </div>
  );
};

export default Home;
