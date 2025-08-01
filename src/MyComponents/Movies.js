import React, { useEffect, useState } from 'react';
import './Movies.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import BASE_URL from '../config';

export default function Movies() {
    const [movies, setMovies] = useState([]);

    const posterUrls = [
        "https://png.pngtree.com/template/20220424/ourmid/pngtree-cartoon-cinema-banner-movie-entertainment-poster-image_1432968.jpg",
        "https://png.pngtree.com/thumb_back/fw800/background/20230705/pngtree-3d-render-of-online-ticketing-for-movies-image_3738846.jpg",
        "https://png.pngtree.com/background/20210710/original/pngtree-movie-ticket-cinema-poster-design-picture-image_1051856.jpg"
    ];

    // Fetch movie data from API
    useEffect(() => {
        fetch(`${BASE_URL}/api/shows`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched Movies Data:", data); // Log the response data
                setMovies(data);
            })
            .catch(err => {
                console.error("Error fetching data:", err); // Log any errors
            });
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    return (
        <div className="movies-container">
            <h2 className="section-title">Recommended Movies</h2>
            <div className="movie-grid">
            {movies.map((movie) => (
            <Link 
                 to={`/movie/${encodeURIComponent(movie.movie.movieName)}`} 
                key={movie.showId} 
                className="movie-card"
  >
                        <img src={movie.movie.image} alt={movie.movie.movieName} className="movie-image" />
                        <h3 className="movie-title">{movie.movie.movieName}</h3>
                        <p className="movie-review">{movie.movie.rating}</p>
            </Link>
                ))}
            </div>

            <Slider {...sliderSettings} className="carousel">
                {posterUrls.map((url, index) => (
                    <div key={index} className="carousel-card">
                        <img src={url} alt={`Poster ${index + 1}`} className="carousel-image" />
                    </div>
                ))}
            </Slider>

        </div>
    );
}