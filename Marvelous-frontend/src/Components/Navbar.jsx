import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'

const Navbar = () => {

    const {token, setToken, logout} = useContext(PlayerContext);

    const navigate = useNavigate()

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({ songs: [], albums: [] }); // Initialize as an object with empty arrays
    const [currentSong, setCurrentSong] = useState(null); // State for the currently selected song
    const [isSearching, setIsSearching] = useState(false); // Track if a search is being performed

    const handleProfileClick = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setDropdownOpen(false);
    };

    const handleLogout = () => {
        setShowModal(true);
    };

    const confirmLogout = () => {
        // setToken(null);
        logout();
        navigate('/');
        setShowModal(false);
    };

    const cancelLogout = () => {
        setShowModal(false);
    };


    //function for handling search bar
    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
          setIsSearching(false); // Reset search state if query is empty
          setSearchResults({ songs: [], albums: [] });
          return;
        }
    
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`http://localhost:4000/api/search?q=${encodeURIComponent(searchQuery)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
    
          if (response.ok) {
            setSearchResults(data);
            setIsSearching(true); // Mark search as performed
          } else {
            console.error('Search error:', data.message);
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
    };

    // Function to handle song selection
    const handleSongSelect = (song) => {
        setCurrentSong(song); // Set the selected song
        console.log('Playing song:', song);
        // Add logic to play the song using an audio player
    };

    const handleCloseSearch = () => {
        setIsSearching(false); // Close the search results
        setSearchQuery(''); // Reset the search query
        setSearchResults({ songs: [], albums: [] }); // Clear search results
      };


  return (
    <>
        <div className="w-full mb-7 flex justify-between items-center font-semibold">

            <div className="flex items-center gap-2">
                <img onClick={()=>navigate(-1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_left} alt="" />
                <img onClick={()=>navigate(1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_right} alt="" />
            </div>

            {/* Home Button and Search Bar */}
            <div className="flex items-center gap-4 relative z-50">
                {/* Home Button */}
                <div className="w-12 h-12 flex items-center justify-center bg-black rounded-full cursor-pointer transition duration-200 ease-in-out transform hover:scale-105">
                <img
                    onClick={() => navigate('/')}
                    className="w-6"
                    src={assets.home_icon}
                    alt="Home"
                />
                </div>

                {/* Search Bar */}
                <div className="w-[100%] transition duration-200 ease-in-out transform hover:scale-105 relative">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search for songs & albums"
                    className="w-full bg-[#242424] p-3 rounded-full text-white"
                />

                {/* Search Results */}
                {isSearching && (
                  <div className="absolute top-full left-0 w-full bg-gray-800 p-4 rounded-2xl shadow-lg max-h-[50vh] overflow-y-auto z-50">
                    <h3 className="text-lg font-bold text-white">Search Results</h3>
                    <div>
                      <h4 className="text-md font-semibold text-gray-300">Songs</h4>
                      {searchResults.songs.length > 0 ? (
                        searchResults.songs.map((song) => (
                          <div
                            key={song._id}
                            className="p-2 bg-gray-700 rounded-md mb-2 cursor-pointer hover:bg-gray-600 transition"
                            onClick={() => handleSongSelect(song)}
                          >
                            <p className="text-white font-bold">{song.name}</p>
                            <p className="text-gray-400">{song.desc}</p>
                            <img
                              src={song.image}
                              alt={song.name}
                              className="w-full h-20 object-cover rounded-md mt-2"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">No songs found.</p>
                      )}
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-300">Albums</h4>
                      {searchResults.albums.length > 0 ? (
                        searchResults.albums.map((album) => (
                          <div
                            key={album._id}
                            className="p-2 bg-gray-700 rounded-md mb-2"
                          >
                            <p className="text-white font-bold">{album.name}</p>
                            <p className="text-gray-400">{album.desc}</p>
                            <img
                              src={album.image}
                              alt={album.name}
                                  className="w-full h-20 object-cover rounded-md mt-2"
                            />
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400">No albums found.</p>
                      )}
                    </div>
                  </div>
                )}
                </div>
            </div>

            {/* Blur Background */}
            {isSearching && (
              <div
                className="fixed inset-0 backdrop-blur-md bg-black bg-opacity-50 z-40"
                onClick={handleCloseSearch} // Close search when clicking on the background
              ></div>
            )}
            
            <div className="flex items-center gap-4">
                {/* <p className="bg-black py-1 px-3 rounded-2xl text-[15px] cursor-pointer">Install App</p> */}
            
                {token ? (
                    <div className="relative">
                        <img onClick={handleProfileClick} src={assets.profile_icon} alt="Profile" className="bg-blue-800 w-9 h-9 rounded-full transition duration-200 ease-in-out transform hover:scale-105 cursor-pointer border-gray-800" style={{ borderRadius: '50%' }} />
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md">
                                <p onClick={() => handleNavigation('/account')} className="px-4 py-2 transition duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-600 cursor-pointer">Account</p>
                                {/* <p onClick={() => handleNavigation('/profile')} className="px-4 py-2 transition duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-600 cursor-pointer">Profile</p> */}
                                <p onClick={() => handleNavigation('/upgrade')} className="px-4 py-2 transition duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-600 cursor-pointer">Upgrade Premium</p>
                                <p onClick={() => handleNavigation('/settings')} className="px-4 py-2 transition duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-600 cursor-pointer">Settings</p>
                                <hr className="border-gray-600" />
                                <p onClick={handleLogout} className="px-4 py-2 transition duration-200 ease-in-out transform hover:scale-105 hover:bg-gray-600 cursor-pointer">Logout</p>
                            </div>
                        )}
                    </div>
                    ) : (  
                    <>
                        <p onClick={() => navigate('/signup')} className="bg-white hover:bg-[#ff0000] transition duration-200 ease-in-out transform hover:scale-105 text-black text-[15px] px-4 py-2 rounded-2xl cursor-pointer">Sign up</p>
                        <p onClick={() => navigate('/login')} className="bg-black hover:bg-[#ff0000] transition duration-200 ease-in-out transform hover:scale-105 py-2 px-4 rounded-2xl text-[15px] cursor-pointer">Login</p>
                    </>
                )}
            
            </div>

        </div>

        {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded shadow-lg text-black">
                <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
                    <p>Are you sure you want to logout?</p>
                    <div className="flex justify-end mt-4">
                        <button 
                            onClick={cancelLogout} 
                            className="bg-gray-300 text-black px-4 py-2 rounded mr-2 transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={confirmLogout} 
                            className="bg-red-600 text-white px-4 py-2 rounded transition duration-200 ease-in-out transform hover:scale-105"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        )}

    </>
  )
}

export default Navbar
