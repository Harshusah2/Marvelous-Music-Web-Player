import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { toast } from 'react-toastify';

const SongItem = ({name, image, desc, id}) => {

  const {playWithId, currentlyPlayingId, addSongToLibrary, removeSongfromLibrary, library} = useContext(PlayerContext);

  const isAdded = library.some(song => song._id === id); // Check if the song is in the library
  
  const handlePlay = () => {
    // console.log('Playing Song ID:', id); // Debugging
    playWithId(id);
  };

  const handleAddToLibrary = () => {
    // console.log('Adding song to library:', id);
    addSongToLibrary(id);
    toast.success(`${name} has been added to your library!`)
  };

  const handleRemoveFromLibrary = () => {
    // console.log('Removing song from library:', id);
    removeSongfromLibrary(id);
    toast.info(`${name} has been removed from your library!`);
  };

  return (

    <div className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
      <img className='rounded' src={image} alt="" onClick={handlePlay} />
      <p className='font-bold mt-2 mb-1'>{name}</p>
      <p className='text-slate-200 text-sm'>{desc}</p>
      
      {currentlyPlayingId === id && !isAdded && (
        <button className="mt-2 text-green-500" onClick={handleAddToLibrary}>
          ❇️
        </button>
      )}

      {currentlyPlayingId === id && isAdded && (
        <button className="mt-2 text-red-500" onClick={handleRemoveFromLibrary}>
          ⛔
        </button>
      )}

    </div>
  )
}

export default SongItem
