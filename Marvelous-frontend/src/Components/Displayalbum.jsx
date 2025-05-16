import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const Displayalbum = ({album}) => {

  const{id} = useParams();

  const [albumData, setAlbumData] = useState("");
  const {playWithId, albumsData, songsData} = useContext(PlayerContext);
  const [songCount, setSongCount] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  useEffect(()=>{
    albumsData.map((item)=>{
      if(item._id === id){
        setAlbumData(item);
        const albumSongs = songsData.filter((song) => song.album === item.name);
        setSongCount(albumSongs.length);

        // Calculate total duration
        const total = albumSongs.reduce((acc, song) => {
          const [minutes, seconds] = song.duration.split(':').map(Number); // Assuming duration is in "MM:SS" format
          return acc + (minutes * 60 + seconds); // Convert to total seconds
        }, 0);

        // Convert total seconds back to MM:SS format
        const totalMinutes = Math.floor(total / 60);
        const totalSeconds = total % 60;
        setTotalDuration(`${totalMinutes} min ${totalSeconds} sec`);
      }
    })
  },[])

  return albumData ? (
    <>
     <Navbar/> 
     <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
      <img className='w-48 rounded' src={albumData.image} alt="" />
      <div className="flex flex-col">
        <p>Playlist</p>
        <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
        <h4>{albumData.desc}</h4>
        <p className="mt-1">
          <img className="inline-block w-7 h-7" src={assets.marvelous_logo} alt="" />
          <b className="pl-2">Marvelous</b>
          {/* • 1,944,736 likes */}
          • <b>{songCount} songs, </b>
          about {totalDuration}
        </p>
      </div>
     </div>
     <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
      <p><b className="m-auto mr-4">#</b>Title</p>
      <p>Album</p>
      <p className="hidden sm:block">Date Added</p>
      <img className="m-auto w-4" src={assets.clock_icon} alt="" />
     </div>
     <hr />
     {
      songsData.filter((item) => item.album === album.name).map((item, index)=>(
        <div onClick={()=>{playWithId(item._id)}} key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor:pointer">
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index+1}</b>
            <img className="inline w-10 mr-5" src={item.image} alt="" />
            {item.name}
          </p>
          <p className="text-[15px]">{albumData.name}</p>
          <p className="text-[15px] hidden sm:block">5 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))
     }
    </>
  ) : null
}

export default Displayalbum;
