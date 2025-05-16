import signUp from "../models/signupModel.js";

//to add songs in library
const addsong = async (req, res) => {
  const { songId } = req.body;
  // console.log('Request payload:', req.body);

  try {
    const user = await signUp.findById(req.userId);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // console.log('User before adding song:', user.library);

    if (!user.library.includes(songId)) {
      user.library.push(songId);
      await user.save();
    } else {
      // console.log('Song already exists in the library');
    }

    // Populate the library with song details
    const updatedUser = await signUp.findById(req.userId).populate('library');
    // console.log('Updated library:', updatedUser.library);

    res.status(200).json({ message: 'Song added to library', library: updatedUser.library });
  } catch (error) {
    // console.error('Error adding song to library:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export {addsong};

//to remove songs from liibrary
const removesong = async (req, res) => {
  const { songId } = req.body;
  
  try {
    const user = await signUp.findByIdAndUpdate(
      req.userId,
      { $pull: { library: songId } }, // Use `$pull` to remove the song
      { new: true } // Return the updated document
    ).populate('library'); // Populate the library with song details
  
    if (!user) {
       return res.status(404).json({ message: 'User not found' });
    }
  
    res.status(200).json({ message: 'Song removed from library', library: user.library });
  } catch (error) {
    // console.error('Error removing song from library:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export {removesong};

//to fetch library songs
const getlibrarysongs = async (req, res) => {
  try {
    const user = await signUp.findById(req.userId).populate('library'); // Populate the library with song details
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ library: user.library });
  } catch (error) {
    // console.error('Error fetching library:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export {getlibrarysongs};