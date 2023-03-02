import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import AppError from "../utils/error.js";
import dotenv from "dotenv";
dotenv.config();
const login = async (email, password) => {
  try {
    const user = await User.getByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new AppError(401, "Unauthorized");
      throw error;
    }
    console.log(process.env.SECRET_KEY);
    const token = jwt.sign(
      { email: email, userID: user._id.toString(), role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
    console.log(token);
    return { token, user };
  } catch (error) {
    throw error;
  }
};

export const authService = { login };
