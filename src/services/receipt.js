import Receipt from "../models/receipt.js";
import AppError from "../utils/error.js";
import Product from "../models/product.js";
import User from "../models/user.js";

export const createReceipt = async (userId, receiptData) => {
    try {
        if (userId) {
            const user = await User.findById(userId);
            if (!user) {
                throw new AppError(404, "User not found");
            }
        }
            
        let products = receiptData.products;
        let productsOrdered = [];
        let existingProducts = [];
        for (const product of products) {

            const existingProduct = await Product.findOne({ 
                _id: product.productId,
                sizes: { $elemMatch: { name: product.size, quantity: { $gt : 0 }}},
                status: "active"});
            if (!existingProduct) {
                throw new AppError(404, "Product not found");
            }

            existingProducts.push(existingProduct);

            // check if product quantity in receipt greater than existing product quantity
            const sizeIndex = existingProduct.sizes.findIndex(({ name }) => name === product.size);
            if (existingProduct.sizes[sizeIndex].quantity < product.quantity) {
                throw new AppError(400, "Product quantity is greater than existing product quantity");
            }

            // update quantity & sold
            existingProduct.sizes[sizeIndex].sold += product.quantity;
            existingProduct.sizes[sizeIndex].quantity -= product.quantity;

            productsOrdered.push({
                productId: existingProduct._id.toString(),
                name: product.name,
                size: product.size,
                quantity: product.quantity,
                unitPrice: product.unitPrice
            });
        }

        const totalPrice = productsOrdered.reduce((sum, prod) => sum + prod.unitPrice * prod.quantity, 0);

        const bill = {
            products: productsOrdered,
            date: Date.now(),
            totalPrice: totalPrice,
            userId: userId ? userId : null,
            customerInfo: receiptData.customerInfo
        }

        const receipt = new Receipt(bill);
        await receipt.save();
        for (const item of existingProducts) {
            await item.save();
        }

        await (await receipt.populate("products.productId", "name shoeCode brand image")).populate("products.productId.brand", "name");

        return receipt;
    } catch (err) { 
        throw err; 
    }
}

export const getReceiptsByUserId = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new AppError(404, "User not found");
        }

        const receipts = await Receipt.find({ userId: user._id })
            .populate("products.productId", "name shoeCode brand image")
            .populate("products.productId.brand", "name");

        return receipts;
    } catch (err) {
        throw err;
    }
}

export const getReceiptById = async (receiptId) => {
    try {
        const receipt = await Receipt.findById(receiptId);
        if (!receipt) {
            throw new AppError(404, "Receipt not found");
        }

        await (await receipt.populate("products.productId", "name shoeCode brand image")).populate("products.productId.brand", "name");

        return receipt;
    } catch (err) {
        throw err;
    }
}