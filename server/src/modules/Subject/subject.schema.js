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
}