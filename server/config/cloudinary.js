import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_APP_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary