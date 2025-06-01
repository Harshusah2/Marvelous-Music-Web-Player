import signUp from "../models/signupModel.js";
import songModel from "../models/songModel.js";

// Create a new playlist
const createplaylist = async (req, res) => {
    const { name, songs } = req.body;
  
    try {
      const user = await signUp.findById(req.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const newPlaylist = { name, songs };
      user.playlists.push(newPlaylist);
      await user.save();
  
      res.status(201).json({ message: 'Playlist created successfully', playlists: user.playlists });
    } catch (error) {
    //   console.error('Error creating playlist:', error);
      res.status(500).json({ message: 'Server error', error });
    }
};

export { createplaylist };


// Get all playlists for the logged-in user
const getplaylists = async (req, res) => {
    try {
      // console.log('Fetching playlists for userId:', req.userId); // Debug log
      const user = await signUp.findById(req.userId).populate('playlists.songs');
      if (!user) {
        console.log('User not found'); // Debug log
        return res.status(404).json({ message: 'User not found' });
      }
  
      // console.log('Playlists fetched successfully:', user.playlists);
      res.status(200).json({ playlists: user.playlists });
    } catch (error) {
      console.error('Error fetching playlists:', error);
      res.status(500).json({ message: 'Server error', error });
    }
};

export { getplaylists};


// Add a song to a playlist
const addsongplaylist = async (req, res) => {
    const { playlistId, songId } = req.body;
  
    try {
      const user = await signUp.findById(req.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      const playlist = user.playlists.id(playlistId);
      if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
  
      const song = await songModel.findById(songId);
      if (!song) return res.status(404).json({ message: 'Song not found' });
      
      playlist.songs.push(songId);
      await user.save();
  
      res.status(200).json({ message: 'Song added to playlist', playlist });
    } catch (error) {
    //   console.error('Error adding song to playlist:', error);
      res.status(500).json({ message: 'Server error', error });
    }
};

export { addsongplaylist };


// Remove a song from a playlist
const removesongplaylist = async (req, res) => {
  const { playlistId, songId } = req.body;

  try {
      const user = await signUp.findById(req.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const playlist = user.playlists.id(playlistId);
      if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

      const songIndex = playlist.songs.indexOf(songId);
      if (songIndex === -1) return res.status(404).json({ message: 'Song not found in playlist' });

      playlist.songs.splice(songIndex, 1); // Remove the song from the playlist
      await user.save();

      res.status(200).json({ message: 'Song removed from playlist', playlist });
  } catch (error) {
      // console.error('Error removing song from playlist:', error);
      res.status(500).json({ message: 'Server error', error });
  }
};

export { removesongplaylist };

// Get songs of a specific playlist
const getPlaylistSongs = async (req, res) => {
  const { playlistId } = req.params; // Get the playlist ID from the request parameters
  // console.log('Fetching songs for playlistId:', playlistId);
  // console.log('User ID:', req.userId);
  
  try {
    // Find the user and populate songs
    const user = await signUp.findById(req.userId).populate('playlists.songs');
    if (!user) {
      console.error('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the playlist by ID
    const playlist = user.playlists.id(playlistId); 
    if (!playlist) {
      console.error('Playlist not found');
      return res.status(404).json({ message: 'Playlist not found' });
    }

    res.status(200).json({ songs: playlist.songs }); // Return the songs in the playlist
  } catch (error) {
    console.error('Error fetching playlist songs:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export { getPlaylistSongs };