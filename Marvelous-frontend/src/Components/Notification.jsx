import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';

const Notification = ({ message }) => {
    const {setNotification} = useContext(PlayerContext);
    return (
        <div className="fixed bg-black bg-opacity-50 top-0 left-0 w-full h-screen flex justify-center items-center z-50 transition-transform transform translate-y-0 opacity-100">
            <div className="bg-white p-6 rounded shadow-lg text-black w-1/2 max-w-md animate-slide-in">
                <h2 className="text-lg font-semibold mb-4">{message}</h2>
                <button
                    onClick={() => setNotification(null)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Notification;