import { body } from "express-validator";

const receiptValidations = [
    body("products").custom((products, { req }) => {
        Array.from(products).forEach(product => {
            if (!product.productID) {
                throw new Error("ProductID is not empty");
            }
            if (product.quantity < 0) {
                throw new Error("Quantity must be greater than or equal to 0");  
            }
        })
        return true;
    }),

    body("customerInfo").custom((customerInfo, { req }) => {
        Array.from(customerInfo).forEach(info => {
            if (!info.email) {
                throw new Error("Customer's email is not empty");
            }
            if (!info.phone) {
                throw new Error("Customer's phone is not empty");
            }
            if (!info.name) {
                throw new Error("Customer's name is not empty");
            }
            if (!info.address) {
                throw new Error("Customer's address is not empty");
            }
           
        })
        return true;
    })
];

export {
    receiptValidations
}