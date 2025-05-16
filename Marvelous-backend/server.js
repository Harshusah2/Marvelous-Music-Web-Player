import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import 'dotenv/config'
import { fileURLToPath } from 'url';
import path from 'path';
import connectDB from './src/config/Mongodb.js';
import connectCloudinary from './src/config/Cloudinary.js';
import songRouter from './src/routes/Songroute.js';
import albumRouter from './src/routes/Albumroute.js';
import signupRouter from './src/routes/Signuproute.js'
import loginRouter from './src/routes/Loginroute.js'
import loginDetailrouter from './src/routes/LoginDetailsroute.js'
import searchRouter from './src/routes/Searchroute.js'
import playlistRouter from './src/routes/Playlistroute.js';
import libraryRouter from './src/routes/Libraryroute.js';
import youtubeVideoRouter from './src/routes/Youtubevideoroute.js';

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// api config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both origins // Update this to your frontend's URL
    credentials: true // If you need to send cookies or authentication headers
}));
app.use(bodyParser.json());

// Serve the temp directory statically
app.use('/temp', express.static(path.join(__dirname, 'temp')));

// initialising routes
app.use('/api/song',songRouter)
app.use('/api/album',albumRouter)
app.use(signupRouter)
app.use(loginRouter)
app.use(loginDetailrouter)
app.use(searchRouter)
app.use(playlistRouter)
app.use(libraryRouter)
app.use(youtubeVideoRouter)

app.get('/',(req,res)=>res.send("API working"))


app.listen(port,()=>console.log(`Server started on ${port}`))