import { Router } from "express";
import { authController } from "../controllers/auth.js";
import { isAuth } from "../middlewares/isAuth.js";
const router = Router();

router.post("/login", authController.login);
// router.get("/product", isAuth, getProduct);
// router.get("/user", isAuth, isAdmin, getUserProfile);
export default router;
