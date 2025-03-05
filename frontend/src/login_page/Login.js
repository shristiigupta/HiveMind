import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import your custom styles

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3002/api/auth/login",
                { email, password },
                { withCredentials: true }
            );

            if (response.data.success) {
                // Store username
                console.log(response.data.redirectUrl);


                localStorage.setItem("username", response.data.username);

                setSuccess(true);

                // ✅ Redirect using backend response
                setTimeout(() => {
                    window.location.href = `http://localhost:3000/user/${response.data.username}/feed`;
                    // Ensure this is used
                }, 2000);

            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };



    const redirectToSignup = () => {
        navigate("/signup"); // Redirect to signup page
    };

    return (
        <div className="auth-container">
            <div className="form-box">
                <h2>Login</h2>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Login successful! Redirecting...</p>}

                <form onSubmit={handleLogin}>
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

                    <button type="submit" className="btn">
                        Log In
                    </button>
                </form>

                <p className="switch-text">
                    Don't have an account?{" "}
                    <button onClick={redirectToSignup} className="switch-btn">
                        Sign up here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
