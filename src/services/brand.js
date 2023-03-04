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

export const getBrands = async (data) => {
    try {
        const brands = await Brand.find();

        return brands;
    } catch (err) {
        next(err);
    }
}

export const updateBrand = async (data) => {
    try {
        const brand = await Brand.findOne({ name: data.name.toString().toUpperCase() });
        if (!brand) {
            throw new AppError(404, "Resource not found");
        }

        if (data.name) {
            brand.name = data.name.toString().toUpperCase();
        }
        if (data.description) {
            brand.description = data.description
        }
        await brand.save();

        return brand;
    } catch (err) {
        next(err);
    }
}