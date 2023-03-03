import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
import { userController } from "../controllers/user.js";
const router = Router();

router.get("/profile", isAuth, userController.getProfile);
router.get("/is-admin", isAuth, isAdmin);
router.put("/edit-profile", isAuth, userController.editProfile);
router.put("/edit-password", isAuth, userController.editPassword);
export default router;
