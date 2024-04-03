import { Joi } from "express-validation";

export const createSubjectSchema = {
    body: Joi.object({
        name: Joi.string().required().messages({ "any.required": "Subject name is required" }),
        subjectCode: Joi.number().required().messages({ "any.required": "Subject code is required" }),
        department: Joi.string().required().messages({ "any.required": "Department ID is required" }),
        semester: Joi.number().required().min(1).max(8).messages({ "any.required": "Semester is required" }),
        description: Joi.string().required().messages({ "any.required": "Description is required" }),
        credits: Joi.number().required().min(0).max(30).messages({ "any.required": "Credits are required" }),
        hoursPerWeek: Joi.number().required().messages({ "any.required": "Hours per week are required" }),
        resources: Joi.array().items(Joi.object({
            name: Joi.string().required().messages({ "any.required": "Resource name is required" }),
            link: Joi.string().required().uri().messages({ "any.required": "Resource link is required", "string.uri": "Resource link must be a uri" }),
            description: Joi.string().required().messages({ "any.required": "Resource description is required" }),
        })).required().messages({ "any.required": "Resources are required" }),
    })
};

export const getSubjectSchema = {
    params: Joi.object({
        id: Joi.string().required().min(2),
    })
}

export const updateSubjectSchema = {
    params: Joi.object({
        id: Joi.string().required().messages({ "any.required": "Subject ID is required" }),
    }),
    body: Joi.object({
        name: Joi.string().optional().messages({ "any.optional": "Subject name is optional" }),
        subjectCode: Joi.number().optional().messages({ "any.optional": "Subject code is optional" }),
        department: Joi.string().optional().messages({ "any.optional": "Department ID is optional" }),
        semester: Joi.number().optional().min(1).max(8).messages({ "any.optional": "Semester is optional" }),
        description: Joi.string().optional().messages({ "any.optional": "Description is optional" }),
        credits: Joi.number().optional().min(0).max(30).messages({ "any.optional": "Credits are optional" }),
        hoursPerWeek: Joi.number().optional().messages({ "any.optional": "Hours per week are optional" }),
        resources: Joi.array().items(Joi.object({
            name: Joi.string().optional().messages({ "any.optional": "Resource name is optional" }),
            link: Joi.string().optional().uri().messages({ "any.optional": "Resource link is optional", "string.uri": "Resource link must be a uri" }),
            description: Joi.string().optional().messages({ "any.optional": "Resource description is optional" }),
        })).optional().messages({ "any.optional": "Resources are optional" }),
    }).keys().min(1).messages({ "object.min": "At least one field is required to update" })
};

export const deleteSubjectSchema = {
    params: Joi.object({
        id: Joi.string().required().messages({ "any.required": "Subject ID is required" }),
    })
}