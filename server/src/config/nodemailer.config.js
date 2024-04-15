import { config } from "dotenv";
import nodemailer from "nodemailer";
config();

if (!process.env.EMAIL || !process.env.APP_PASSWORD) {
  console.error("Please provide email and APP_PASSWORD in .env file");
  process.exit(1);
}

const transport = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587, //default port for secure SMTP 
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
})

export default transport; 