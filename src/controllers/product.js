import * as productService from "../services/product.js"

export const createProduct = async (req, res, next) => {
    try {
        const productData = {
            name: req.body.name,
            brandName: req.body.brandName,
            shoeCode: req.body.shoeCode,
            description: req.body.description,
            sizes: req.body.sizes,
            price: parseFloat(req.body.price),
            discount: parseFloat(req.body.discount),
            image: req.body.imageUrl
        }

        await productService.createProduct(productData);

        res.status(201).json({ message: "Create product successfully"})
    } catch (err) {
        next(err);
    }
}

export const getProducts = async (req, res, next) => {
    try {
        const products = await productService.getProductsWithConditions();

        res.status(200).json({ products });
    } catch (err) {
        next(err);
    }
}

