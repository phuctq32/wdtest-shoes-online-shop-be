import { body } from "express-validator";

const productValidations = [
    body("name").trim().notEmpty().withMessage("Name is not empty"),
    body("brand").trim().notEmpty().withMessage("BrandId is not empty").isMongoId(),
    body("shoeCode").trim().notEmpty().withMessage("Shoe code is not empty"),
    body("price").custom((value, { req }) => {
        if (parseFloat(value) <= 0) {
            throw new Error("Price must be greater than 0");
        }
        return true;
    }),
    body("description").trim().notEmpty().withMessage("Description is not empty"),
    body("sizes").custom((sizes, { req }) => {
        Array.from(sizes).forEach(size => {
            if (size.quantity < 0) {
                throw new Error("Quantity must be greater than or equal to 0");
            }
        })
        return true;
    })
];

export {
    productValidations
}