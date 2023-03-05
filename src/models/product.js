import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    image: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String,
    },
    shoeCode: {
        type: String,
        required: true,
    },
    sizes: [ 
        {
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            sold: { type: Number, default: 0, required: true }
        }
    ],
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 1
    },
    status: {
        type: String,
        enum: ["active", "deleted"],
        default: "active"
    }
}, { timestamps: true});

productSchema.index({ name: "text", shoeCode: "text" })

const Product = mongoose.model('Product', productSchema);
export default Product;