import User from "../models/user.js";
import AppError from "../utils/error.js";

const isAdmin = async (req, res, next) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return next(new AppError(404, "Resource not found"));
        }

        if (user.role !== "admin") {
            return next(new AppError(401, "Your account not have permission"));
        }

    } catch (err) {
        next(err);
    }

    next();
}

export default isAdmin;
