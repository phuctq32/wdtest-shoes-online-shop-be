import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import AppError from "../utils/error.js";
dotenv.config();

export const isAdmin = async (req, res, next) => {
  if (req.role !== "admin") {
    const error = new AppError(401, "UNAUTHORIZED");
    return next(error);
  }
  return res.status(200).json("You are administrator");
  //   try {
  //     const result = jwt.verify(token, process.env.SECRET_KEY);
  //     req.userId = result.userID;
  //     req.role = result.role;
  //     next();
  //   } catch (error) {
  //     next(error);
  //   }
};
