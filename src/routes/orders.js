import { Router } from "express";
import * as orders from "../controllers/order.js"
import { orderValidations } from "../validations/orders.js";

const router = Router();

router.get('/createReceipt',orderValidations, orders.createReceipt)
router.get('/getReceipt', orders.getReceipt)
export default router;