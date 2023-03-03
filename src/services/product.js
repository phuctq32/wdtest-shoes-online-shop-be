import Product from "../models/product.js";
import Brand from "../models/brand.js";
import AppError from "../utils/error.js";

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

export const getProductsWithConditions = async (filter) => {
    try {
        let brand;
        if (filter.brandName) {
            brand = await Brand.findOne({ name: filter.brandName.toString().toUpperCase()});
            if (!brand) {
                throw new AppError(404, "Resource not found");
            }
        }

        const products = await Product.find({ brand: brand ? brand._id : { $ne: null } })
            .skip((filter.page - 1) * filter.limit)
            .limit(filter.limit)
            .sort({ createdAt: -1 });

        return products;
    } catch (err) {
        throw err;
    }
}

export const getProductById = async (id) => {
    try {
        const product = await Product.findById(id);
        if (!product) {
            throw new AppError(404, "Resource not found");
        }

        return product;
    } catch (err) {
        throw err;
    }
}