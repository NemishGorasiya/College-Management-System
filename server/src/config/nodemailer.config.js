import { config } from "dotenv";
import { MailtrapTransport } from "mailtrap";
import nodemailer from "nodemailer";
config();

const TOKEN = process.env.MAILTRAP_TOKEN;

const emailTransport = nodemailer.createTransport(MailtrapTransport({
  token: TOKEN,
}));

export default emailTransport;