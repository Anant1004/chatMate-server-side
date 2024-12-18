import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: 'chatmateapp', 
    api_key: '171755585546456', 
    api_secret: 'Njh1RM8p8pVJcCnjdciQLBmBE0k' 
});

const uploadOnCloudinary = async (file) => {
    try {
        if (!file.path) {
            throw new Error("File path not found.");
        }

        console.log("Uploading file from path:", file.path);

        // Upload kare ga file  to Cloudinary
        const result = await cloudinary.uploader.upload(file.path , {
            resource_type: 'auto',
        });

        console.log("File uploaded successfully to Cloudinary:", result.url);

      //  ye delete kar de ga file after upload to cloudinary
        fs.unlinkSync(file.path);

        return result;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message);
        throw error;
    }
};

export { uploadOnCloudinary };
