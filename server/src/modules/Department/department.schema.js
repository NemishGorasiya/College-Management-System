import { Joi } from 'express-validation';

export const createDepartmentSchema = {
    body: Joi.object({
        name: Joi.string().required().min(3).max(50).messages({
            'string.base': "Name of the department should be a string",
            'string.empty': "Name of the department cannot be empty",
        }),
        contactEmail: Joi.string().email().required().messages({
            'string.base': "Contact email should be a string",
            'string.empty': "Contact email cannot be empty",
            'string.email': "Contact email should be a valid email",
        }),
        contactPhoneNumber: Joi.number().min(1000000000).max(9999999999).required().messages({
            'number.base': "Contact phone number should be a number",
            'number.empty': "Contact phone number cannot be empty",
        }),
        officeAddress: Joi.string().required().min(3).messages({
            'string.base': "Office address should be a string",
            'string.empty': "Office address cannot be empty",
            'string.min': "Office address should have a minimum length of 3",
        }),
        budget: Joi.number().required().messages({
            'number.base': "Budget should be a number",
            'number.empty': "Budget cannot be empty",
        }),
        researchAreas: Joi.array().items(Joi.string()).required().messages({
            'array.base': "Research areas should be an array",
            'array.empty': "Research areas cannot be empty",
        }),
        facilities: Joi.array().items(Joi.string()).required().messages({
            'array.base': "Facilities should be an array",
            'array.empty': "Facilities cannot be empty",
            'items.string': "Facilities should be a string",
        }),
        accreditation: Joi.string().valid("NBA", "NAAC", "ABET", "AICTE", "UGC").required().messages({
            'string.base': "Accreditation should be a string",
            'string.empty': "Accreditation cannot be empty",
            'any.only': "Accreditation should be one of the valid values",
        }),
        departmentLogo: Joi.string().uri().optional().messages({
            'string.base': "Department logo should be a string",
            'string.empty': "Department logo cannot be empty",
            'string.uri': "Department logo should be a valid URI",
        }),
        doe: Joi.date().required().less('now').messages({
            'date.base': "Date of establishment should be a date",
            'date.empty': "Date of establishment cannot be empty",
            'date.less': "Date of establishment should be less than the current date",
        }),
        hod: Joi.string().optional().messages({
            'string.base': "HOD should be a string",
            'string.empty': "HOD cannot be empty",
        })
    })
};

export const getDepartmentSchema = {
    query: Joi.object({
        page: Joi.number().optional().default(1).messages({
            'number.base': "Page should be a number",
            'number.min': "Page should be a minimum of 1",
        }),
        limit: Joi.number().optional().default(0).messages({
            'number.base': "Limit should be a number",
            'number.min': "Limit should be a minimum of 1",
        }),
        search: Joi.string().optional().messages({
            'string.base': "Search should be a string",
        }),
        sortBy: Joi.string().optional().default("name").messages({
            'string.base': "Sort by should be a string",
        }),
        orderBy: Joi.string().valid("asc", "desc").default("asc").optional().messages({
            'string.base': "Order by should be a string",
            'any.only': "Order by should be one of the valid values",
        }),
    }, { context: true }),
};

export const updateDepartmentSchema = {
    params: Joi.object({
        id: Joi.string().required().messages({
            'string.base': "Department ID should be a string",
            'string.empty': "Department ID cannot be empty",
        }),
    }),
    body: Joi.object({
        name: Joi.string().optional().min(3).max(50).messages({
            'string.base': "Name of the department should be a string",
            'string.empty': "Name of the department cannot be empty",
        }),
        contactEmail: Joi.string().email().optional().messages({
            'string.base': "Contact email should be a string",
            'string.empty': "Contact email cannot be empty",
            'string.email': "Contact email should be a valid email",
        }),
        contactPhoneNumber: Joi.number().min(1000000000).max(9999999999).optional().messages({
            'number.base': "Contact phone number should be a number",
            'number.empty': "Contact phone number cannot be empty",
        }),
        officeAddress: Joi.string().optional().min(3).messages({
            'string.base': "Office address should be a string",
            'string.empty': "Office address cannot be empty",
            'string.min': "Office address should have a minimum length of 3",
        }),
        budget: Joi.number().optional().messages({
            'number.base': "Budget should be a number",
            'number.empty': "Budget cannot be empty",
        }),
        researchAreas: Joi.array().items(Joi.string()).optional().messages({
            'array.base': "Research areas should be an array",
            'array.empty': "Research areas cannot be empty",
        }),
        facilities: Joi.array().items(Joi.string()).optional().messages({
            'array.base': "Facilities should be an array",
            'array.empty': "Facilities cannot be empty",
            'items.string': "Facilities should be a string",
        }),
        accreditation: Joi.string().valid("NBA", "NAAC", "ABET", "AICTE", "UGC").optional().messages({
            'string.base': "Accreditation should be a string",
            'string.empty': "Accreditation cannot be empty",
            'any.only': "Accreditation should be one of the valid values",
        }),
        departmentLogo: Joi.string().uri().optional().messages({
            'string.base': "Department logo should be a string",
            'string.empty': "Department logo cannot be empty",
            'string.uri': "Department logo should be a valid URI",
        }),
        doe: Joi.date().optional().less('now').messages({
            'date.base': "Date of establishment should be a date",
            'date.empty': "Date of establishment cannot be empty",
            'date.less': "Date of establishment should be less than the current date",
        }),
        hod: Joi.string().optional().messages({
            'string.base': "HOD should be a string",
            'string.empty': "HOD cannot be empty",
        })
    }).keys().min(1).messages({
        'object.min': "At least one field is required to update"
    })
};

export const deleteDepartmentSchema = {
    params: Joi.object({
        id: Joi.string().required().messages({
            'string.base': "Department ID should be a string",
            'string.empty': "Department ID cannot be empty",
        }),
    })
};