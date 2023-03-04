import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import AppError from "../utils/error.js";
dotenv.config();

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const error = new AppError(401, "Unauthorized");
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  try {
    const result = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = result.userId;
    req.role = result.role;
    next();
  } catch (error) {
    next(error);
  }
};

export default isAuth;
