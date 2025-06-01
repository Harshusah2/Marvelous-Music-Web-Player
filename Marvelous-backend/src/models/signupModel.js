import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'song' }], // Reference to the Song model
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    playlists: [playlistSchema],
    library: [{ type: mongoose.Schema.Types.ObjectId, ref: 'song' }], // User's library of songs
});

const signUp = mongoose.model('signup', userSchema);

export default signUp;