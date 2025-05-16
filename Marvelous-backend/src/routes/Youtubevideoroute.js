import express from 'express';
// import cors from 'cors';
import { youtubeaudioconvertor } from '../controllers/YoutubevideoController.js';

const youtubeVideoRouter = express.Router();

// youtubeVideoRouter.use(cors());

youtubeVideoRouter.post('/api/youtubevideoconvert', youtubeaudioconvertor);

export default youtubeVideoRouter;
// This code sets up an Express router for handling YouTube video conversion requests.