import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    brandName: {
        type: String,
        required: true,
    },
    image: {
        url: { type: String, required: true },
        width: { type: Number, required: true },
        height: { type: Number, required: true }
    },
    description: { 
        type: String,
    },
    shoeCode: {
        type: String,
        required: true,
    },
    size: {
        type: Number
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
    }
}, { timestamps: true});

const Product = mongoose.model('Product', productSchema);
export default Product;