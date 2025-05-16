import express from 'express';
import cors from 'cors';
import { verifyToken } from '../middleware/VerifyToken.js';
import { createplaylist, getplaylists } from '../controllers/PlaylistController.js';
import { addsongplaylist, removesongplaylist, getPlaylistSongs } from '../controllers/PlaylistController.js';

const playlistRouter = express.Router();

playlistRouter.use(cors());

playlistRouter.post('/api/createplaylist', verifyToken, createplaylist);

playlistRouter.get('/api/getplaylist', verifyToken, getplaylists);

playlistRouter.post('/api/addsongtoplaylist', verifyToken, addsongplaylist);

playlistRouter.post('/api/removesongfromplaylist', verifyToken, removesongplaylist);

playlistRouter.get('/api/getplaylistsongs/:playlistId', verifyToken, getPlaylistSongs);

export default playlistRouter;