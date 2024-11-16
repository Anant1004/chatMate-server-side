import express from 'express'
const router = express.Router();
import {signupUser, loginUser, logoutUser, getUser} from '../controllers/authControllers.js';
import authenticate from '../middlewares/authorization.js';

router.post('/signup',signupUser);
router.post('/login',loginUser);
router.post('/logout',authenticate,logoutUser);
router.get('/user',getUser);


export default router