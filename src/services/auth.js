import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";
import Token from "../models/token.js";
import AppError from "../utils/error.js";
import sendEmail, { get_html_reset_password } from "../utils/sendEmail.js";

dotenv.config();

export const login = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new AppError("User not found");
    }
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
    return token;
  } catch (error) {
    throw error;
  }
};

export const signup = async (userData) => {
    try {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new AppError(409, "Email already exists");
        }

        const hashedPassword = await bcrypt.hashSync(userData.password, 12);
        const user = new User({
            email: userData.email,
            name: userData.name,
            password: hashedPassword,
            phone: userData.phone,
            address: userData.address
        });

        await user.save();
        
    } catch (err) {
        throw err;
    }
}

export const forgotPassword = async (recipientEmail) => {
    let tokenString;
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            return next(err);
        }

        tokenString = buffer.toString('hex');
    });

    try {
        const existingUser = await User.findOne({ email: recipientEmail });
        if (!existingUser) {
            throw new AppError(404, "Resource not found");
        }
        

        const token = new Token({
            value: tokenString,
            expiredAt: Date.now() + 3600000,
            userId: existingUser._id.toString(),
        });
        await token.save();

        sendEmail({
            from: process.env.EMAIL,
            to: recipientEmail,
            subject: 'Reset Password',
            html: get_html_reset_password(`http://localhost:8080/reset-password/${token.value}`)
        });

        return token.value;
    } catch (err) {
        throw err;
    }
}

export const resetPassword = async (resetToken, newPassword) => {
    try {
        const token = await Token.findOne({ value: resetToken });
        if (!token) {
            throw new AppError(498, "Invalid token");
        }

        // Check if token is expired
        if (token.expiredAt < Date.now()) {
            throw new AppError(419, "Token is expired");
        }

        const user = await User.findById(token.userId);
        if (!user) {
            throw new AppError(404, "Resource not found");
        }

        const hashedPassword = bcrypt.hashSync(newPassword);
        user.password = hashedPassword;
        await user.save();

        await Token.deleteMany({ userId: token.userId });
    } catch (err) {
        throw err;
    }
}