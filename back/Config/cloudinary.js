import {CloudinaryStorage} from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ecommerce',
        allowedFormats: ['png', 'jpeg', 'jpg', 'webp']
    }
});

export { storage, cloudinary}