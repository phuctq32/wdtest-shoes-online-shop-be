import User from "../models/user.js";
import AppError from "../utils/error.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getByID = async function (userId) {
  try {
    const user = await User.findById(userId);

    // const user = await this.findOne({ _id: userID });
    if (!user) {
      const error = new AppError(404, "USER_NOT_FOUND");
      throw error;
    }
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};
const edit = async (userId, update) => {
  try {
    if (update.password || update.role || update.email || update.cart) {
      // can not change password, role, email and cart
      const error = new AppError(405, "METHOD_NOT_ALLOWED");
      throw error;
    }
    const user = await User.findOneAndUpdate({ _id: userId }, update, {
      new: true,
    });
    if (!user) {
      const error = new AppError(404, "USER_NOT_FOUND");
      throw error;
    }
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};

const editPassword = async (userId, oldPassword, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new AppError(404, "USER_NOT_FOUND");
      throw error;
    }
    if (!oldPassword || !newPassword) {
      const error = new AppError(400, "MISSING_PASSWORD");
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      const error = new AppError(409, "WRONG_PASSWORD");
      throw error;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 7);
    user.password = hashedPassword;
    await user.save();
    const token = jwt.sign(
      { email: user.email, userId: user._id.toString(), role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
    return token;
  } catch (error) {
    throw error;
  }
};
export const userService = { getByID, edit, editPassword };
