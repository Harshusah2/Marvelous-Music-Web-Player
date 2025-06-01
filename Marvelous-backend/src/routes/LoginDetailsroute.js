import express from 'express';
import { getLoginDetails } from '../controllers/SignupController.js';
import { verifyToken } from '../middleware/VerifyToken.js';
import cors from 'cors';

const loginDetailrouter = express.Router();

loginDetailrouter.use(cors());

loginDetailrouter.get('/api/logindetails', verifyToken, getLoginDetails);

export default loginDetailrouter;