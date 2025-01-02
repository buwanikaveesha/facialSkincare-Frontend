import React, { useEffect, useState } from 'react';
import './AccountSettings.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar'
import axios from 'axios';


const AccountSettings = () => {

    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", facePacksTried: 0, feedbackCount: 0, progress: 0 });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('No JWT token found');
                    return;
                }

                const response = await axios.get("http://localhost:3000/api/users/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log(response.data);

                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user data:', err);
                setError('Failed to fetch user data');
            }
        };

        fetchUserData();
    }, []);


    return (
        <div>
            <Navbar />
            <Sidebar />
            <div className='profile-tittle'>
                <h1>My Profile</h1>
                <div className="account-settings">
                    <div className="profile-container">
                        <div className="profile-photo">
                            <div className="photo-circle">
                                <button className="add-photo-btn">+</button>
                            </div>
                            <button className="photo-label">Add Photo</button>
                        </div>
                        <div className="personal-info">
                            <h3>Personal Information</h3>
                            <div className='name-email'>
                                <p><strong>Name:</strong> {user.firstName} {user.lastName} </p>
                                <p><strong>Email:</strong> {user.email} </p>
                            </div>
                            <button className="edit-btn">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AccountSettings;
