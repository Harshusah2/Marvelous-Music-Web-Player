import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';
// import { PlayerContext } from '../context/PlayerContextProvider';

const addSong = () => {

  // const { getSongsData } = useContext(PlayerContext); // Access getSongsData from PlayerContext

  const [youtubeLink, setYoutubeLink] = useState('');
  const [songName, setSongName] = useState('');
  const [songDescription, setSongDescription] = useState('');
  const [songImage, setSongImage] = useState('');
  const [songAudio, setSongAudio] = useState('');
  const [album, setAlbum] = useState('none');
  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isConverted, setIsConverted] = useState(false); // Track conversion status

  const onConvertHandler = async () => {
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/api/youtubevideoconvert', {
      youtubeLink,
    });

    const { title, description, thumbnail, audioUrl } = response.data;

    // console.log('Audio URL from backend:', audioUrl); //debuggingg

    // Automatically fill the fields
    setSongName(title);
    setSongDescription(description);
    setSongImage(thumbnail);
    setSongAudio(audioUrl); // Update with the new audio file path
    setIsConverted(true); // Mark as converted

    // console.log('Current songAudio:', songAudio); //debuggingg

    toast.success('Audio converted successfully!');
    } catch (error) {
      console.error('Error in onConvertHandler:', error);
      toast.error('Error occurred while converting video to audio');
    }

    setLoading(false);
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      const formData = {
        name: songName,
        desc: songDescription,
        image: songImage,
        audio: songAudio, // This should already contain the correct URL
        album: album,
      };

      // console.log([...formData.entries()]);

      const response = await axios.post(`${url}/api/song/add`, formData, {
        headers: {
          'Content-Type': 'application/json', // Ensure correct Content-Type
        },
      });

      // console.log(response.data);
      
      if (response.data.success) {
        toast.success('Song added successfully');

        // Reset all fields after successful submission
        setYoutubeLink('');
        setSongName('');
        setSongDescription('');
        setSongImage('');
        setSongAudio('');
        setAlbum('none');
        setIsConverted(false); // Reset conversion status

        // Fetch the updated songs data
        // await getSongsData(); // Call getSongsData here

      } else {
        toast.error('Something went wrong');
      }
    } catch (error) {
      console.error('Error occurred while adding song:', error);
      toast.error('Error occurred while adding song');
    }

    setLoading(false);
  };

  const loadAlbumData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);

      if (response.data.success) {
        setAlbumData(response.data.albums);
      } else {
        toast.error('Unable to load albums data');
      }
    } catch (error) {
      toast.error('Error occurred while loading albums data');
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  return (
    <div>
      <form onSubmit={onsubmitHandler} className="flex flex-col gap-6">
        <div className="text-white flex flex-col gap-4">
          {!isConverted && ( // Hide YouTube link input after conversion
            <>
              <p>Enter YouTube video link:</p>
              <input
                type="text"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                className="text-white bg-transparent outline-red-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 200px)]"
                required
              />
              <button
                type="button"
                onClick={onConvertHandler}
                className="bg-red-600 text-white p-2.5 w-[max(150px)]"
                disabled={loading}
              >
                {loading ? 'Converting...' : 'Convert to Audio'}
              </button>
            </>
          )}
        </div>

        {songName && (
          <div className="text-white">
            <p>Song Name:</p>
            <input
              type="text"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              className="bg-transparent outline-red-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]"
              required
            />
          </div>
        )}

        {songDescription && (
          <div className="text-white">
            <p>Song Description:</p>
            <input
              type="text"
              value={songDescription}
              onChange={(e) => setSongDescription(e.target.value)}
              className="bg-transparent outline-red-600 border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]"
              required
            />
          </div>
        )}

        {songImage && (
          <div className="text-white">
            <p>Song Image:</p>
            <div className="w-24 h-24 overflow-hidden rounded border-2 border-gray-400">
              <img 
                src={songImage}
                alt="Song Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {isConverted && songAudio && ( // Show audio file after conversion
          <div className="text-white">
            <p>Audio File Selected:</p>
            <p className="text-sm">{songAudio}</p>
          </div>
        )}

        <div className="text-white">
          <p>Album:</p>
          <select
            onChange={(e) => setAlbum(e.target.value)}
            defaultValue={album}
            className="bg-[#121212] outline-red-600 border-2 border-gray-400 p-2.5 w-[max(150px)]"
          >
            <option value="none">None</option>
            {albumData.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="bg-red-600 text-white p-2.5 w-[max(150px)]" disabled={loading}>
          {loading ? 'Adding...' : 'Add Song'}
        </button>
      </form>
    </div>
  );
};

export default addSong;