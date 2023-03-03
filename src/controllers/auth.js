import * as authService from "../services/auth.js";

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await authService.login(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
    try {
        const userData = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address
        }

        await authService.signup(userData);

        res.status(201).json({ message: "Sucessfully register" });
    } catch (err) {
        next(err);
    }
}

export const forgotPassword = async (req, res, next) => {
    try {
        const token = await authService.forgotPassword(req.body.email);

        res.status(200).json({
            message: 'An email was sent to your email account. Please check to reset your password!',
            token: token,
        })
    } catch (err) {
        next(err);
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        await authService.resetPassword(req.params.token, req.body.password);

        res.status(200).json({
            message: 'Reset password successfully!'
        });
    } catch (err) {
        next(err);
    }
}