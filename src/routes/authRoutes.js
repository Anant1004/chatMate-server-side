import express from 'express'
const router = express.Router();
import {signupUser, loginUser, logoutUser} from '../controllers/authControllers.js';

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);


export default router