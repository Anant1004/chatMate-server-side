import express from 'express'
const router = express.Router();
import {signupUser, loginUser, logoutUser} from '../controllers/authControllers.js';

router.get('/signup',signupUser);
router.get('/login',loginUser);
router.get('/logout',logoutUser);


export default router