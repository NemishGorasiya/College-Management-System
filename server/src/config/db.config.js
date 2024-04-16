import mongoose from "mongoose";
import { config } from "dotenv";
import logger from "./winston.config.js";
config();

export default async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Database connected successfully");
  } catch (err) {
    logger.error(`Error connecting to database: ${err}`);
    process.exit(1);
  }
}
