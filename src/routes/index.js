import { Router } from "express";
import authRoutes from "./auth.js";

import productRoutes from "./product.js";
import uploadRoutes from "./upload.js";
import ordersRoutes from "./orders.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/orders", ordersRoutes);
router.use(authRoutes);
router.use(productRoutes);
router.use(uploadRoutes);


export default router;