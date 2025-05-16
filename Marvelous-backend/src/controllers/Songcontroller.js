// import {v2 as cloudinary} from 'cloudinary';
import songModel from '../models/songModel.js';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { parseFile } from 'music-metadata';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

ffmpeg.setFfprobePath('C:\\Users\\harsh\\Downloads\\ffmpeg-7.1.1-essentials_build\\ffmpeg-7.1.1-essentials_build\\bin\\ffprobe.exe');

const addSong = async (req, res) => {
    try{
        const { name, desc, album, image, audio } = req.body;

        // console.log('Request Body:', req.body);s

        // Validate required fields
        if (!name || !desc || !album || !image || !audio) {
        //   console.log('Missing Fields:', { name, desc, album, image, audio });
          return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Resolve the audio file path from the `audio` field
        const tempFolderPath = path.join(__dirname, '../../temp');
        const audioPath = path.join(tempFolderPath, path.basename(audio)); // Use the file name from the `audio` field
        // console.log('Latest Audio File:', latestFile);
        // console.log('Resolved Audio Path:', audioPath);

        // Check if the file exists
        if (!fs.existsSync(audioPath)) {
          console.error('Audio file does not exist:', audioPath);
          return res.status(400).json({ success: false, message: 'Audio file not found' });
        }

        // Calculate the duration of the audio file
        let duration = 'Unknown';
        try {
            const metadata = await parseFile(audioPath);
            const seconds = metadata.format.duration || 0; // Duration in seconds
            duration = `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
        } catch (err) {
            console.error('Error calculating duration with music-metadata:', err);
        }

        // Prepare song data
        const songData = {
            name,
            desc,
            album,
            image, // Use the URL directly
            file: audio, // Use the relative paath from the request  body
            duration// calculated
        }

        // Save song to database
        const song = songModel(songData);
        await song.save();

        res.json({success: true, message:"Song Added"})
        
    }catch (error) {
        console.error('Error in addSong:', error);
        res.json({ success:false, message: 'Internal Server Error' });
    }
}

const listSong = async (req, res) => {
    try {

        const allSongs = await songModel.find({});
        res.json({success: true, songs: allSongs});

    } catch (error) {

        res.json({success:false});
        
    }
}

const removeSong = async (req, res) => {
    try {

        await songModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message:"Song Removed"});
        
    } catch (error) {

        res.json({success:false});
        
    }
}

export  {addSong, listSong, removeSong}