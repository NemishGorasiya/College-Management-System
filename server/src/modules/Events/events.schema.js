import { format } from "date-fns";
import { Joi } from "express-validation";

export const getEventsSchema = {
    body: Joi.object({
        date: Joi.date().optional(),
    })
}

export const createEventSchema = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        poster: Joi.string().uri().optional(),
        startDate: Joi.date().required(),
        endDate: Joi.date().greater(Joi.ref('startDate')).optional().default(Joi.ref('startDate')),
    }) //need to give context = true
};

export const updateEventSchema = {
    body: Joi.object({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        poster: Joi.string().uri().optional(),
        startDate: Joi.date().optional(),
        endDate: Joi.date().greater(Joi.ref('startDate')).optional().default(Joi.ref('startDate') || format(new Date.now(), "yyyy-mm-dd")),
    }).min(1),
    params: Joi.object({
        eventId: Joi.string().required(),
    })
};

export const deleteEventSchema = {
    params: Joi.object({
        eventId: Joi.string().required(),
    })
};