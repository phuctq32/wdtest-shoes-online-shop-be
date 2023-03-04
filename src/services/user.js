import User from "../models/user.js";
import AppError from "../utils/error.js";

export const addToCart = async (userId, item) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new AppError(404, "User not found");
        }

        await user.populate('cart.productId', '-description -status');
        updatedCart = user.cart;
        const existingProductIndex = updatedCart.findIndex(cartItem => cartItem.productId.toString() === item.productId.toString());
        if (existingProductIndex > -1) {
            updatedCart[existingProductIndex].quantity += item.quantity;
        } else {
            updatedCart.push({ 
                productId: productId,
                quantity: quantity,
            })
        }

        user.cart = updatedCart;
        await user.save();

        const result = updatedCart.map(cartItem => ({
            ...cartItem,
            price: cartItem.productId.price * cartItem.quantity * (1 - cartItem.productId.discount)
        }))

        return result;
    } catch (err) {
        throw err;
    }
}