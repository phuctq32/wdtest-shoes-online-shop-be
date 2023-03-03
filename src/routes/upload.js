import { Router } from "express";
import multer from "../middlewares/multer.js"
import * as uploadController from "../controllers/upload.js";

const router = Router();

router.post("/upload", multer.single("image"), uploadController.uploadImage);

export default router;