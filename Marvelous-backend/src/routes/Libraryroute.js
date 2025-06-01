import express from 'express';
import cors from 'cors';
import { verifyToken } from '../middleware/VerifyToken.js';
import { addsong, removesong, getlibrarysongs } from '../controllers/LibraryController.js';

const libraryRouter = express.Router();

libraryRouter.use(cors());

libraryRouter.post('/api/library/addsong', verifyToken, addsong);

libraryRouter.delete('/api/library/removesong', verifyToken, removesong);

libraryRouter.get('/api/library/getlibrarysong', verifyToken, getlibrarysongs);

export default libraryRouter;