import mongoose from "mongoose";

const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {
        type: String,
        uppercase: true,
        required: true
    }, 
    description: {
        type: String,
        default: "Không có",
    }
})

brandSchema.virtual("products", {
    ref: "Product",
    localField: "_id",
    foreignField: "brand",
    count: true,
})

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;