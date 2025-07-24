import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ManageTheater.css';

export default function ManageTheater() {
  const user = JSON.parse(localStorage.getItem('user'));
  const initialTheater = user?.theater;

  const [theater, setTheater] = useState(initialTheater);
  const [screens, setScreens] = useState([]);
  const [newScreen, setNewScreen] = useState({
    screenName: '',
    totalSeat: ''
  });

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/theaters/screens?theaterId=${theater.theaterId}`);
        setScreens(res.data);
      } catch (err) {
        console.error('Error fetching screens:', err);
      }
    };
    fetchScreens();
  }, [theater.theaterId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTheater({ ...theater, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setTheater({
      ...theater,
      address: {
        ...theater.address,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8080/api/theaters?id=${theater.theaterId}`, theater);
      alert('Theater updated successfully!');
      localStorage.setItem('user', JSON.stringify({ ...user, theater: res.data }));
    } catch (error) {
      console.error(error);
      alert('Update failed!');
    }
  };

  const handleScreenChange = (e) => {
    const { name, value } = e.target;
    setNewScreen({ ...newScreen, [name]: value });
  };

  const handleAddScreen = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:8080/api/theaters/screens?id=${theater.theaterId}`, newScreen);
      setScreens([...screens, res.data]);
      setNewScreen({ screenName: '', totalSeat: '' });
      alert('Screen added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to add screen');
    }
  };

  return (
    <div className="manage-theater-container">
      <h2 className="manage-theater-title">Manage Theater</h2>

      <form className="theater-form" onSubmit={handleSubmit}>
        <input className="theater-input" type="text" name="theaterName" value={theater.theaterName} onChange={handleChange} placeholder="Theater Name" required />
        <input className="theater-input" type="email" name="email" value={theater.email} onChange={handleChange} placeholder="Email" required />
        <input className="theater-input" type="text" name="contactNumber" value={theater.contactNumber} onChange={handleChange} placeholder="Contact Number" required />

        <input className="theater-input" type="text" name="streetNo" value={theater.address?.streetNo || ''} onChange={handleAddressChange} placeholder="Street No" required />
        <input className="theater-input" type="text" name="landmark" value={theater.address?.landmark || ''} onChange={handleAddressChange} placeholder="Landmark" required />
        <input className="theater-input" type="text" name="city" value={theater.address?.city || ''} onChange={handleAddressChange} placeholder="City" required />
        <input className="theater-input" type="text" name="pincode" value={theater.address?.pincode || ''} onChange={handleAddressChange} placeholder="Pincode" required />

        <button className="theater-btn" type="submit">Update Theater</button>
      </form>

      <hr className="manage-divider" />

      <h3 className="manage-theater-title">Add New Screen</h3>
      <form className="screen-form" onSubmit={handleAddScreen}>
        <input
          className="screen-input"
          type="text"
          name="screenName"
          value={newScreen.screenName}
          onChange={handleScreenChange}
          placeholder="Screen Name"
          required
        />
        <input
          className="screen-input"
          type="number"
          name="totalSeat"
          value={newScreen.totalSeat}
          onChange={handleScreenChange}
          placeholder="Total Seats"
          required
        />
        <button className="screen-btn" type="submit">Add Screen</button>
      </form>

      <h3 className="manage-theater-title">Existing Screens</h3>
      <ul className="screen-list">
        {screens.map((screen) => (
          <li className="screen-item" key={screen.screenId}>
            <strong>{screen.screenName}</strong> — {screen.totalSeat} seats
          </li>
        ))}
      </ul>
    </div>
  );
}