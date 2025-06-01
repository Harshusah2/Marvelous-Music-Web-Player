import albumModel from "../models/albumModel.js";
import songModel from "../models/songModel.js";

const search = async (req, res) => {
  try {
    const query = req.query.q; // Get the search query from the request
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
     }
    // console.log('Search query:', query);
    
    // Search for songs and albums that match the query
    const songs = await songModel.find({ name: { $regex: query, $options: 'i' } }); // Case-insensitive search
    const albums = await albumModel.find({ name: { $regex: query, $options: 'i' } });// 'name' is the field for album names and song names
    
    // console.log('Songs found:', songs);
    // console.log('Albums found:', albums);
        
     res.json({ songs, albums });
  } catch (error) {
      console.error('Error during search:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

export { search };