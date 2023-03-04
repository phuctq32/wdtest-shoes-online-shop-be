import { Router } from "express";
import isAdmin from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";
import { brandValidations } from "../validations/brand.js";
import * as brandController from "../controllers/brand.js";

const router = Router();

// POST
router.post("/brands/create", isAuth, isAdmin, brandValidations, brandController.createBrand);

// GET
router.get("/brands", brandController.getBrands);

// PUT
router.put("/brands/:brandId", isAuth, isAdmin, brandValidations, brandController.updateBrand);

export default router;