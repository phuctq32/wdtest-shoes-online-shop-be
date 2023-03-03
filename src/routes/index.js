import { Router } from "express";
import authRoutes from "./auth.js";
import productRoutes from "./product.js";
import uploadRoutes from "./upload.js";
const router = Router();

router.use(authRoutes);
router.use(productRoutes);
router.use(uploadRoutes);

export default router;