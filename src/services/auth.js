import bcrypt from "bcryptjs";
import User from "../models/user.js";
const login = async (email, password) => {
  try {
    const user = await User.getByEmail(email);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Unauthorized");
      error.statusCode(401);
      throw error;
    }

    const token = jwt.sign(
      { email: email, userID: user._userID.toString() },
      "secret-key",
      { expiresIn: "2h" }
    );
    return { token, user };
  } catch (error) {
    error.statusCode(500);
    throw error;
  }
};

export const authService = { login };
