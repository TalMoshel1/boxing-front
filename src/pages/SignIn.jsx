import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [boxing, setBoxing] = useState(localStorage.getItem('boxing'));

  const navigate = useNavigate();

  const sendPostRequest = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      localStorage.setItem('boxing', JSON.stringify({ token: data.data.token, user: data.data.user }));
      setBoxing(JSON.stringify({ token: data.data.token, user: data.data.user })); // Update state with new boxing info
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendPostRequest();
  };

  const AuthenticateRequest = async () => {
    try {
      const token = JSON.parse(boxing)?.token; // Parse boxing to access token
      const response = await fetch('http://localhost:3000/api/auth/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token // Use parsed token here
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.message === 'Token is valid') {
        navigate('/calendar');
      } 
      console.log('authenticate token: ', data);
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  useEffect(() => {
    if (boxing) {
      AuthenticateRequest();
    }
  }, [boxing]); // Run AuthenticateRequest when boxing changes

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
