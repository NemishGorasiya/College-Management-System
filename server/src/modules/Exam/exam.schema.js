import { Joi } from "express-validation";

export const createExamSchema = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        totalMarks: Joi.number().required(),
        subject: Joi.string().required(),
        examType: Joi.string().required().valid("Quiz", "Project", "Lab"),
        date: Joi.date().greater('now').required(),
        duration: Joi.number().required(),
    })
};

export const createExamSemesterSchema = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        totalMarks: Joi.number().required(),
        examType: Joi.string().required().valid("Mid-Semester", "Internal Submissions", "Viva",),
        date: Joi.date().greater('now').required(),
        duration: Joi.number().required(),
        department: Joi.string().optional(), //admins need to provide this
    }),
    params: Joi.object({
        semester: Joi.string().required(),
    }),
};

export const updateExamSchema = {
    body: Joi.object({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        totalMarks: Joi.number().optional(),
        subject: Joi.string().optional(),
        examType: Joi.string().optional().valid("Quiz", "Project", "Lab", "Mid-Semester", "Internal Submissions", "Viva"),
        date: Joi.date().greater('now').optional(),
        duration: Joi.number().optional(),
    }),
    params: Joi.object({
        examId: Joi.string().required(),
    }),
};