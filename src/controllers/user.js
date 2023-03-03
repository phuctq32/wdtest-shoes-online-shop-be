import { userService } from "../services/user.js";
// import AppError from "../utils/error.js";

const getProfile = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await userService.getByID(userID);
    // console.log(user.cart.products);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const changeProfile = async (req, res, next) => {
  const userId = req.userId;
  const update = req.body;
  try {
    await userService.edit(userId, update);
    res.status(200).json({ message: "UPDATE_SUCCESSFULLY" });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  // change password will reset token
  const userId = req.userId;
  const newPassword = req.body;
  try {
    const token = await userService.changePassword(userId, newPassword);
    res.status(200).json({ message: "UPDATE_SUCCESSFULLY" });
    return token;
  } catch (error) {
    next(error);
  }
};
export const userController = { getProfile, changeProfile, changePassword };
