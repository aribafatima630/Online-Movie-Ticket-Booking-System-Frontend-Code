import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SearchResults.css";

export default function SearchResults() {
    const { query } = useParams();
    const navigate = useNavigate();
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/shows`)
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(show =>
                    show.movie.movieName.toLowerCase().includes(query.toLowerCase())
                );
                setResults(filtered);
            })
            .catch(err => console.error("Error fetching search results:", err));
    }, [query]);

    return (
        <div className="search-results-container">
            <h2>Search Results for "{query}"</h2>
            {results.length > 0 ? (
                <div className="result-grid">
                    {results.map((item) => (
                        <div key={item.showId} className="result-card">
                            <img
                                className="result-image"
                                src={item.movie.bannerImage}
                                alt={item.movie.movieName}
                            />
                            <div className="result-info">
                                <h3>{item.movie.movieName}</h3>
                                <p><strong>Type:</strong> {item.movie.movieType}</p>
                                <p><strong>Rating:</strong> {item.movie.rating}</p>
                                <p><strong>Price:</strong> ₹{item.movie.price}</p>
                                <button
                                    className="details-btn"
                                    onClick={() => navigate(`/movie/${item.movie.movieName}`)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="no-results">No movies found.</p>
            )}
        </div>
    );
}
