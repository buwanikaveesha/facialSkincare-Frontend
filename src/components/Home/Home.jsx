import React from 'react';
import { Link } from 'react-router-dom';
import bannerImage from '../../assets/images/banner1.png';
import Navbar from '../Navbar/Navbar';
import './Home.css';
import Footer from '../Footer/Footer';
import HowToDo from '../HowToDo/HowToDo';
import Features from '../Features/Features';

const Home = () => {
    return (
        <div>
            {/* <Navbar /> */}

            <div className="skincare-container">
                <header className="skincare-header">
                    <div className="header-image">
                        <img src={bannerImage} alt="Skincare AI" />
                    </div>
                    <div className="header-text">
                        <h1>
                            FacialCure: Skin Analysis <br /> for Personalised <br /> Facial Skincare
                        </h1>
                        <Link to="/StartAnalysis">
                            <button className="analysis-button">GET YOUR ANALYSIS</button>
                        </Link>
                    </div>
                </header>

                <section className="face-mapping-section">
                    <h2 className='facial_topic'>What is FacialCure?</h2>
                    <p className='home_para'>
                        FacialCure is an AI-powered skincare platform that detects issues like acne
                        and pigmentation from user-uploaded images. It provides personalized face pack
                        recipes, suggests ingredient alternatives, and gathers user feedback, promoting
                        natural and affordable skincare solutions.
                    </p>
                </section>
            </div>
            <br></br>
            <br></br>
        </div>
    );
};

export default Home;
