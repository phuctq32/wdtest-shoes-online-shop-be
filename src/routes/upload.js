import { Router } from "express";
import multer from "../middlewares/multer.js"
import * as uploadController from "../controllers/upload.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router();

router.post("/upload", isAuth, isAdmin, multer.single("image"), uploadController.uploadImage);

export default router;