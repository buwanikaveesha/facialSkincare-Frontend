import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import AccountSettings from '../AccountSettings/AccountSettings'; // Import AccountSettings
import axios from 'axios';

const ParentComponent = () => {
    const [userProfilePhoto, setUserProfilePhoto] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No JWT token found');
                }

                const response = await axios.get('http://localhost:3000/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserProfilePhoto(response.data.profilePhoto);
            } catch (err) {
                console.error('Error fetching user profile:', err);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div>
            <Navbar userProfilePhoto={userProfilePhoto} />
            <AccountSettings setUserProfilePhoto={setUserProfilePhoto} />
        </div>
    );
};

export default ParentComponent;
