import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";
import * as userController from "../controllers/user.js";
const router = Router();

router.get("/profile", isAuth, userController.getUserProfile);
router.get("/is-admin", isAuth, isAdmin);

router.get("/users/cart", isAuth, userController.getCart);

router.get("/users/cart/total-price", isAuth, userController.getCartPrice);

router.put("/users/cart/add", isAuth, userController.addToCart);

router.put("/users/cart/update-quantity", isAuth, userController.updateQuantity);

router.put("/users/cart/remove", isAuth);

router.put("/users/cart/remove-all", isAuth);

export default router;
