import express from 'express';
import { uploadOnCloudinary } from '../utils/cloudinary.setup.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/profilePicture', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: "No file uploaded." });
        }
        // ye send kar dega local file uploadOnCloudinary.setup.js ko 
        const result = await uploadOnCloudinary(req.file);

        res.status(200).send({ message: "File uploaded successfully", url: result.url });
    } catch (error) {
        res.status(500).send({ message: "Error uploading file", error: error.message });
    }
});

export default router;
