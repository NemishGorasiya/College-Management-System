import { Joi } from "express-validation";

export const studentRegisterSchema = {
    body: Joi.object({
        enrollmentNumber: Joi.number().required().min(1000000000).max(9999999999).messages({
            "number.base": "Enrollment number must be a number",
            "number.min": "Enrollment number must be of 10 digits",
            "number.max": "Enrollment number must be of 10 digits",
        }),
        firstName: Joi.string().required().messages({
            "string.base": "First name must be a string",
        }),
        lastName: Joi.string().required().messages({
            "string.base": "Last name must be a string",
        }),
        dob: Joi.date().required().less('now').messages({
            "date.base": "Date of birth must be a date",
            "date.less": "Date of birth must be less than today's date",
        }),
        doa: Joi.date().required().less('now').messages({
            "date.base": "Date of admission must be a date",
            "date.less": "Date of birth must be less than today's date",
        }),
        email: Joi.string().required().messages({
            "string.base": "Email must be a string",
        }),
        gender: Joi.string().valid('MALE', 'FEMALE', 'OTHERS').required().messages({
            "string.base": "Gender must be a string",
            "valid.string": "Gender must be MALE, FEMALE or OTHERS",
        }),
        bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').required().messages({
            "string.base": "Blood group must be a string",
            "valid.string": "Blood group must be A+, A-, B+, B-, AB+, AB-, O+, O-",
        }),
        phoneNumber: Joi.number().required().min(1000000000).max(9999999999).messages({
            "number.base": "Phone number must be a number",
            "number.min": "Parent phone number must be of 10 digits",
            "number.max": "Parent phone number must be of 10 digits",
        }),
        fatherName: Joi.string().required().messages({
            "string.base": "Father name must be a string",
        }),
        motherName: Joi.string().required().messages({
            "string.base": "Mother name must be a string",
        }),
        parentPhoneNumber: Joi.number().required().min(1000000000).max(9999999999).messages({
            "number.base": "Parent phone number must be a number",
            "number.min": "Parent phone number must be of 10 digits",
            "number.max": "Parent phone number must be of 10 digits",
        }),
        address: Joi.string().required().messages({
            "string.base": "Address must be a string",
        }),
        age: Joi.number().required().messages({
            "number.base": "Age must be a number",
        }),
        semester: Joi.number().valid(1, 2, 3, 4, 5, 6, 7, 8).required().messages({
            "number.base": "Semester must be a number",
            "valid.number": "Semester must be 1, 2, 3, 4, 5, 6, 7 or 8",
        }),
        passOutYear: Joi.number().required().messages({
            "number.base": "Pass out year must be a number",
        }),
        department: Joi.string().required().messages({
            "string.base": "Department must be a string",
        }),
        profilePicture: Joi.string().optional().messages({
            "string.base": "Profile picture must be a string",
        }),
        password: Joi.string().required().min(3).messages({
            "string.base": "Password must be a string",
        }),
    })
};

export const studentLoginSchema = {
    body: Joi.object({
        username: Joi.string().required().messages({
            "string.base": "Username is required",
        }),
        password: Joi.string().required().messages({
            "string.base": "Password is required",
        })
    })
};

export const studentUpdateSchema = {
    body: Joi.object({
        firstName: Joi.string().optional().messages({
            "string.base": "First name must be a string",
        }),
        lastName: Joi.string().optional().messages({
            "string.base": "Last name must be a string",
        }),
        dob: Joi.date().optional().less('now').messages({
            "date.base": "Date of birth must be a date",
            "date.less": "Date of birth must be less than today's date",
        }),
        doa: Joi.date().optional().less('now').messages({
            "date.base": "Date of admission must be a date",
            "date.less": "Date of birth must be less than today's date",
        }),
        email: Joi.string().optional().messages({
            "string.base": "Email must be a string",
        }),
        gender: Joi.string().valid('MALE', 'FEMALE', 'OTHERS').optional().messages({
            "string.base": "Gender must be a string",
            "valid.string": "Gender must be MALE, FEMALE or OTHERS",
        }),
        bloodGroup: Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-').optional().messages({
            "string.base": "Blood group must be a string",
            "valid.string": "Blood group must be A+, A-, B+, B-, AB+, AB-, O+, O-",
        }),
        phoneNumber: Joi.number().optional().min(1000000000).max(9999999999).messages({
            "number.base": "Phone number must be a number",
            "number.min": "Parent phone number must be of 10 digits",
            "number.max": "Parent phone number must be of 10 digits",
        }),
        fatherName: Joi.string().optional().messages({
            "string.base": "Father name must be a string",
        }),
        motherName: Joi.string().optional().messages({
            "string.base": "Mother name must be a string",
        }),
        parentPhoneNumber: Joi.number().optional().min(1000000000).max(9999999999).messages({
            "number.base": "Parent phone number must be a number",
            "number.min": "Parent phone number must be of 10 digits",
            "number.max": "Parent phone number must be of 10 digits",
        }),
        address: Joi.string().optional().messages({
            "string.base": "Address must be a string",
        }),
        age: Joi.number().optional().messages({
            "number.base": "Age must be a number",
        }),
        semester: Joi.number().valid(1, 2, 3, 4, 5, 6, 7, 8).optional().messages({
            "number.base": "Semester must be a number",
            "valid.number": "Semester must be 1, 2, 3, 4, 5, 6, 7 or 8",
        }),
        passOutYear: Joi.number().optional().messages({
            "number.base": "Pass out year must be a number",
        }),
        department: Joi.string().optional().messages({
            "string.base": "Department must be a string",
        }),
        profilePicture: Joi.string().optional().messages({
            "string.base": "Profile picture must be a string",
        }),
    }).keys().min(1).messages({
        "object.length": "At least one field is required to update",
    }),
};

export const studentDeleteSchema = {
    params: Joi.object({
        studentId: Joi.string().required().messages({
            "string.base": "Student ID must be a string",
        }),
    })
};

export const studentSubmitAssignmentSchema = {
    body: Joi.object({
        subjectId: Joi.string().required(),
        file: Joi.string().uri().required(),
    }),
    params: Joi.object({
        assignmentId: Joi.string().required(),
    })
}