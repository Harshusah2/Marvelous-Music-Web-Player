import { search } from "../controllers/SearchController.js";
import express from 'express';
import cors from 'cors';

const searchRouter = express.Router();

searchRouter.use(cors());

searchRouter.get('/api/search', search);

export default searchRouter;