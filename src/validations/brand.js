import { body } from "express-validator";

const brandValidations = [
    body("name").trim().notEmpty().withMessage("Brand name is not empty"),
]

export {
    brandValidations
}