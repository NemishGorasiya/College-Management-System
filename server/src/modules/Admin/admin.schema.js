import { Joi } from "express-validation"

export const adminRegisterSchema = {
  body: Joi.object({
    email: Joi.string().email().required().messages({ "string.email": "Email is required" }),
    password: Joi.string().required().min(3).messages({ "string.min": "Password is required and must be at least 3 characters long" }),
    phoneNumber: Joi.string().required().messages({ "any.required": "Phone number is required" }),
    address: Joi.string().required().messages({ "any.required": "Address is required" }),
    dob: Joi.date().required().max('now').messages({ "date.max": "Date of birth is required and must be in the past" }),
    doj: Joi.date().required().max('now').messages({ "date.max": "Date of joining is required and must be in the past" }),
    firstName: Joi.string().required().messages({ "any.required": "First name is required" }),
    lastName: Joi.string().required().messages({ "any.required": "Last name is required" }),
    profilePicture: Joi.string().uri().optional().messages({ "string.uri": "Profile picture must be a valid URL" }),
  })
};

export const adminLoginSchema = {
  body: Joi.object({
    username: Joi.string().email().required().messages({ "string.email": "Email is required" }),
    password: Joi.string().required().min(3).messages({ "string.min": "Password is required and must be at least 3 characters long" }),
  })
};