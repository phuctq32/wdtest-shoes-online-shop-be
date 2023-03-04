import { body } from "express-validator";

const validator = {
    productId: body("productId").trim().notEmpty().withMessage("ProductId is not empty")
                    .isMongoId(),
    quantity: body("quantity").trim().custom((value, { req }) => {
        if (value <= 0) {
            throw new Error("Quantity must be greater than 0");
        }
        return true;
    })
}

const cartItemValidations = [ validator.productId, validator.quantity ];
const updateQuantityValidations = [ validator.quantity ];

export {
    cartItemValidations, 
    updateQuantityValidations
}