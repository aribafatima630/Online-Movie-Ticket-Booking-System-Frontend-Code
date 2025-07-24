import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './MovieDetail.css';

export default function MovieDetail() {
    const { movieName } = useParams();
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/shows`)
            .then(res => res.json())
            .then(data => {
                const found = data.find(show => show.movie.movieName.toLowerCase() === movieName.toLowerCase());
                setMovieData(found);
            });
    }, [movieName]);

    if (!movieData) return <p style={{ color: 'white', padding: '2rem' }}>Loading...</p>;

    const { movie } = movieData;

    return (
        <div className="movie-detail-container">
            <img className="banner-image" src={movie.bannerImage} alt={movie.movieName} />
            <div className="details">
                <h1>{movie.movieName}</h1>
                <p><strong>Type:</strong> {movie.movieType}</p>
                <p><strong>Description:</strong> {movie.description}</p>
                <p><strong>Price:</strong> ₹{movie.price}</p>
                <p><strong>Rating:</strong> {movie.rating}</p>
                <p><strong>Duration:</strong> {movie.duration}</p>
                <h2>Cast</h2>
                <div className="cast-list">
                    {movie.cast.map(c => (
                        <div key={c.castId} className="cast-card">
                            <img src={c.image} alt={c.name} />
                            <p>{c.name}</p>
                        </div>
                    ))}
                </div>
                <button className="book-btn" onClick={() => navigate(`/book/${movie.movieId}`)}>
                         🍿Book Now
                </button>
            </div>
        </div>
    );
}