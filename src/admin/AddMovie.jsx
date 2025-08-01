import React, { useState } from 'react';
import axios from 'axios';
import './AddMovie.css';
import BASE_URL from '../config';

export default function AddMovie(){

    const [movie, setMovie] = useState({
    movieName: '',
    movieStatus: 'Movie_Available',
    movieType: '',
    description: '',
    price: '',
    image: '',
    bannerImage: '',
    rating: '',
    duration: '',
    cast: [],
  });

   const [castInput, setCastInput] = useState({ name: '', image: '' });

   const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleCastChange = (e) => {
    setCastInput({ ...castInput, [e.target.name]: e.target.value });
  };

  const addCastMember = () => {
    if (castInput.name && castInput.image) {
      setMovie({ ...movie, cast: [...movie.cast, castInput] });
      setCastInput({ name: '', image: '' });
    } else {
      alert("Please enter both name and image URL for the cast member.");
    }
  };

  const removeCastMember = (index) => {
    const updatedCast = movie.cast.filter((_, i) => i !== index);
    setMovie({ ...movie, cast: updatedCast });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/movies`, movie);
      alert('Movie added successfully!');
      setMovie({
        movieName: '',
        movieStatus: 'Movie_Available',
        movieType: '',
        description: '',
        price: '',
        image: '',
        bannerImage: '',
        rating: '',
        duration: '',
        cast: [],
      });
    } catch (error) {
      console.error(error);
      alert('Failed to add movie.');
    }
  };

  return (
    <div className="add-movie-container">
      <h2>Add New Movie</h2>
      <form onSubmit={handleSubmit} className="add-movie-form">
        <input name="movieName" placeholder="Movie Name" value={movie.movieName} onChange={handleChange} required />
        <select name="movieStatus" value={movie.movieStatus} onChange={handleChange} required>
          <option value="">-- Select Status --</option>
          <option value="Movie_Available">Available</option>
          <option value="Movie_NotAvailable">Not Available</option>
        </select>
          
        <select name="movieType" value={movie.movieType} onChange={handleChange} required>
          <option value="">-- Select Movie Type --</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
        </select>
        <textarea name="description" placeholder="Description" value={movie.description} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={movie.price} onChange={handleChange} required />
        <input name="duration" placeholder="Duration (e.g. 2h 30m)" value={movie.duration} onChange={handleChange} required />
        <input name="image" placeholder="Poster Image URL" value={movie.image} onChange={handleChange} />
        <input name="bannerImage" placeholder="Banner Image URL" value={movie.bannerImage} onChange={handleChange} />
        <input type="number" name="rating" placeholder="Rating" value={movie.rating} onChange={handleChange} />

        <h4>Add Cast Members</h4>
        <div className="cast-inputs">
          <input name="name" placeholder="Cast Name" value={castInput.name} onChange={handleCastChange} />
          <input name="image" placeholder="Cast Image URL" value={castInput.image} onChange={handleCastChange} />
          <button type="button" onClick={addCastMember}>Add Cast</button>
        </div>

        <ul>
          {movie.cast.map((c, index) => (
            <li key={index}>
              {c.name} <button type="button" onClick={() => removeCastMember(index)}>Remove</button>
            </li>
          ))}
        </ul>

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}
