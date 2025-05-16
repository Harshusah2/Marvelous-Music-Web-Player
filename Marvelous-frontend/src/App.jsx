import React, { useContext } from "react";
import Sidebar from "./Components/Sidebar";
import Player from "./Components/Player";
import Display from "./Components/Display";
import { PlayerContext } from "./context/PlayerContext";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className="min-h-screen bg-black flex flex-col ">

      <ToastContainer />
      
      {songsData.length !== 0 ? 
        <>
          <div className="h-[90%] flex flex-1">
            <Sidebar className="flex-1" />
            <Display className="flex-1" />
          </div>
          <Player />
        </>
        : null}

      <audio ref={audioRef} src={track ? track.file:""} preload="auto"></audio>
      
      <Footer />

    </div>
  );
};

export default App;
