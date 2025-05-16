import {login} from '../controllers/SignupController.js';
import express from 'express';
import cors from 'cors';

const loginRouter = express.Router();

loginRouter.use(cors());

loginRouter.post('/api/authenticate', login);

export default loginRouter;