import { Router } from "express";
import * as authController from "../controllers/auth.js";
import validationErrorHandler from "../middlewares/validationErrorHandler.js";
import { signupValidations, forgotPasswordValidations, resetPasswordValidations } from "../validations/auth.js";

const router = Router();

// POST
router.post("/signup", signupValidations, validationErrorHandler, authController.signup);

router.post('/forgot-password', forgotPasswordValidations, validationErrorHandler, authController.forgotPassword);

router.post('/reset-password/:token', resetPasswordValidations, validationErrorHandler, authController.resetPassword);

export default router;