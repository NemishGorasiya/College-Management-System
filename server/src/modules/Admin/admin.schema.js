import { Joi } from "express-validation"

export const adminSchema = {
  body: Joi.object({
    email: Joi.string().email().required().message("Email is required"),
    password: Joi.string().required().min(3).message("Password is required"),
    phoneNumber: Joi.number().required().message("Phone number is required"),
    address: Joi.string().required().message("Address is required"),
    dob: Joi.date().required().less('now').message("Date of birth is required"),
    doj: Joi.date().required().less('now').message("Date of joining is required"),
    firstName: Joi.string().required().message("First name is required"),
    lastName: Joi.string().required().message("Last name is required"),
  })
}