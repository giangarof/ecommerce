import multer from 'multer';
import {storage} from './cloudinary.js';

const upload = multer({storage:storage});

const multerProduct = upload.array("image");

export {multerProduct}