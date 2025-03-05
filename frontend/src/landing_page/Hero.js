import React from 'react';
import { useParams } from 'react-router-dom';

function Hero() {
    const { username } = useParams(); // Access the username from the URL

    return (
        <div>
            <h1>Welcome, {username}!</h1>
        </div>
    );
}

export default Hero;
