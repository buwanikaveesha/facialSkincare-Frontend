import { faBookmark, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Link to="/accountSettings" className="sidebar-item">
                <FontAwesomeIcon icon={faUser} className="sidebar-icon" /> Account Settings
            </Link>
            <Link to="/saved-items" className="sidebar-item">
                <FontAwesomeIcon icon={faBookmark} className="sidebar-icon" /> Saved Items
            </Link>
            <Link to="/delete-account" className="sidebar-item">
                <FontAwesomeIcon icon={faTrash} className="sidebar-icon" /> Delete Account
            </Link>
        </div>
    );
};

export default Sidebar;
