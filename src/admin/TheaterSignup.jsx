import React, { useState } from 'react';
import axios from 'axios';
import './TheaterSignup.css';
import BASE_URL from '../config';

export default function TheaterSignup() {
  const [theater, setTheater] = useState({
    theaterName: '',
    email: '',
    password: '',
    contactNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['street', 'city', 'state', 'pincode'].includes(name)) {
      setTheater({
        ...theater,
        address: {
          ...theater.address,
          [name]: value
        }
      });
    } else {
      setTheater({ ...theater, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/theaters`, theater);
      alert('Theater registered successfully!');
      // Optional: redirect to login page or dashboard
    } catch (error) {
      console.error(error);
      alert('Registration failed!');
    }
  };

  return (
    <div className="theater-signup-container">
      <h2>Theater Signup</h2>
      <form className="theater-signup-form" onSubmit={handleSubmit}>
        <input type="text" name="theaterName" placeholder="Theater Name" value={theater.theaterName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email (used in Signup)" value={theater.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password (used in Signup)" value={theater.password} onChange={handleChange} required />
        <input type="text" name="contactNumber" placeholder="Contact Number" value={theater.contactNumber} onChange={handleChange} required />

        <h4>Address</h4>
        <input type="text" name="street" placeholder="Street" value={theater.address.street} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={theater.address.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={theater.address.state} onChange={handleChange} required />
        <input type="text" name="pincode" placeholder="Pincode" value={theater.address.pincode} onChange={handleChange} required />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}