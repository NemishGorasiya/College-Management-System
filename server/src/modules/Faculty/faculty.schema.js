import { Joi } from 'express-validation';

export const registerFacultySchema = {
    body: Joi.object({
        firstName: Joi.string().required().messages({
            "string.base": "First name must be a string",
        }),
        lastName: Joi.string().required().messages({
            "string.base": "Last name must be a string",
        }),
        department: Joi.string().required().messages({
            "string.base": "Department must be a string",
        }),
        designation: Joi.string().valid("PROFESSOR", "ASSOCIATE_PROFESSOR", "ASSISTANT_PROFESSOR", "LECTURER").required().messages({
            "string.base": "Designation must be a string",
        }),
        address: Joi.string().required().messages({
            "string.base": "Address must be a string",
        }),
        phoneNumber: Joi.number().required().min(1000000000).max(9999999999).messages({
            "number.base": "Phone number must be a number",
            "number.min": "Parent phone number must be of 10 digits",
            "number.max": "Parent phone number must be of 10 digits",
        }),
        email: Joi.string().required().messages({
            "string.base": "Email must be a string",
        }),
        qualification: Joi.array().items(Joi.string()).required().messages({
            "array.base": "Qualification must be an array",
            "items.string": "Qualification must be a string",
        }),
        experience: Joi.number().required().messages({
            "number.base": "Experience must be a number",
        }),
        dob: Joi.date().required().less('now').messages({
            "date.base": "Date of birth must be a date",
            "date.less": "Date of birth must be less than today's date",
        }),
        doj: Joi.date().required().less('now').messages({
            "date.base": "Date of joining must be a date",
            "date.less": "Date of birth must be less than today's date",
        }),
        salary: Joi.number().required().messages({
            "number.base": "Salary must be a number",
        }),
        semesters: Joi.array().required().min(1).max(8).messages({
            "array.base": "Semesters must be an array",
        }),
        subjects: Joi.array().required().messages({
            "array.base": "Subjects must be an array",
        }),
        profilePicture: Joi.string().optional().messages({
            "string.base": "Profile picture must be a string",
        }),
        password: Joi.string().required().min(3).messages({
            "string.base": "Password must be a string",
        }),
    })
};

export const facultyLoginSchema = {
    body: Joi.object({
        username: Joi.string().required().messages({
            "string.base": "Username is required",
        }),
        password: Joi.string().required().messages({
            "string.base": "Password is required",
        }),
    })
};