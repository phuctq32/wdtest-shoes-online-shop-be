import * as authService from "../services/auth.js";

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