import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/assets';

const LoginPage = () => {
  const { setToken } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token); // Store the token in Local Storage
        //console.log('Token:', data.token); //log the token to console for debugging
        navigate('/');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred while logging in');
    }
  };

  return (
    <div
      className="h-screen w-full flex justify-center items-center bg-[#121212] text-white"
      // style={{ backgroundImage: 'linear-gradient(to bottom, #121212, #333)' }}
      style={{
        backgroundImage: `url(${assets.login})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      <div className="max-w-md w-full p-4 rounded">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 pl-10 text-sm text-gray-700"
              placeholder="Enter your username"
            />
          </label>
          <label className="block mb-4">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 pl-10 text-sm text-gray-700"
              placeholder="Enter your password"
            />
          </label>
          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}
          <button
            type="submit"
            className="bg-[#ff2400] hover:bg-[#e8000d] text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-white mt-2">
          Don't have an account? <Link className="text-blue-700" to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;