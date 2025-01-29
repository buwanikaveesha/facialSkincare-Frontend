import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faBookmark, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Menu Icon */}
            {!isOpen && (
                <FontAwesomeIcon 
                    icon={faBars} 
                    className="menu-icon" 
                    onClick={toggleSidebar} 
                />
            )}
            
            {/* Sidebar Overlay */}
            {isOpen && (
                <div className="sidebar-overlay active" onClick={closeSidebar}>
                    <div className="sidebar sidebar-open" onClick={(e) => e.stopPropagation()}>
                        {/* Close Icon */}
                        <FontAwesomeIcon 
                            icon={faTimes} 
                            className="close-icon" 
                            onClick={closeSidebar} 
                        />
                        
                        <Link to="/accountSettings" className="sidebar-item" onClick={closeSidebar}>
                            <FontAwesomeIcon icon={faUser} className="sidebar-icon" /> Account Settings
                        </Link>
                        <Link to="/saved-items" className="sidebar-item" onClick={closeSidebar}>
                            <FontAwesomeIcon icon={faBookmark} className="sidebar-icon" /> Saved Items
                        </Link>
                        <Link to="/deleteAccount" className="sidebar-item" onClick={closeSidebar}>
                            <FontAwesomeIcon icon={faTrash} className="sidebar-icon" /> Delete Account
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
