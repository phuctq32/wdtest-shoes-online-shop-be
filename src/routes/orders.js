import { Router } from "express";
import orders from "../controllers/OrdersController.js"

const router = Router();

router.get('/createReceipt', orders.createReceipt)
router.get('/getReceipt', orders.getReceipt)
export default router;