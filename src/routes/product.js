import { Router } from "express";
import * as productController from "../controllers/product.js";
import { productValidations } from "../validations/product.js";

const router = Router();

// These APIs are used by admin
router.post("/products", productValidations, productController.createProduct);

// APIs for user
router.get("/products", productController.getProducts);

router.get("/products/:productId", productController.getProductById);


export default router;