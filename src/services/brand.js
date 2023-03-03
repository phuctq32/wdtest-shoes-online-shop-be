import Brand from "../models/brand.js";
import AppError from "../utils/error.js";

export const createBrand = async (data) => {
    try {
        const existingBrand = await Brand.findOne({ name: data.name.toString().toUpperCase() });
        if (existingBrand) {
            throw new AppError(409, "Brand already exists");
        }

        const newBrand = new Brand({
            name: data.name.toString().toUpperCase(),
        })
        if (data.description) {
            newBrand.description = data.description
        }
        await newBrand.save();

        return newBrand;
    } catch (err) {
        next(err);
    }
}