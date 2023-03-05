import { Router } from "express";
import authRoutes from "./auth.js";

import productRoutes from "./product.js";
import uploadRoutes from "./upload.js";
import userRoutes from "./user.js";
import brandRoutes from "./brand.js";
import receiptRoutes from "./receipt.js";
import dataRoutes from "./data.js";

const router = Router();

router.use(authRoutes);
router.use(receiptRoutes);
router.use(productRoutes);
router.use(uploadRoutes);
router.use(userRoutes);
router.use(brandRoutes);
router.use(dataRoutes);

export default router;
