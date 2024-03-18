import mongoose from "mongoose";
import { config } from "dotenv";
config();

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Database connected successfully`);
  } catch (err) {
    console.error("Database connection failed");
    console.error(err);
  }
}