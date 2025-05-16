import React, { useContext, useState } from 'react';
import Navbar from './Navbar';
import AlbumItem from './AlbumItem';
import SongItem from './SongItem';
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/assets';

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
  const [view, setView] = useState('all');

  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Reverse the songsData array to show the latest songs first
  const reversedSongs = [...songsData].reverse();

  
  return (
    <div className="relative min-h-screen overflow-hidden">

      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={assets.DisplayHome}
        autoPlay
        loop
        muted
      ></video>

      <Navbar />
      <div className='flex items-center gap-2 mt-4 relative z-10'>
        <p onClick={() => handleViewChange('all')} className={`bg-${view === 'all' ? 'white' : 'black'} text-${view === 'all' ? 'black' : 'white'} px-4 py-1 rounded-2xl cursor-pointer`}>All</p>
        <p onClick={() => handleViewChange('music')} className={`bg-${view === 'music' ? 'white' : 'black'} text-${view === 'music' ? 'black' : 'white'} px-4 py-1 rounded-2xl cursor-pointer`}>Music</p>
        {/* <p onClick={() => navigate('/podcasts')} className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p> */}
      </div>

      {view === 'all' ? (
        <>
          
          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Featured charts</h1>
            <div className="flex overflow-auto">
              {albumsData.map((item, index) => (
                <AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />
              ))}
            </div>
          </div>
          
          <div className="mb-4 relative z-10">
            <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
            <div className="flex overflow-auto">
              {songsData.map((item, index) => (
                <SongItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image} />
              ))}
            </div>
          </div>
        
        </>
      ) : (
        
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 overflow-y-auto">
            {reversedSongs.map((song) => (
              <SongItem key={song._id} name={song.name} desc={song.desc} id={song._id} image={song.image} />
            ))}
          </div>
        </div>
        
      )}

    </div>
  );
};

export default DisplayHome;