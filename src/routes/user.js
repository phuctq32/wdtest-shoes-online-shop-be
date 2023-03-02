import { Router } from "express";
import { authController } from "../controllers/auth.js";
import { isAuth } from "../middlewares/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = Router();

router.get("/is-admin", isAuth, isAdmin);
export default router;
