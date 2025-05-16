import {signup} from '../controllers/SignupController.js';
import express from 'express';
import cors from 'cors';

const signupRouter = express.Router();

signupRouter.use(cors());

signupRouter.post('/api/signup', signup);

export default signupRouter;