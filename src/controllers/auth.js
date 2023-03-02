import { authService } from "../services/auth.js";

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await authService.login(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};
export const authController = { login };
