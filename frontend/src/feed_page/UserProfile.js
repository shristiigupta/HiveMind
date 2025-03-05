import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/users/${userId}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    if (loading) {
        return <p>Loading user profile...</p>;
    }

    if (!user) {
        return <p>User not found</p>;
    }

    return (
        <div className="user-profile-container">
            <div className="user-card">
                <h1>{user.username}'s Profile</h1>
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Address:</strong> {user.address.city}, {user.address.state}</p>
            </div>
        </div>
    );
};

export default UserProfile;
