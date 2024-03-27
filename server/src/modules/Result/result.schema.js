import { Joi } from "express-validation";

export const createResultSchema = {
    body: Joi.object({
        student: Joi.string().required(),
        exam: Joi.string().required(),
        marks: Joi.number().required(),
    })
};

export const updateResultSchema = {
    body: Joi.object({
        marks: Joi.number().required(),
    }),
    params: Joi.object({
        resultId: Joi.string().required(),
    }),
};

export const deleteResultSchema = {
    params: Joi.object({
        resultId: Joi.string().required(),
    }),
};