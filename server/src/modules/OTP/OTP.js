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
  validated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, //this document will be deleted after 5 minutes
  },
});

OTPSchema.index({ email: 1, userId: 1 }, { unique: true });

export default model("OTP", OTPSchema, "otp");