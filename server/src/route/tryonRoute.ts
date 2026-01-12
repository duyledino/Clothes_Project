import express, { type Express } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js';
import { getTryOnUsingImage } from '../controller/tryon/controller.js';
import { upload } from '../config/multer.js';
import { authenticateUser } from '../middleware/authentication.js';

const router = express.Router();

const init = (app:Express)=>{
    router.post('/uploadCLothes',asyncHandler(authenticateUser),upload.array("photos",12),asyncHandler(getTryOnUsingImage));
    return app.use("/api/v1/tryon",router);
}

export default init;