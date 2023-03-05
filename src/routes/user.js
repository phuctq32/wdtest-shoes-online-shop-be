import { Router } from "express";
import isAuth from "../middlewares/isAuth.js";
import * as userController from "../controllers/user.js";
import { changePwValidation } from "../validations/user.js";
import validationErrorHandler from "../middlewares/validationErrorHandler.js";
const router = Router();

router.get("/user/profile", isAuth, userController.getUserProfile);

router.put("/user/edit", isAuth, userController.editProfile);

router.put("/user/change-password", isAuth, changePwValidation, validationErrorHandler, userController.editPassword);

router.get("/user/cart", isAuth, userController.getCart);

router.get("/user/cart/total-price", isAuth, userController.getCartPrice);

router.put("/user/cart/add", isAuth, userController.addToCart);

router.put("/user/cart/update-quantity", isAuth, userController.updateQuantity);

router.put("/user/cart/remove", isAuth, userController.removeCartItem);

router.put("/user/cart/remove-some", isAuth, userController.removeCartItems);

router.put("/user/cart/remove-all", isAuth, userController.removeAllCartItems);


export default router;
