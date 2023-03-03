import { Router } from "express";
import authRoutes from "./auth.js";
import ordersRoutes from "./orders.js";


const router = Router();

router.use("/auth", authRoutes);
router.use("/orders", ordersRoutes);

export default router;