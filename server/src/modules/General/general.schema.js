import { Joi } from "express-validation";

export const changePasswordSchema = {
    body: Joi.object({
        password: Joi.string().required(),
        newPassword: Joi.string().required(),
    })
};

export const validateOTPSchema = {
    body: Joi.object({
        otp: Joi.string().required(),
    })
};