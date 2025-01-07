import React, { useState } from 'react';
import axios from 'axios';
import './DeleteAccount.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

const DeleteAccount = () => {
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('You must be logged in to delete your account.');
            }

            const response = await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/users/delete-account`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setMessage('Your account has been successfully deleted.');
            localStorage.removeItem('token');
            localStorage.removeItem('hasAgreed');
            localStorage.removeItem('profilePhoto');

        } catch (err) {
            console.error('Error deleting account:', err);
            setError('Failed to delete account. Please try again later.');
        }
    };

    return (
        <div>
            {/* <Navbar /> */}
            <Sidebar />
            <div className="delete-account-container">
                <h1>Delete Account</h1>
                <p>This action cannot be undone. Are you sure you want to delete your account?</p>
                {error && <p className="delete-account-error-message">{error}</p>}
                {message && <p className="delete-account-success-message">{message}</p>}
                <button className="delete-account-delete-btn" onClick={handleDeleteAccount}>
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default DeleteAccount;
