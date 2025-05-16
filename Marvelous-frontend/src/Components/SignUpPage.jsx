import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/assets';

const SignUpPage = () => {
  const { setToken, fetchLoginDetails } = useContext(PlayerContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token); // Store the token in Local Storage
        await fetchLoginDetails(); // to fetch user details immediately
        navigate('/');
      } else {
        setError(data.message || 'Failed to create account');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('An error occurred while signing up');
    }
  };

  return (
    <div
      className="h-screen w-full flex justify-center items-center bg-[#121212] text-white"
      // style={{ backgroundImage: 'linear-gradient(to bottom, #121212, #333)' }}
      style={{
        backgroundImage: `url(${assets.signup})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      
      <div className="max-w-md w-full p-4 rounded">
      
        <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
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
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 pl-10 text-sm text-gray-700"
              placeholder="Enter your email"
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
          <label className="block mb-4">
            Confirm Password
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 pl-10 text-sm text-gray-700"
              placeholder="Confirm your password"
            />
          </label>
          {error && (
            <p className="text-red-500 text-sm mb-2">{error}</p>
          )}
          <button
            type="submit"
            className="bg-[#ff2400] hover:bg-[#e8000d] text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-white mt-2">
          Already have an account? <Link className="text-blue-700" to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
};

export default SignUpPage;