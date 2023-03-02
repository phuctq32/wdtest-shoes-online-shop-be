import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    cart: {
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ],
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        }
    }
}, { timestamps: true });

// userSchema.statics.getById = async (id, select, options) => {
//     try {
//         const user = await User.findById(id, select).populate(options);
//         if (!user) {
//             const error = new Error('User not found.');
//             error.statusCode = 404;
//             throw error;
//         }

//         return user;
//     } catch (err) {
//         throw err;
//     }
// }

// userSchema.statics.getByEmail = async (email, options) => {
//     try {
//         const user = await User.findOne({ email: email }).populate(options);
//         if (!user) {
//             const error = new Error('User not found.');
//             error.statusCode = 404;
//             throw error;
//         }

//         return user;
//     } catch (err) {
//         throw err;
//     }
// }

const User = mongoose.model('User', userSchema);
export default User;
