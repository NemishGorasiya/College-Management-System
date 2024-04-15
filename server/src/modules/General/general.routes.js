import { Router } from 'express';
import { validate } from 'express-validation';
import { checkOTPMiddleware } from '../../middlewares/middlewares.js';
import { changePassword, generateOTP, getProfile, userLogout, validateOTP } from './general.controller.js';
import { changePasswordSchema, validateOTPSchema } from './general.schema.js';

const router = Router({ mergeParams: true })

//PATH: /api/user

router
  .get("/logout", userLogout) //logout  
  .get("/my-profile", getProfile) //get the profile of the user
  .get("/change-password", generateOTP) //generate OTP for password reset
  .post("/validate-otp", validate(validateOTPSchema, { keyByField: true }), validateOTP)
  .post("/change-password", checkOTPMiddleware, validate(changePasswordSchema, { keyByField: true }), changePassword) //change the password  

export default router;