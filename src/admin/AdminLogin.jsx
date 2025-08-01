import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';
import BASE_URL from '../config';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    emailId: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials);
    const { data, status } = response;

    if (status === 200) {
      let role = data.role;
      let theater = data.theater;

      if (role === 'ADMIN') {
        if (!theater) {
          alert('Register Theater! Before Login');
          return;
        }

        localStorage.setItem('user', JSON.stringify(data));
        navigate('/admin');
      } else {
        alert('Access restricted! Only admins can log in here.');
      }
    }

    } catch (error) {
      if(error.response && error.response.status === 401){
        const message = error.response.data;
        if(message === 'Invalid Credentials'){
          alert('Invalid Credentials');
        }else if(message === 'Theater not found'){
          alert('Register Theater! Before Login');
        }else{
          alert('User Not Found');
        }
      }else{
        console.error(error);
        alert('Something went wrong! Please Try Again');
      } 
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="emailId"
          placeholder="Email"
          value={credentials.emailId}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
