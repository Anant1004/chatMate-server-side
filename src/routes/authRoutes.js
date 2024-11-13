import express from 'express'
const router = express.Router();
import {signupUser, loginUser, logoutUser} from '../controllers/authControllers.js';
import authenticate from '../middlewares/authorization.js';

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/logout',authenticate,logoutUser);


export default router