import { Router } from "express";
import * as productController from "../controllers/product.js";
import isAdmin from "../middlewares/isAdmin.js";
import isAuth from "../middlewares/isAuth.js";
import { productValidations } from "../validations/product.js";

const router = Router();

// These APIs are used by admin
router.post(
  "/products",
  isAuth,
  isAdmin,
  productValidations,
  productController.createProduct
);

// APIs for user
router.get("/products", productController.getProducts);

router.get("/products/search", productController.searchProduct);
router.get("/products/:productId", productController.getProductById);

export default router;
