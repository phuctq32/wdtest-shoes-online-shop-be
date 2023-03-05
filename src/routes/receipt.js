import { Router } from "express";
import * as receiptController from "../controllers/receipt.js"
import isAuth from "../middlewares/isAuth.js";
import { receiptValidations } from "../validations/receipt.js";

const router = Router();

router.post('/receipts', isAuth, receiptValidations, receiptController.createReceipt);

router.get('/receipts', isAuth, receiptController.getReceiptsByUserId);

router.get('/receipts/:receiptId', receiptController.getReceiptById);

export default router;