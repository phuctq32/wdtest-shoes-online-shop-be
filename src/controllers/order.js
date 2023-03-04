import Receipt from "../models/receipt.js"
import User from "../models/user.js"
import Product from "../models/product.js"

import * as orderService from "../services/order.js"
export const createReceipt = async (req, res, next) => {
    try {
        const receiptData = {
            products: req.body.products,
            userID: req.body.userID,
            customerInfo: req.body.customerInfo
        }

        await orderService.createReceipt(receiptData);

        res.status(201).json({ message: "Create receipt successfully"})
    } catch (err) {
        next(err);
    }
}
export const getReceipt = async (req, res,next) => {
    try{
        let receipts = await Receipt.find({ userId: req.body.userID });
        res.json(receipts);
    }
    catch(err){
        next(err);
    }
}


