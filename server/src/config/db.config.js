import mongoose from "mongoose";
import { config } from "dotenv";
// import mongooseValidationErrorTransform from 'mongoose-validation-error-transform';
import logger from "./winston.config.js";
config();

export default async function connectDB() {
    try {
        mongoose.plugin(mongooseValidationErrorTransform, {
            capitalize: true,
            humanize: true,
            transform: (messages) => messages.join(", "),
        });
        await mongoose.connect(process.env.MONGO_URI);
        logger.info("Database connected successfully")
    } catch (err) {
        logger.error(`Error connecting to database: ${err}`);
        process.exit(1);
    }
}