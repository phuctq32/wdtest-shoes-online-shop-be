import bcrypt from "bcryptjs";
import User from "../models/user.js";
import AppError from "../utils/error.js";

export const getUser = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new AppError(404, "User not found");
    }

    await (
      await user.populate("cart.productId", "-sizes -description -status")
    ).populate("cart.productId.brand", "-description");

    return user;
  } catch (err) {
    throw err;
  }
};

export const getCart = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    await (
      await user.populate("cart.productId", "-sizes -description -status")
    ).populate("cart.productId.brand", "-description");

    const result = user.cart.map((cartItem) => ({
      productId: cartItem.productId,
      size: cartItem.size,
      quantity: cartItem.quantity,
      price: cartItem.productId.price * cartItem.quantity * (1 - cartItem.productId.discount),
    }));

    return result;
  } catch (err) {
    throw err;
  }
};
export const edit = async (userId, update) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }
    if (update.name) {
      user.name = update.name;
    }
    if (update.phone) {
      user.phone = update.phone;
    }
    if (update.address) {
      user.address = update.address;
    }
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

export const editPassword = async (userId, oldPassword, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new AppError(404, "User not found");
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      const error = new AppError(409, "Current password is wrong");
      throw error;
    }

    if (newPassword === oldPassword) {
      throw new AppError(400, "New password is matches old password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    return;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (userId, item) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const updatedCart = user.cart;
    const existingProductIndex = updatedCart.findIndex(
      (cartItem) => cartItem.productId.toString() === item.productId.toString() && cartItem.size === item.size
    );

    if (existingProductIndex > -1) {
      updatedCart[existingProductIndex].quantity += item.quantity;
    } else {
      updatedCart.push({
        productId: item.productId,
        size: item.size,
        quantity: item.quantity,
      });
    }

    await user.populate("cart.productId", "-description -status -sizes");

    user.cart = updatedCart;
    await user.save();

    const result = updatedCart.map((cartItem) => ({
      productId: cartItem.productId,
      size: cartItem.size,
      quantity: cartItem.quantity,
      price: cartItem.productId.price * cartItem.quantity * (1 - cartItem.productId.discount),
    }));

    return result;
  } catch (err) {
    throw err;
  }
};

export const getCartPrice = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    await user.populate("cart.productId", "price discount");
    const totalPrice = user.cart.reduce(
      (result, cartItem) => result + cartItem.productId.price * (1 - cartItem.productId.discount) * cartItem.quantity,
      0
    );

    return totalPrice;
  } catch (err) {
    throw err;
  }
};

export const updateQuantity = async (userId, item) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    if (item.quantity === 0) {
      user.cart = user.cart.filter(
        (cartItem) =>
          (cartItem.productId._id.toString() === item.productId && cartItem.size !== item.size) ||
          cartItem.productId._id.toString() !== item.productId
      );
      await user.save();
      return user.cart;
    }

    await user.populate("cart.productId", "-sizes -description -status");
    const productIds = user.cart.map((cartItem) => cartItem.productId._id.toString());
    const cartItemSizes = user.cart.map((cartItem) => cartItem.size);
    if (!productIds.includes(item.productId.toString()) || !cartItemSizes.includes(item.size)) {
      throw new AppError(400, "Product not found in cart");
    }

    const cartItemIndex = user.cart.findIndex(
      (cartItem) => cartItem.productId._id.toString() === item.productId.toString() && cartItem.size === item.size
    );
    user.cart[cartItemIndex].quantity = item.quantity;
    await user.save();

    return user.cart;
  } catch (err) {
    throw err;
  }
};

export const removeCartItem = async (userId, itemToRemove) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    await user.populate("cart.productId", "price discount");
    const existingCartItem = user.cart.find(
      (cartItem) => cartItem.productId._id.toString() === itemToRemove.productId && cartItem.size === itemToRemove.size
    );

    if (!existingCartItem) {
      throw new AppError(400, "Product not found in cart");
    }

    user.cart = user.cart.filter((cartItem) => cartItem !== existingCartItem);
    await user.save();

    return user.cart;
  } catch (err) {
    throw err;
  }
};

export const removeCartItems = async (userId, itemsToRemove) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    await user.populate("cart.productId");

    //   const testItem = user.cart.find(cartItem =>
    //     cartItem.productId._id.toString() === itemsToRemove[1].productId &
    //     cartItem.size === itemsToRemove[1].size
    // );
    // console.log("test item: ", testItem);

    for (const item of itemsToRemove) {
      const existingCartItem = user.cart.find(
        (cartItem) => cartItem.productId._id.toString() === item.productId && cartItem.size === item.size
      );

      if (!existingCartItem) {
        throw new AppError(400, "Product not found in cart");
      }

      user.cart = user.cart.filter((cartItem) => cartItem !== existingCartItem);
    }
    await user.save();

    return user.cart;
  } catch (err) {
    throw err;
  }
};

export const removeAllCartItems = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    user.cart = [];
    await user.save();

    return;
  } catch (err) {
    throw err;
  }
};
