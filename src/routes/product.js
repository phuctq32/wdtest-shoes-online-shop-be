import { Router } from "express";
import * as productController from "../controllers/product.js";
import { productValidations } from "../validations/product.js";

const router = Router();

// These APIs are used by admin
router.post("/products", productValidations, productController.createProduct);


export default router;