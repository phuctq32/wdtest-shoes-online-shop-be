import * as receiptService from "../services/receipt.js"

export const createReceipt = async (req, res, next) => {
    try {
        const receiptData = {
            products: req.body.products,
            customerInfo: req.body.customerInfo
        }

        const receipt = await receiptService.createReceipt(req.body.userId, receiptData);

        res.status(201).json({ message: "Create receipt successfully", receipt });
    } catch (err) {
        next(err);
    }
}

export const getReceiptsByUserId = async (req, res,next) => {
    try{
        const receipts = await receiptService.getReceiptsByUserId(req.userId);

        res.status(200).json({ numReceipts: receipts.length, receipts });
    }
    catch(err){
        next(err);
    }
}

export const getReceiptById = async (req, res,next) => {
    try{
        const receipt = await receiptService.getReceiptById(req.params.receiptId);

        res.status(200).json({receipt});
    }
    catch(err){
        next(err);
    }
}


