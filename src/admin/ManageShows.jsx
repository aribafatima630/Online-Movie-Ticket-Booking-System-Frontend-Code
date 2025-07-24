import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageShows.css';

export default function ManageShows() {
  const theater = JSON.parse(localStorage.getItem("user"))?.theater;
  const [screens, setScreens] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    fetchScreensAndShows();
  }, []);

  const fetchScreensAndShows = async () => {
    try {
      const screenRes = await axios.get(
        `http://localhost:8080/api/theaters/screens?theaterId=${theater.theaterId}`
      );
      const screenList = screenRes.data;
      setScreens(screenList);

      const showPromises = screenList.map((screen) =>
        axios
          .get(`http://localhost:8080/api/shows/byScreenId?screenId=${screen.screenId}`)
          .then(res => res.data)
          .catch(() => null)
      );

      const showResults = await Promise.all(showPromises);
      const filteredShows = showResults.filter(
        (show) => show && show.movie && show.screens
      );
      setShows(filteredShows);
    } catch (err) {
      console.error('Error fetching screens or shows', err);
    }
  };

  const handleDelete = async (showId) => {
    if (window.confirm("Are you sure you want to delete this show?")) {
      try {
        await axios.delete(`http://localhost:8080/api/shows?id=${showId}`);
        alert("Show deleted successfully!");
        fetchScreensAndShows();
      } catch (error) {
        console.error("Error deleting show", error);
        alert("Failed to delete show");
      }
    }
  };

  return (
    <div className="manage-shows-container">
      <h2 className="manage-shows-heading">🎭 Manage Shows</h2>
      <div className="show-list">
        {shows.length === 0 ? (
          <p>No shows found for your theater.</p>
        ) : (
          shows.map((show) => (
            <div className="show-card" key={show.showId}>
              <div className="show-info">
                <div className="show-details">
                  <h3 className="movie-name">🎬 {show.movie.movieName}</h3>
                  <p><strong>Screen:</strong> {show.screens.screenName}</p>
                  <p><strong>City:</strong> {show.screens.theater.address.city}</p>
                  <p><strong>Price:</strong> ₹{show.movie.price}</p>
                  <p><strong>Time Slots:</strong>{" "}
                    {show.time_slot?.map(slot => (
                      <span key={slot.time_slot_id}>
                        {slot.startTime} - {slot.endTime}{" "}
                      </span>
                    ))}
                  </p>
                  <div className="show-actions">
                    <button
                      className="delete-show-btn"
                      onClick={() => handleDelete(show.showId)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                <div className="movie-image">
                  {show.movie.image ? (
                    <img src={show.movie.image} alt={show.movie.movieName} />
                  ) : (
                    <div className="no-image">No image</div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}