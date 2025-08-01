import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'; // optional CSS
import BASE_URL from "../config";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
    e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json(); //  Only call this once
                console.log("Login response data:", data); //  Will log user object

                // Save user object directly
                localStorage.setItem("user", JSON.stringify(data));
                window.location.href = "/";
            } else {
                setError("Invalid email or password");
            }
        } catch (err) {
            setError("Server error. Please try again.");
        }
    };
    return (
        <div className="login-container">
            <h2>Login to QuickTickets</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}