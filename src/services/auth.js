import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
const login = async (email, password) => {
  try {
    const user = await User.getByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { email: email, userID: user._id.toString() },
      "secret-key",
      { expiresIn: "2h" }
    );
    // console.log(token);
    return { token, user };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const authService = { login };
