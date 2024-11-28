import React from 'react';
import "./Home.css";

const Home = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className= "main_container">
            <nav className= "navbar">
                <h1>fakebook</h1>
                <button className= "white_btn_home" onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Home;