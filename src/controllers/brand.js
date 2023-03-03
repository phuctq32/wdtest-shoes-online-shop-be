import * as brandService from "../services/brand.js";

export const createBrand = async (req, res, next) => {
    try {
        const brandData = {
            name: req.body.name,
            description: req.body.description
        }

        const brand = await brandService.createBrand(brandData);

        res.status(201).json({
            message: "Created brand successfully",
            brand
        })
    } catch (err) {
        next(err);
    }
}