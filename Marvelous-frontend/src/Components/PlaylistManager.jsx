import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';

const Playlist = () => {
  const { removeSongFromPlaylist, fetchPlaylistSongs, playWithId } = useContext(PlayerContext);
  const { playlistId } = useParams(); // Get the playlist ID from the URL
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState(null);


  // Fetch playlist songs when the component mounts or playlistId changes
  useEffect(() => {
    const fetchsongs = async () => {
      // console.log('Fetching songs for playlistId:', playlistId);
      const songs = await fetchPlaylistSongs(playlistId);
      if(songs){
        setPlaylist({ _id: playlistId, songs });
      } else {
        console.error("Failed to fetch playlist songs");
      }
    };
    fetchsongs();
  }, [playlistId, fetchPlaylistSongs]);


  const handleRemoveFromPlaylist = async (songId, songName) => {
    await removeSongFromPlaylist(playlistId, songId);
    setPlaylist((prev) => ({
      ...prev,
      songs: prev.songs.filter((song) => song._id !== songId),
    }));
    toast.info(`${songName} has been removed from your playlist!`);
  };


  return (
    <div
      className="min-h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage: `url(${assets.playlistpage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        height: '100vh',
        position: 'relative',
      }}
    >
      <div className="p-6">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Back to Home
        </button>

        <h1 className="text-4xl font-bold mt-6">
          {playlist ? `Playlist: ${playlistId}` : 'Your Playlist'}
        </h1>

        <div className="mt-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '8px', overflowY: 'auto', maxHeight: '100vh' }}>
          {playlist && playlist.songs.length > 0 ? (
            playlist.songs.map((song) => (
              <div key={song._id} className="h-[10%] flex justify-between items-center text-white px-4">
                <img
                  className="cursor-pointer w-12 mr-5 m-2"
                  src={song.image}
                  alt={song.name}
                  onClick={() => playWithId(song._id)}
                />
                <div className="flex-grow flex justify-between items-center">
                  <div className="w-1/2 text-center">
                    <h2>{song.name}</h2>
                  </div>
                  <div className="w-1/2 text-center">
                    <p>{song.desc}</p>
                  </div>
                  <button
                    className="mt-2 text-red-500 relative group"
                    onClick={() => handleRemoveFromPlaylist(song._id, song.name)}
                  >
                    ⛔
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-red-800 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-lg">
                      Remove
                    </span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg font-semibold mt-4">
              No songs in this playlist yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;