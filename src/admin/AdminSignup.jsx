import React, { useState } from 'react';
import './AdminSignup.css';
import BASE_URL from '../config';

export default function AdminSignup() {
  const [user, setUser] = useState({
    name: '',
    emailId: '',
    password: ''
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/admin/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (res.ok) {
        alert('User registered successfully!');
        setUser({ name: '', emailId: '', password: '' });
      } else {
        alert('Signup failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while signing up!');
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={handleSignup}>
        <h2>Create Your Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="emailId"
          placeholder="Email Address"
          value={user.emailId}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}