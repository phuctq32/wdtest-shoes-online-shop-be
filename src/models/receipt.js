import mongoose from "mongoose";

const receiptSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            name: { type: String, required: true },
            price: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    state: {
        type: String,
        required: true,
        enum: ["unpaid", "paid", "canceled"],
        default: "paid"
    },
    date: {
        type: Date,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    customerInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
    }
}, { timestamps: true });

const Receipt = mongoose.model('Receipt', receiptSchema);
export default Receipt;