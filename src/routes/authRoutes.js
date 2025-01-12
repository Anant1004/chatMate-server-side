import express from 'express'
const router = express.Router();
import { signupUser, loginUser, logoutUser, getAllUsersExceptLoggedIn, getCurrentUser, getUserById,updateAvatar } from '../controllers/authControllers.js';
import authenticate from '../middlewares/authorization.js';
import { upload } from '../middlewares/multer.js';

router.post('/signup', signupUser);
router.post("/updateAvatar",authenticate,upload.single('avatar'),updateAvatar);
router.post('/login', loginUser);
router.post('/logout', authenticate, logoutUser);
router.get('/users', authenticate, getAllUsersExceptLoggedIn);
router.get('/me', authenticate, getCurrentUser);
router.get('/user/:id', getUserById)



export default router