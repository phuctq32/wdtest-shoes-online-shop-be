import { Router } from "express";
import authRoutes from "./auth.js";
import authUser from "./user.js";
const router = Router();

router.use("/auth", authRoutes);
router.use("/user", authUser);
export default router;
