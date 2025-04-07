import React from "react";
import Hero from "../../components/Hero/Hero";
import HowToDo from "../HowToDo/HowToDo";
import FAQ from "../FAQ/FAQ";


const Home = () => {
  return (
    <div className="main_page-container">
      <Hero />
      <HowToDo />
      <FAQ/>
    </div>
  );
};

export default Home;
