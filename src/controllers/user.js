import User from "../models/user.js";
import * as userService from "../services/user.js";

export const getUserProfile = async (req, res, next) => {
  const userId = req.userID;

  try {
    const user = await User.getByID(userId);
    res.status(200).json({ user: user });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await userService.getCart(req.userId);

    res.status(200).json({ cart });
  } catch (err) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const item = { productId: req.body.productId, quantity: req.body.quantity };

    const updatedCart = await userService.addToCart(userId, item);

    res.status(200).json({ updatedCart });
  } catch (err) {
    next(err);
  }
};

export const getCartPrice = async (req, res, next) => {
  try {
    const cartPrice = userService.getCartPrice(req.userId);

    res.status(200).json({ cartPrice });
  } catch (err) {
    next(err);
  }
};

export const updateQuantity = async (req, res, next) => {
  try {
    const item = { productId: req.body.productId, quantity: req.body.quantity };
    await userService.updateQuantity(req.userId, item);

    res.status(200).json({ message: "Updated item's quantity successfully" });
  } catch (err) {
    next(err);
  }
};
