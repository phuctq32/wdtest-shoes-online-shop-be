import { userService } from "../services/user.js";
// import AppError from "../utils/error.js";

const getProfile = async (req, res, next) => {
  const userId = req.userId;
  try {
    const user = await userService.getByID(userId);
    // console.log(user.cart.products);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const editProfile = async (req, res, next) => {
  const userId = req.userId;
  const update = req.body;
  try {
    await userService.edit(userId, update);
    res.status(200).json({ message: "UPDATE_SUCCESSFULLY" });
  } catch (error) {
    next(error);
  }
};

const editPassword = async (req, res, next) => {
  // change password will get new token
  const userId = req.userId;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  try {
    const token = await userService.editPassword(
      userId,
      oldPassword,
      newPassword
    );
    res.status(200).json({ jwt: token });
  } catch (error) {
    next(error);
  }
};
export const userController = { getProfile, editProfile, editPassword };
