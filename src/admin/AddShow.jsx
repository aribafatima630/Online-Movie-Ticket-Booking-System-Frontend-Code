import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AddShow.css';
import BASE_URL from '../config';

export default function AddShow() {
  const user = JSON.parse(localStorage.getItem('user'));
  const theaterId = user?.theater?.theaterId;

  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const [formData, setFormData] = useState({
    movieName: '',
    screenId: '',
    timeSlots: [{ startTime: '', endTime: '' }]
  });

  useEffect(() => {
    // Load movies
    axios.get(`${BASE_URL}/api/movies`)
      .then(res => setMovies(res.data))
      .catch(err => console.error('Error fetching movies:', err));

    // Load screens for current theater
    axios.get(`${BASE_URL}/api/theaters/screens?theaterId=${theaterId}`)
      .then(res => setScreens(res.data))
      .catch(err => console.error('Error fetching screens:', err));
  }, [theaterId]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTimeSlotChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSlots = [...formData.timeSlots];
    updatedSlots[index][name] = value;
    setFormData({ ...formData, timeSlots: updatedSlots });
  };

  const handleAddSlot = () => {
    setFormData({
      ...formData,
      timeSlots: [...formData.timeSlots, { startTime: '', endTime: '' }]
    });
  };

  const handleRemoveSlot = (index) => {
    const updatedSlots = formData.timeSlots.filter((_, i) => i !== index);
    setFormData({ ...formData, timeSlots: updatedSlots });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      movie: { movieName: formData.movieName },
      time_slot: formData.timeSlots
    };

    try {
      const res = await axios.post(
        `${BASE_URL}/api/shows?screenId=${formData.screenId}`,
        payload
      );
      alert('Show added successfully!');
      setFormData({
        movieName: '',
        screenId: '',
        timeSlots: [{ startTime: '', endTime: '' }]
      });
    } catch (err) {
      console.error('Error adding show:', err);
      alert('Failed to add show.');
    }
  };

  return (
    <div className="add-show-container">
      <h2 className="add-show-title">Add New Show</h2>
      <form className="add-show-form" onSubmit={handleSubmit}>
        <select
          className="add-show-input"
          name="movieName"
          value={formData.movieName}
          onChange={handleFormChange}
          required
        >
          <option value="">Select Movie</option>
          {movies.map((movie) => (
            <option key={movie.movieId} value={movie.movieName}>
              {movie.movieName}
            </option>
          ))}
        </select>

        <select
          className="add-show-input"
          name="screenId"
          value={formData.screenId}
          onChange={handleFormChange}
          required
        >
          <option value="">Select Screen</option>
          {screens.map((screen) => (
            <option key={screen.screenId} value={screen.screenId}>
              {screen.screenName}
            </option>
          ))}
        </select>

        <label className="add-show-label">Show Time Slots</label>
        {formData.timeSlots.map((slot, index) => (
          <div key={index} className="time-slot-row">
            <input
              className="add-show-input"
              type="time"
              name="startTime"
              value={slot.startTime}
              onChange={(e) => handleTimeSlotChange(e, index)}
              required
            />
            <span>to</span>
            <input
              className="add-show-input"
              type="time"
              name="endTime"
              value={slot.endTime}
              onChange={(e) => handleTimeSlotChange(e, index)}
              required
            />
            {index > 0 && (
              <button
                className="remove-btn"
                type="button"
                onClick={() => handleRemoveSlot(index)}
              >
                ×
              </button>
            )}
          </div>
        ))}

        <button className="add-slot-btn" type="button" onClick={handleAddSlot}>
          + Add Time Slot
        </button>

        <button className="submit-show-btn" type="submit">
          Create Show
        </button>
      </form>
    </div>
  );
}