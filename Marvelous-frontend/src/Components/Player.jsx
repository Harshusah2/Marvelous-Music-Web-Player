import React, {useContext, useEffect, useState} from 'react'
import {assets} from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const Player = () => {

  const {track, seekBar, seekBg, playStatus, play, pause, time, previous, next, seekSong, volume, seekVolume, volumeBg, volumeBar, token, setNotification} = useContext(PlayerContext)
  
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [isVisible, setIsVisible] = useState(true);

  const [isAnimating, setIsAnimating] = useState(false);
  
  // Add mouse position tracking
  useEffect(() => {
    let timeoutId;
    
    const handleMouseMove = (e) => {
      const threshold = 50; // pixels from bottom
      const isNearBottom = window.innerHeight - e.clientY <= threshold;
      
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Show player if mouse is near bottom
      if (isNearBottom) {
        setIsVisible(true);
      } else {
        timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, 4000);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);


  const handleVolumeChange = (e) => {
    const volumeValue = e.target.value;
    seekVolume(volumeValue);
  }

  const handleZoomClick = () => {
    if (!token) {
      setNotification("Please Login or Signup to play music."); // Show karega notification ko
      return;
    }
    setIsAnimating(true);
    setIsFullScreen(!isFullScreen);
    setTimeout(() => setIsAnimating(false), 300);
  };
  
  return track ? (

    <div className={` 
      ${isAnimating ? 'transform scale-110' : ''}
      ${isFullScreen 
        ? 'fixed top-0 left-0 w-full h-full bg-black flex flex-col justify-center items-center z-50 transition-all duration-300 ease-in-out' 
        : 'fixed bottom-0 left-0 w-full h-[10%] bg-black flex justify-between items-center z-50 transition-all duration-300 ease-in-out'
      }
      text-white px-4
      ${!isFullScreen && !isVisible ? 'translate-y-full' : 'translate-y-0'}
    `}>
      
      {token ? ( // Check if the user is logged in
      // {isFullScreen ? (
        isFullScreen ? (
          <div className="flex flex-col items-center mb-8">
            <img 
              className="w-[300px] h-[300px] mb-4" 
              src={track.image} 
              alt="" 
            />
            <h2 className="text-2xl font-bold">{track.name}</h2>
            <p className="text-lg text-gray-300">{track.desc}</p>
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-4">
            <img className="w-12" src={track.image} alt="" />
            <div>
              <p>{track.name}</p>
              <p>{track.desc.slice(0, 50)}</p>
            </div>
          </div>
        )
      ) : (
        // When logged out, show a placeholder or message
        <div className="hidden lg:flex items-center gap-4">
          <p>Please Login or Signup to see the track.</p>
        </div>  
      )}

      <div className={`flex flex-col items-center gap-1 ${isFullScreen ? 'scale-150 mb-8' : 'm-auto'}`}>
        <div className="flex gap-4">
          <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="" />
          <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="" />
          {playStatus
            ? <img onClick={pause} className='transition duration-200 ease-in-out transform hover:scale-105 w-4 cursor-pointer' src={assets.pause_icon} alt="" />
            : <img onClick={play} className='transition duration-200 ease-in-out transform hover:scale-105 w-4 cursor-pointer' src={assets.play_icon} alt="" />
          }
          <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="" />
          <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="" />
        </div>

        <div className='flex items-center gap-5'>
          <p>{time.currentTime.minute} : {time.currentTime.second}</p>
          <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
            <hr ref={seekBar} className='h-1 border-none w-0 bg-[#ff0000] rounded-full' />
          </div>
          <p>{time.totalTime.minute} : {time.totalTime.second}</p>
        </div>
      </div>

      <div className={`hidden lg:flex items-center gap-2 opacity-75 ${isFullScreen ? 'absolute top-4 right-4' : ''}`}>
        <img className='w-4' src={assets.volume_icon} alt="" />

        <div className="volume-control">
          <div className="volume-bg" ref={volumeBg}></div>
          <div className="volume-bar" ref={volumeBar} style={{ width: `${volume * 100}%` }}></div>
          
          <input
            className='cursor-pointer'
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume}  
            onChange={handleVolumeChange} 
          />
        </div>

        <img 
          className='w-4 cursor-pointer' 
          src={assets.zoom_icon} 
          alt="" 
          onClick={handleZoomClick} 
        />
      </div>
    </div>
  ):null
         
}

export default Player