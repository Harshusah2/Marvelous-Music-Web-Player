import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import { toast } from 'react-toastify';

const LibraryPage = () => {

  // const { library, playWithId, removeSongfromLibrary, playlists = [], addSongToPlaylist } = useContext(PlayerContext);
  const { library, playWithId, removeSongfromLibrary, playlists, addSongToPlaylist } = useContext(PlayerContext);

  const [selectedSongId, setSelectedSongId] = useState(null);
  const [showPlaylistDropdown, setShowPlaylistDropdown] = useState(false);


  const handleRemoveFromLibrary = (songId, songName) => {
    // console.log('Removing song from library:', songId);
    removeSongfromLibrary(songId);
    toast.info(`${songName} has been removed from your library!`);
  };

  const handleAddtoPlaylist = (songId) => {
    setSelectedSongId(songId);
    setShowPlaylistDropdown(true);
  };

  const handleSelectPlaylist = (playlistId) => {
    if (selectedSongId && playlistId) {
      addSongToPlaylist(playlistId, selectedSongId);
      toast.success('Song is adde to playlist!');
    }
    setShowPlaylistDropdown(false);
    setSelectedSongId(null);
  }

  return (
    <div style={{
      backgroundImage: `url(${assets.library})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      height: '100vh',
      position: 'relative',
    }}>
      <h1 className="text-2xl font-bold text-white">My Library</h1>
      <div className="mt-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '8px', overflowY: 'auto', maxHeight: '100vh' }}>
        {library.length === 0 ? (
          <p className="text-white">Your library is empty.</p>
        ) : (
          library.map((song) => (
            <div key={song._id} className="h-[10%] flex justify-between items-center text-white px-4">
              <img className="cursor-pointer  w-12 mr-5 m-2" src={song.image} alt={song.name} onClick={() => playWithId(song._id)} />
              <div className="flex-grow flex justify-between items-center">
                <div className="w-1/2 text-center">
                  <h2>{song.name}</h2>
                </div>
                <div className="w-1/2 text-center">
                  <p>{song.desc}</p>
                </div> 
                <button
                  className="mt-2 text-red-500 relative group"
                  onClick={() => handleRemoveFromLibrary(song._id, song.name)}>
                  ⛔
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-red-800 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-lg">
                    Remove
                  </span>
                </button>
                <button 
                  className="mt-2 text-green-500 ml-4 relative group" 
                  onClick={() => handleAddtoPlaylist(song._id)}>
                    ➕
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-green-800 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-lg">
                      Add to Playlist
                    </span>
                  </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showPlaylistDropdown && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-green-400 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg text-black font-bold mb-4">Select a Playlist</h2>
            {/* {Array.isArray(playlists) && playlists.length > 0 ? ( */}
            {playlists.length > 0 ? (
              playlists.map((playlist) => (
                <button
                  key={playlist._id}
                  className="block w-full text-left px-4 py-2 bg-gray-800 hover:bg-gray-500 rounded-lg mb-2"
                  onClick={() => handleSelectPlaylist(playlist._id)}
                >
                  {playlist.name}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No playlists available.</p>
            )}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
              onClick={() => setShowPlaylistDropdown(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default LibraryPage
