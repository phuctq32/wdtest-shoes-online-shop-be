import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { userController } from "../controllers/user.js";
const router = Router();

router.get("/profile", isAuth, userController.getUserProfile);
router.get("/is-admin", isAuth, isAdmin);
export default router;
