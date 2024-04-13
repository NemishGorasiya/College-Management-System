import { Schema, model } from "mongoose";

const OTPSchema = new Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  externalType: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'externalType'
  },
  validated: { // if the otp is validated or not can be used to check if the otp is used or not
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, //this will delete the document after 10 minutes of creation 
  },
});



export default model("OTP", OTPSchema, "otp");