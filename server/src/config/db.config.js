import mongoose from "mongoose";
import { config } from "dotenv";
import mongooseValidationErrorTransform from 'mongoose-validation-error-transform';
config();

export default async function connectDB() {
    try {
        mongoose.plugin(mongooseValidationErrorTransform, {
            capitalize: true,
            humanize: true,
            transform: (messages) => messages.join(", "),
        });
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected successfully`);
    } catch (err) {
        console.error("Database connection failed");
        console.error(err);
    }
}