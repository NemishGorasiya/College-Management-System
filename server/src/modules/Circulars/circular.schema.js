import { format } from "date-fns";
import { Joi } from "express-validation";

export const getCircularsSchema = {
    body: Joi.object({
        date: Joi.date().optional(),
    })
}

export const createCircularSchema = {
    body: Joi.object({
        title: Joi.string().required(),
        link: Joi.string().uri().optional(),
    }) //need to give context = true
};

export const updateCircularSchema = {
    body: Joi.object({
        title: Joi.string().optional(),
        link: Joi.string().uri().optional(),
    }).min(1),
    params: Joi.object({
        circularId: Joi.string().required(),
    })
};

export const deleteCircularSchema = {
    params: Joi.object({
        circularId: Joi.string().required(),
    })
};