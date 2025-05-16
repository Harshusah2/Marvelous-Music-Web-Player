import React, { useContext, useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import Displayalbum from './Displayalbum'
import { PlayerContext } from '../context/PlayerContext'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import LibraryPage from './LibraryPage'
import Account from './Account'
import Settings from './Settings'
import PlaylistManager from './PlaylistManager'

const Display = () => {

  const { albumsData, token } = useContext(PlayerContext);

  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split('/').pop() : "";
  // const bgColor = isAlbum && albumsData.length > 0 ? albumsData.find((x) => (x._id == albumId)).bgColor : "#121212";
  const bgColor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((x) => x._id === albumId)?.bgColor || '#121212'
      : '#121212';

  useEffect(() => {
    //check if displayRef.current is defined before accessing its style
    if(displayRef.current){
      if (isAlbum) {
        displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`
      }
      else {
        displayRef.current.style.background = `#121212`
      }
    }    
  }, [isAlbum, bgColor]); //add dependencies to the effect

  // if (!token) {
  //   return <LoginPage />; // Redirect to login if not authenticated
  // }

  return (
    <div className="relative flex-1 h-full overflow-y-auto text-white">

      <div ref={displayRef} className="relative z-10 px-6 pt-4 pb-20">
      
        {albumsData.length > 0
          ? 
            <Routes>
               <Route path="/" element={<DisplayHome />} />
               <Route path="/album/:id" element={<Displayalbum album={albumsData.find((x) => (x._id == albumId))} />} />
               <Route path="/signup" element={<SignUpPage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/library" element={<LibraryPage />} />
               <Route path="/account" element={<Account />} />
               <Route path="/settings" element={<Settings />} />
               <Route path="/playlist/:playlistId" element={<PlaylistManager/>} />
             </Routes>
           : null
        }
      </div>
    </div>
  )
}

export default Display
