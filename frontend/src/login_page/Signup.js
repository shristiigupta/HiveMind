import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import your custom styles

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3002/api/auth/signup", {
                email,
                password,
                username,
                createdAt: new Date(),
            }, { withCredentials: true });

            if (response.data.success) {
                // After successful login
                localStorage.setItem("username", response.data.username);

                setSuccess(true);
                setTimeout(() => {
                    window.location.href = `http://localhost:3000/user/${response.data.username}/feed`;
                    // Redirect to login page after successful signup
                }, 2000);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    const redirectToLogin = () => {
        navigate("/login"); // Redirect to login page
    };

    return (
        <div className="auth-container">
            <div className="form-box">
                <h2>Create an Account</h2>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Signup successful! Redirecting to login...</p>}

                <form onSubmit={handleSignup}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                        />
                    </div>

                    <button type="submit" className="btn">
                        Sign Up
                    </button>
                </form>

                <p className="switch-text">
                    Already have an account?{" "}
                    <button onClick={redirectToLogin} className="switch-btn">
                        Login here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
