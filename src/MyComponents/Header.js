import React, { useState, useEffect } from "react";
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Header() {
    const [search, setSearch] = useState("");
    const [user, setUser] = useState(null); // use state to trigger re-render
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Invalid user JSON:", error);
            }
        }
    }, []); // this runs only on mount

    // Listen to storage updates (when user logs in and sets localStorage)
    useEffect(() => {
        const handleStorageChange = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    console.error("Invalid user JSON:", error);
                }
            } else {
                setUser(null);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const handleSearch = () => {
        if (search.trim() !== "") {
            navigate(`/search/${search}`);
        }
    };

    const goToSignup = () => navigate("/signup");
    const goToLogin = () => navigate("/login");

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null); // trigger re-render
        navigate("/login");
    };

    return (
        <div className="hero-section">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">QuickTickets</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                               <Link to="/" className="nav-link active">
                                    Home
                                </Link>
                            </li>
                        </ul>
                        <div className="search-wrapper">
                            <input
                                className="form-control custom-search"
                                type="search"
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="btn search-btn" onClick={handleSearch}>
                                Search
                            </button>

                            {user ? (
                                <>
                                    <span style={{ color: "white", marginLeft: "1rem" }}>
                                        Welcome, {user.name}
                                    </span>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={handleLogout}
                                        style={{ marginLeft: "1rem" }}
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="btn btn-outline-light signup-btn"
                                        onClick={goToSignup}
                                        style={{ marginLeft: "1rem" }}
                                    >
                                        Signup
                                    </button>
                                    <button
                                        className="btn btn-outline-light login-btn"
                                        onClick={goToLogin}
                                        style={{ marginLeft: "0.5rem" }}
                                    >
                                        Login
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className="hero-content">
                <h1 className="welcome-text">Welcome to QuickTickets</h1>
                <p className="subtitle-text">Book your favorite movies in just one click!</p>
            </div>
        </div>
    );
}