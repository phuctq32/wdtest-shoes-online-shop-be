import * as productService from "../services/product.js";

export const createProduct = async (req, res, next) => {
  try {
    const productData = {
      name: req.body.name,
      brand: req.body.brand,
      shoeCode: req.body.shoeCode,
      description: req.body.description,
      sizes: req.body.sizes,
      price: parseFloat(req.body.price),
      discount: parseFloat(req.body.discount),
      image: req.body.imageUrl,
    };

    await productService.createProduct(productData);

    res.status(201).json({ message: "Create product successfully" });
  } catch (err) {
    next(err);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    let page = req.query.page ? parseInt(req.query.page) : null;
    if (page & (page <= 0)) {
      page = 1;
    }

    let limit = req.query.limit ? parseInt(req.query.limit) : null;
    if (limit & (limit <= 0)) {
      limit = 16;
    }

    const brandName = req.query.brandName ? req.query.brandName : null;

    const filter = {
      page,
      limit,
      brandName,
    };
    const products = await productService.getProductsWithConditions(filter);

    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    let product;
    if (req.params.productId) {
      product = await productService.getProductById(req.params.productId);
    }

    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};

export const searchProduct = async (req, res, next) => {
  try {
    const searchStr = req.query.q;
    let page = req.query.page ? parseInt(req.query.page) : null;
    if (page & (page <= 0)) {
      page = 1;
    }

    let limit = req.query.limit ? parseInt(req.query.limit) : null;
    if (limit & (limit <= 0)) {
      limit = 16;
    }

    const filter = { page, limit }
    const products = await productService.searchProduct(searchStr, filter);

    res.status(200).json({products});
  } catch (error) {
    next(error);
  }
};
