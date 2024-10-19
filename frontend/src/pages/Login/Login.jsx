import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './Login.css';
import backgroundImg from "../../assets/airplanebg.jpeg";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login data to the backend
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
      } else {
        setSuccess(data.message);
        setError('');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
    }
  };



  return (
    <div className="login-container"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -2,
    }}
    >
      <div className="wrapper">
        <form action="#" className='logForm'>
          <h2 className='welcome font-medium'>Welcome</h2>
          <div className="input">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              <label>Username</label>
          </div>
          <div className="input">
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <label>Password</label>
          </div>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <div className="forgotten">
              <label for="remember">
                  <input type="checkbox" id="remember"/>
                  <p>Remember Me</p>
              </label>
              <a href="#">Forgot Password</a>
          </div>
          <button type="submit" className='logButton bg-sky-600 hover:bg-sky-400'>Log In</button>
          <div className="register">
            <p>
              Don't have an account?  
              <a href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}