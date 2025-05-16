import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext'

const Sidebar = () => {

  const { token, setNotification, fetchPlaylists, playlists } = useContext(PlayerContext);

  const navigate = useNavigate();

  const [newPlaylist, setNewPlaylist] = useState('');
  const [isOpen, setIsOpen] = useState(false);


  useEffect(() => {
    fetchPlaylists();
  }, [token]); // Fetch playlists whenever the token changes

  // Add a new playlist
  const handleAddPlaylist = async () => {
    if (!token) {
      setNotification("Please Login or Signup to add playlist."); // Show karega notification ko
      return;
    }

    if (newPlaylist) {
      try {
        const token = localStorage.getItem('token'); // token is stored in localStorage
        const response = await fetch('http://localhost:4000/api/createplaylist', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newPlaylist, songs: [] }),
        });

        if (response.ok) {
          const data = await response.json();
          fetchPlaylists(data.playlists); // Update playlists with the response
          setNewPlaylist('');
        } else {
          console.error('Failed to create playlist:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating playlist:', error);
      }
    }
  };


  return (

    <>
    
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-1/2 -translate-y-1/2 z-50 bg-gray-800 text-white p-2 rounded-r-md transition-all duration-300 ${
          isOpen ? 'left-[25%]' : 'left-0'
        }`}
      >
        {isOpen ? '<' : '>'}
      </button>

      <div
        className={`w-[25%] h-screen p-2 flex-col gap-2 text-white lg:flex fixed left-0 top-0 transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          backgroundImage: `url(${assets.sidebar})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="h-[10%] rounded flex flex-col justify-around">
          <div className="p-4 font-semibold flex flex-col items-start justify-start gap-3 pl-3">
            <img
              onClick={() => navigate('/')}
              className="ml-1 w-9 h-9 mb-3 cursor-pointer"
              src={assets.marvelous_logo}
              alt=""
            />
          </div>
        </div>

        {/* for playlist input*/}
        <div className="mb-4">
          <input
            type="text"
            value={newPlaylist}
            onChange={(e) => setNewPlaylist(e.target.value)}
            placeholder="Create a new playlist..."
            className="w-full p-2 bg-[#242424] rounded-md text-white"
          />
          <button
            onClick={handleAddPlaylist}
            className="w-full mt-2 p-2 bg-[#ff2400] rounded-md hover:bg-[#e8000d] transition"
          >
            Add Playlist
          </button>
        </div>
        

        {/* Playlist List */}
        {token && (
          <div className="flex flex-col gap-3">
            <div
              onClick={() => navigate('/library')}
              className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200 ease-in-out transform hover:scale-105 shadow-md flex justify-between items-center"
            >
              <span>My Library</span>
              <span className="text-sm text-gray-400">▶</span>
            </div>

            <div className="max-h-[60vh] overflow-y-auto flex flex-col gap-2">
              {playlists.map((playlist, index) => (
                <div key={index}>
                  <div
                    onClick={() => navigate(`/playlist/${playlist._id}`)}
                    className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition duration-200 ease-in-out transform hover:scale-105 shadow-md flex justify-between items-center"
                  >
                    <span>{playlist.name}</span>
                    <span className="text-sm text-gray-400">.ılıllllıılı.🎧</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
    </>

  );
};

export default Sidebar;