import React, { useContext, useState } from 'react';
import { FaUserCircle, FaChevronDown, FaChevronUp, FaUserEdit, FaHistory, FaCreditCard, FaAddressBook, FaPlay, FaChevronRight, FaLock, FaBell, FaSignOutAlt, FaKey, FaAppStore } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const AccountPage = () => {

  const {logout, username, email, error} = useContext(PlayerContext);

  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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


  return (
    <div className="min-h-screen bg-[#100c08] text-gray-300">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-[#121212]">
        <div onClick={() => navigate('/')} className="text-white cursor-pointer font-semibold text-2xl"><img className="inline mr-3 mb-1 w-10 h-10" src={assets.marvelous_logo} alt="" />𝕄𝕒𝕣𝕧𝕖𝕝𝕠𝕦𝕤
        </div>
        <div className="flex items-center space-x-6">
          {/* <Link to="/premium" className="text-gray-300 hover:text-red-600 transition">Premium</Link> */}
          {/* <Link to="/support" className="text-gray-300 hover:text-red-600 transition">Support</Link> */}
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-1 text-red-600 hover:text-red-700 focus:outline-none"
            >
              <FaUserCircle className="text-2xl h-8 w-8" />
              <span>Profile</span>
              {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                <Link
                  to="/account"
                  className="block px-4 py-2 font-bold text-black hover:text-red-600 transition"
                >
                  Account
                </Link>
                <button onClick={handleLogout}
                  className="w-full text-left px-4 py-2 font-bold text-gray-500 hover:text-red-600 transition">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Account */}
      <div className="flex flex-col items-center p-6">
        <div className="max-w-3xl w-full">

          <div className="bg-[#121212] rounded-lg p-6 mb-6">
            <h2 className="text-xl text-center font-semibold mb-2">Welocme, {username}!</h2>
            <p className="text-gray-400 text-center">Email: {email}</p>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          
          {/* Header */}
          {/* <div className="p-6 bg-gray-800 text-white rounded-lg mb-6">
            <h1 className="text-3xl font-semibold">Your plan</h1>
            <div className="flex items-center justify-between mt-4">
              <div>
                <h2 className="text-xl font-bold">Spotify Free</h2>
              </div>
              <button className="px-4 py-2 bg-gray-600 rounded-md text-white hover:bg-gray-500 transition">
                Explore plans
              </button>
            </div>
          </div> */}

          {/* Account Section */}
          <div className="bg-[#121212] rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Account</h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between bg-[#242124] p-4 rounded-md cursor-pointer hover:bg-[#121212]">
                <div className="flex items-center space-x-2">
                    <FaCreditCard className="text-gray-400" />
                    <span>Manage your subscription</span>
                </div>
                <FaChevronRight className="text-gray-400" />
                </div>

                <div className="flex items-center justify-between bg-[#242124] p-4 rounded-md cursor-pointer hover:bg-[#121212]">
                <div className="flex items-center space-x-2">
                    <FaUserEdit className="text-gray-400" />
                    <span>Edit profile</span>
                </div>
                <FaChevronRight className="text-gray-400" />
                </div>

                {/* <div className="flex items-center justify-between bg-[#242124] p-4 rounded-md cursor-pointer hover:bg-[#121212]">
                <div className="flex items-center space-x-2">
                    <FaPlay className="text-gray-400" />
                    <span>Recover playlists</span>
                </div>
                <FaChevronRight className="text-gray-400" />
                </div> */}

                <div className="flex items-center justify-between bg-[#242124] p-4 rounded-md cursor-pointer hover:bg-[#121212]">
                <div className="flex items-center space-x-2">
                    <FaAddressBook className="text-gray-400" />
                    <span>Address</span>
                </div>
                <FaChevronRight className="text-gray-400" />
                </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-[#121212] rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between bg-[#242124] p-4 rounded-md cursor-pointer hover:bg-[#121212]">
                <div className="flex items-center space-x-2">
                    <FaHistory className="text-gray-400" />
                    <span>Order history</span>
                </div>
                <FaChevronRight className="text-gray-400" />
                </div>

                <div className="flex items-center justify-between bg-[#242124] p-4 rounded-md cursor-pointer hover:bg-[#121212]">
                <div className="flex items-center space-x-2">
                    <FaCreditCard className="text-gray-400" />
                    <span>Saved payment cards</span>
                </div>
                <FaChevronRight className="text-gray-400" />
                </div>

                <div className="flex items-center justify-between bg-[#242124] p-4 rounded-md cursor-pointer hover:bg-[#121212]">
                <div className="flex items-center space-x-2">
                    <FaKey className="text-gray-400" />
                    <span>Redeem</span>
                </div>
                <FaChevronRight className="text-gray-400" />
                </div>
            </div>
          </div>

          {/* Security and Privacy Section */}
          {/* <div className="bg-[#121212] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Security and Privacy</h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between bg-[#242124] p-4 rounded-md cursor-pointer hover:bg-[#121212]">
                <div className="flex items-center space-x-2">
                    <FaAppStore className="text-gray-400" />
                    <span>Manage apps</span>
                </div>
                <FaChevronRight className="text-gray-400" />
                </div>

                <div className="flex items-center justify-between bg-[#242124] p-4 rounded-md cursor-pointer hover:bg-[#121212]">
                <div className="flex items-center space-x-2">
                    <FaBell className="text-gray-400" />
                    <span>Notification settings</span>
                </div>
                <FaChevronRight className="text-gray-400" />
                </div>

                <div className="flex items-center justify-between bg-[#242124] p-4 rounded-md cursor-pointer hover:bg-[#121212]">
                <div className="flex items-center space-x-2">
                    <FaLock className="text-gray-400" />
                    <span>Account privacy</span>
                </div>
                <FaChevronRight className="text-gray-400" />
                </div>

                <div className="flex items-center justify-between bg-[#242124] p-4 rounded-md cursor-pointer hover:bg-[#121212]">
                <div className="flex items-center space-x-2">
                    <FaKey className="text-gray-400" />
                    <span>Edit login methods</span>
                </div>
                <FaChevronRight className="text-gray-400" />
                </div>

                <div className="flex items-center justify-between bg-[#242124] p-4 rounded-md cursor-pointer hover:bg-[#121212]">
                <div className="flex items-center space-x-2">
                    <FaLock className="text-gray-400" />
                    <span>Set device password</span>
                </div>
                <FaChevronRight className="text-gray-400" />
                </div>

                <div className="flex items-center justify-between bg-[#242124] p-4 rounded-md cursor-pointer hover:bg-[#121212]">
                <div className="flex items-center space-x-2">
                    <FaSignOutAlt className="text-gray-400" />
                    <span>Sign out everywhere</span>
                </div>
                <FaChevronRight className="text-gray-400" />
                </div>
            </div>
          </div> */}

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
    </div>
  );
};

export default AccountPage;
