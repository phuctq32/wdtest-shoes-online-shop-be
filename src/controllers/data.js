import { getData } from "../services/data.js";

export const getCommonData = async (req, res, next) => {
  try {
    const { brands, products } = await getData();
    res.status(200).json({ brands, products });
  } catch (error) {
    next(error);
  }
};
