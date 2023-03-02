import bcrypt from "bcryptjs";
import User from "../models/user.js";
import AppError from "../utils/error.js";

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