import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "user",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    cart: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        size: { 
          type: String, 
          required: true 
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ]
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
