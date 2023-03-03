import { Router } from "express";
import authRoutes from "./auth.js";
import productRoutes from "./product.js";
import uploadRoutes from "./upload.js";
import authUser from "./user.js";
const router = Router();

router.use(authRoutes);
router.use(productRoutes);
router.use(uploadRoutes);
router.use(authUser);
export default router;
