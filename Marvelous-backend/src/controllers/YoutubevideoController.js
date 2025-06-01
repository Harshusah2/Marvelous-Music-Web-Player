import youtubeDlExec from 'youtube-dl-exec';
import axios from 'axios';
import { fileURLToPath } from 'url';
import path from 'path';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const youtubeaudioconvertor = async (req, res) => {
  const { youtubeLink } = req.body;

  // Validate the YouTube link
  if (!youtubeLink || !youtubeLink.includes('youtube.com/watch')) {
    return res.status(400).json({ error: 'Invalid YouTube URL' });
  }

  try {
    // Fetch video details from YouTube Data API
    const videoId = youtubeLink.split('v=')[1]?.split('&')[0];
    const youtubeApiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`;
    const response = await axios.get(youtubeApiUrl);

    if (response.data.items.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const videoData = response.data.items[0];
    const title = videoData.snippet.title.replace(/[<>:"/\\|?*]/g, ''); // Sanitize title to remove invalid characters
    const description = videoData.snippet.description;
    const thumbnail = videoData.snippet.thumbnails.high.url

    // Generate a unique file name using the video ID and timestamp
    const uniqueFileName = `${title}_${videoId}_${Date.now()}.mp3`;
    const outputFilePath = path.resolve(__dirname, `../../temp/${uniqueFileName}`);

    // Use youtube-dl-exec to download and convert the video to audio
    await youtubeDlExec(youtubeLink, {
      output: outputFilePath,
      extractAudio: true,
      audioFormat: 'mp3',
      ffmpegLocation: 'C:\\Users\\harsh\\Downloads\\ffmpeg-7.1.1-essentials_build\\ffmpeg-7.1.1-essentials_build\\bin\\ffmpeg.exe',
    });

    // Send metadata and audio file
    res.json({
      title,
      description,
      thumbnail,
      audioUrl: `/temp/${uniqueFileName}`, // Use the unique file name
    });
  } catch (error) {
    console.error('Error with youtube-dl-exec:', error);
    res.status(500).json({ error: 'Error processing video' });
  }
};

export { youtubeaudioconvertor };