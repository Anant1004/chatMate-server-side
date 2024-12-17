import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { upload }  from '../middlewares/multer.middleware.js';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,      
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (upload) => {
  try {
    if (!upload.file.path) {
      return null;
    }
    console.log("upload",upload.file.path);
    
    const result = await cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg' , {
        resource_type: 'auto'
    });
    console.log("file uploaded successfully",result.url);
    
    return result;
  } catch (error) {
    fs.unlinkSync(upload.file.path);
    return null;
  }
};
export  { uploadOnCloudinary };
