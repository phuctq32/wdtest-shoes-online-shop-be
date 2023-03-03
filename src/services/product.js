import Product from "../models/product.js";
import AppError from "../utils/error.js";
import { upload } from "../utils/imageHandler.js";

export const createProduct = async (productData) => {
    try {
        const existingProduct = await Product.findOne({ shoeCode: productData.shoeCode });
        if (existingProduct) {
            throw new AppError(409, "Product already exists");
        }

        const newProduct = await Product({
            name: productData.name,
            brandName: productData.brandName,
            shoeCode: productData.shoeCode,
            description: productData.description,
            price: productData.price,
            sizes: productData.sizes,
            image: productData.image
        });

        if (productData.discount) {
            newProduct.discount = productData.discount;
        }

        await newProduct.save();

    } catch (err) {
        throw err;
    }
}