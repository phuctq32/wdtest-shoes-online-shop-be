import Brand from "../models/brand.js";
import Product from "../models/product.js";

export const getData = async () => {
  try {
    const brands = await Brand.find();
    const products = await Product.find();

    return { brands, products };
  } catch (error) {
    next(error);
  }
};
