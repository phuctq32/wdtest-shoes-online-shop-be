import User from "../models/user.js";
import AppError from "../utils/error.js";

const getUserProfile = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await User.getByID(userId);
    // console.log(user.cart.products);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const userController = { getUserProfile };
