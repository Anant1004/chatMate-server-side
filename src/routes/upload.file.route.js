import express from 'express';
import {uploadOnCloudinary} from '../utils/cloudinary.setup.js';
import { upload } from '../middlewares/multer.middleware.js';
const router = express.Router();

router.post('/profilePicture', upload.single('file'), uploadOnCloudinary);

export default router