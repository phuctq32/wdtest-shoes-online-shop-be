import { Router } from "express";
import * as authController from "../controllers/auth.js";
import validationErrorHandler from "../middlewares/validationErrorHandler.js";
import { signupValidations } from "../validations/auth.js";

const router = Router();

// POST
router.post("/signup", signupValidations, validationErrorHandler, authController.signup);

export default router;