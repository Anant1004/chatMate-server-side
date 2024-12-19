import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name:'dqznmhhtv', 
    api_key:'981487363648674', 
    api_secret:'CN2GXziTKZEEJKjvT8KwwX8JQ5M',
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null;
        const result = await cloudinary.uploader.upload(localFilePath , {
            resource_type: 'auto',
        });
        fs.unlinkSync(localFilePath);
        return result;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        fs.unlinkSync(localFilePath);
        return null;
    }
};

export { uploadOnCloudinary};
