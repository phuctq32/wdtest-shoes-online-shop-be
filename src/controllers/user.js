import * as userService from "../services/user.js";

export const getUserProfile = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await userService.getUser(userId);

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

export const editProfile = async (req, res, next) => {
  const userId = req.userId;
  const { name, phone, address } = req.body;
  try {
    await userService.edit(userId, { name, phone, address });
    res.status(200).json({ message: "UPDATE_SUCCESSFULLY" });
  } catch (error) {
    next(err);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const item = {
      productId: req.body.productId,
      size: req.body.size,
      quantity: req.body.quantity,
    };

    const updatedCart = await userService.addToCart(userId, item);

    res.status(200).json({ cart: updatedCart });
  } catch (err) {
    next(err);
  }
};

export const editPassword = async (req, res, next) => {
  // change password will get new token
  const userId = req.userId;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  try {
    await userService.editPassword(userId, oldPassword, newPassword);
    res.status(200).json({ message: "Changed password successfully" });
  } catch (error) {
    next(error);
  }
};

export const getCartPrice = async (req, res, next) => {
  try {
    const cartPrice = await userService.getCartPrice(req.userId);

    res.status(200).json({ cartPrice });
  } catch (err) {
    next(err);
  }
};

export const updateQuantity = async (req, res, next) => {
  try {
    const item = {
      productId: req.body.productId,
      size: req.body.size,
      quantity: req.body.quantity,
    };
    const updatedCart = await userService.updateQuantity(req.userId, item);

    res.status(200).json({ message: "Updated item's quantity successfully", cart: updatedCart });
  } catch (err) {
    next(err);
  }
};

export const removeCartItem = async (req, res, next) => {
  try {
    const item = {
      productId: req.body.productId,
      size: req.body.size,
    };
    const updatedCart = await userService.removeCartItem(req.userId, item);

    res.status(200).json({ message: "Removed cart item", cart: updatedCart });
  } catch (err) {
    next(err);
  }
};

export const removeCartItems = async (req, res, next) => {
  try {
    const items = req.body.items;
    const updatedCart = await userService.removeCartItems(req.userId, items);

    res.status(200).json({ message: "Removed cart item", cart: updatedCart });
  } catch (err) {
    next(err);
  }
};

export const removeAllCartItems = async (req, res, next) => {
  try {
    await userService.removeAllCartItems(req.userId);

    res.status(200).json({ message: "Removed all cart items" });
  } catch (err) {
    next(err);
  }
};
