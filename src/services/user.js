import User from "../models/user.js";
import AppError from "../utils/error.js";

export const getCart = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new AppError(404, "User not found");
        }

        await user.populate({
            path: "cart.productId",
            select: "name brand price discount shoeCode image",
            populate: {
                path: "brand",
            }
        })

        return user.cart;
    } catch (err) {
        throw err;
    }
}

export const addToCart = async (userId, item) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new AppError(404, "User not found");
        }

        await user.populate('cart.productId', '-description -status');
        updatedCart = user.cart;
        const existingProductIndex = updatedCart.findIndex(cartItem => (cartItem.productId.toString() === item.productId.toString()) & (cartItem.size === item.size));
        if (existingProductIndex > -1) {
            updatedCart[existingProductIndex].quantity += item.quantity;
        } else {
            updatedCart.push({ 
                productId: productId,
                size: item.size,
                quantity: item.quantity,
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

export const getCartPrice = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new AppError(404, "User not found");
        }

        await user.populate('cart.productId', '-description -status');
        const totalPrice = user.cart.reduce((result, cartItem) =>{
            result += cartItem.productId.price * (1 - cartItem.productId.discount) * cartItem.quantity
        }, 0);

        return totalPrice;
    } catch (err) {
        throw err;
    }
}