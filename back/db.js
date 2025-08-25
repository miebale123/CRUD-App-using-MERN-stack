import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log("mongodb connected to user.js");
  } catch (error) {
    console.log("db not working: ", error.message);
  }
}

export const Product = new mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
  })
);

export const User = new mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    cart: [
      {
        productId: String,
        name: String,
        quantity: { type: Number, default: 1 },
      },
    ],
  })
);
