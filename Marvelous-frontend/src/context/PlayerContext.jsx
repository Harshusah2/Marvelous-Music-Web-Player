import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Notification from "../Components/Notification";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const volumeBg = useRef();
    const volumeBar = useRef();

    const url = 'http://localhost:4000'; //backend base url

    const [token, setToken] = useState(null);

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track, setTrack] = useState(songsData[0])
    const [playStatus, setPlayStatus] = useState(false);
    const [notification, setNotification] = useState(null); // State for notification
    const [time, setTime] = useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })
    const [volume, setVolume] = useState(1);
    const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
    const [library, setLibrary] = useState([]);
    const [playlists, setPlaylists] = useState([]); // State to store playlists

    //to show user details in account section
    const [username, setUsername] = useState('');
    const [email, setEmail]= useState('');
    const [error, setError] = useState('');


    //function to play music
    const play = () => {
        if (!token) {
            setNotification("Please Login or Signup to play music."); // Show karega notification ko
            return;
        }
        audioRef.current.play();
        setPlayStatus(true)
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false)
    }

    const playWithId = async (id) => {
      if (!token) {
          setNotification("Please Login or Signup to play music."); // Show karega notification ko
          return;
      }
        // console.log("Playing song with ID:", id);
        
      //find the song ID and set it as the current track
      const selectTrack = songsData.find(item=>item._id===id);

      if(selectTrack){
        // console.log('Playing Track:', selectTrack);
        setTrack(selectTrack);
        // console.log('File Path from Database:', selectTrack.file);

        if (!selectTrack.file) {
            console.error('File field is empty or undefined for the selected track.');
            setNotification("Failed to load the audio file.");
            return;
        }

        // Pause and reset the current audio
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        // Split the file path into directory and file name
        const filePath = selectTrack.file;
        const directory = filePath.substring(0, filePath.lastIndexOf('/') + 1); // e.g., "/temp/"
        const fileName = filePath.substring(filePath.lastIndexOf('/') + 1); // e.g., "file_name.mp3"

        // Construct the full audio source URL
        const audioSource = `${url}${directory}${encodeURIComponent(fileName)}`;
        audioRef.current.src = audioSource;
        // console.log('Audio Source:', audioSource);

        // console.log('Backend URL:', url);

        // Set the audio source and handle errors
        try {
            audioRef.current.src = audioSource;
        } catch (error) {
            console.error("Error setting audio source:", error);
            setNotification("Failed to load the audio file.");
            return;
        }

        // Wait for the audio to be ready to play
        const handleCanPlayThrough = async () => {
          try {
            await audioRef.current.play();;
            setPlayStatus(true);
            setCurrentlyPlayingId(id);
          } catch (error) {
            console.error("Error playing audio:", error);
          } finally {
            // Remove the event listener after the audio starts playing
            audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
          }
        };

        // Add the event listener for `canplaythrough`
        audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      } else {
        console.error('Track not found for ID:', id);
      }
    }

    const previous = async () => {
        if (!token) {
            setNotification("Please Login or Signup to play music."); // Show karega notification ko
            return;
        }
        songsData.map(async (item, index) => {
            if (track._id === item._id && index > 0) {
                await setTrack(songsData[index - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            } else if (track._id === songsData[0]._id) {
                await setTrack(songsData[songsData.length - 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }
    
    const next = async () => {
        if (!token) {
            setNotification("Please Login or Signup to play music."); // Show karega notification ko
            return;
        }
        songsData.map(async (item, index) => {
            if (track._id === item._id && index < songsData.length - 1) {
                await setTrack(songsData[index + 1]);
                await audioRef.current.play();
                setPlayStatus(true);
            } else if (track._id === songsData[songsData.length - 1]._id) {
                await setTrack(songsData[0]);
                await audioRef.current.play();
                setPlayStatus(true);
            }
        })
    }

    const seekSong = async (e) => {
        if (!token) {
            setNotification("Please Login or Signup to play music."); // Show karega notification ko
            return;
        }
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration)
    }

    const seekVolume = async (volumeValue) =>  {
        audioRef.current.volume = volumeValue;
        setVolume(volumeValue);
        volumeBar.current.style.width = (volumeValue * 100) + "%";
    }

    const getSongsData = async () => {
        try {

            const response = await axios.get(`${url}/api/song/list`);
            // console.log('Fetched Songs:', response.data.songs);
            setSongsData(response.data.songs);
            setTrack(response.data.songs[0]);
            
        } catch (error) {
            console.error("Error fetching songs data", error); 
        }
    }

    const getAlbumsData = async () => {
        try {

            const response = await axios.get(`${url}/api/album/list`);
            setAlbumsData(response.data.albums);
            
        } catch (error) {
            
        }
    }

    //for library
    const addSongToLibrary = async (songId) => {
        if (!token) {
            console.error('No token found. Please log in.');
            return;
        }

        try {
          const response = await fetch('http://localhost:4000/api/library/addsong', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ songId }),
          });
      
          const data = await response.json();
          if (response.ok) {
            // console.log('Song added to library:', data.library);
            setLibrary(data.library); // Update the library state immediately
          } else {
            console.error('Failed to add song to library:', data.message);
          }
        } catch (error) {
          console.error('Error adding song to library:', error);
        }
    };
    
    const removeSongfromLibrary = async (songId) => {
        if (!token) {
            console.error('No token found. Please log in.');
            return;
        }

        try {
          const response = await fetch(`${url}/api/library/removesong`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ songId }),
          });
      
          const data = await response.json();
          if (response.ok) {
            // console.log('Song removed from library:', data.library);
            setLibrary(data.library); // Update the library state immediately
          } else {
            console.error('Failed to remove song from library:', data.message);
          }
        } catch (error) {
          console.error('Error removing song from library:', error);
        }
    };

    const fetchLibrary = async () => {
        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }
      
        try {
          const response = await fetch(`${url}/api/library/getlibrarysong`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          const data = await response.json();
          if (response.ok) {
            setLibrary(data.library); // Populate the library state with the fetched songs
          } else {
            console.error('Failed to fetch library:', data.message);
          }
        } catch (error) {
          console.error('Error fetching library:', error);
        }
    };


    //to show user details in account section
    const fetchLoginDetails = async () => {
        try {
          const response = await axios.get(`${url}/api/logindetails`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const { username, email } = response.data;
          setUsername(username);
          setEmail(email);
        } catch (error) {
          console.error('Error fetching login details:', error);
          setError(error.message);
        }
    };


    //function for add or remove song to a playlist
    const addSongToPlaylist = async (playlistId, songId) => {
        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }
    
        try {
          const response = await axios.post(
            `${url}/api/addsongtoplaylist`,
            { playlistId, songId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
    
          if (response.status === 200) {
            console.log('Song added to playlist:', response.data.playlist);
            setPlaylists((prevPlaylists) =>
              prevPlaylists.map((playlist) =>
                playlist._id === playlistId ? response.data.playlist : playlist
              )
            );
          } else {
            console.error('Failed to add song to playlist:', response.data.message);
          }
        } catch (error) {
          console.error('Error adding song to playlist:', error);
        }
    };

    const removeSongFromPlaylist = async (playlistId, songId) => {
        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }
    
        try {
          const response = await axios.post(
            `${url}/api/removesongfromplaylist`,
            { playlistId, songId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
    
          if (response.status === 200) {
            console.log('Song removed from playlist:', response.data.playlist);
            setPlaylists((prevPlaylists) =>
              prevPlaylists.map((playlist) =>
                playlist._id === playlistId ? response.data.playlist : playlist
              )
            );
          } else {
            console.error('Failed to remove song from playlist:', response.data.message);
          }
        } catch (error) {
          console.error('Error removing song from playlist:', error);
        }
    };


    const fetchPlaylists = async () => {
        if (!token) {
          setPlaylists([]); // Clear playlists if no token
          return;
        }
        
        try {
          const response = await fetch('http://localhost:4000/api/getplaylist', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setPlaylists(data.playlists);
          } else {
            console.error('Failed to fetch playlists:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching playlists:', error);
        }
    };


    const fetchPlaylistSongs = async (playlistId) => {
        if (!token) {
          console.error('No token found. Please log in.');
          return null;
        }
      
        try {
        //   console.log(`Fetching playlist songs from: ${url}/api/getplaylistsongs/${playlistId}`); // Debug log
          const response = await fetch(`${url}/api/getplaylistsongs/${playlistId}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            console.error(`Failed to fetch playlist songs: ${response.statusText}`);
            return null;
          }
      
          const data = await response.json();
        //   console.log('Fetched playlist songs:', data.songs);
          return data.songs;
        } catch (error) {
          console.error('Error fetching playlist songs:', error);
          return null;
        }
    };



    useEffect(() => {
        if (token) {
            fetchLibrary(); //for library
            fetchLoginDetails(); //for user details
            fetchPlaylists();
        }
    }, [token]); // This runs whenever the token changes
    

    useEffect(()=>{
        setTimeout(()=>{
            audioRef.current.ontimeupdate = () => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration * 100)) + "%";
                setTime({
                    currentTime:{
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime:{
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    }
                })
            }
        }, 1000);
    },[audioRef])

    useEffect(()=>{
        getSongsData();
        getAlbumsData();
    },[])


    useEffect(()=>{
        //check for token in local storage on initialize load
        const storedToken = localStorage.getItem('token');
        if(storedToken){
            setToken(storedToken);
        }
    }, []);


    const logout = ()=>{
        setToken(null);
        setTrack(null);
        localStorage.removeItem('token'); // yeh token ko remove karta hai, on logout
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null); // Clear notification after a few seconds
        }, 3000); // Adjust duration as needed
    };


    const  contextValue = {
        audioRef,
        seekBg,
        seekBar,
        volumeBg,
        volumeBar,
        track,setTrack,
        playStatus,setPlayStatus,
        time,setTime,
        play,pause,
        playWithId,
        previous,
        next, 
        seekSong,
        seekVolume,
        songsData,
        albumsData,
        volume, setVolume,
        currentlyPlayingId,
        token, setToken,
        logout,
        notification, setNotification,
        showNotification,
        library,
        addSongToLibrary,
        removeSongfromLibrary,
        username, email, error,
        fetchLoginDetails,
        playlists,
        addSongToPlaylist,
        removeSongFromPlaylist,
        fetchPlaylists,
        fetchPlaylistSongs,
    }

    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
            {notification && <Notification message={notification} />}
        </PlayerContext.Provider>
    )

}

export default PlayerContextProvider;