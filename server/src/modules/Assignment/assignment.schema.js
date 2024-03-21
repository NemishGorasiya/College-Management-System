import { Joi } from "express-validation";

export const createAssignmentSchema = {
  body: Joi.object({
    name: Joi.string().required().min(3).messages({
      'string.base': 'Name should be a string',
      'string.min': 'Name should have a minimum length of {#limit}',
      'any.required': 'Name is required'
    }),
    description: Joi.string().required().min(3).messages({
      'string.base': 'Description should be a string',
      'string.min': 'Description should have a minimum length of {#limit}',
      'any.required': 'Description is required'
    }),
    totalMarks: Joi.number().required().min(1).messages({
      'number.base': 'Total marks should be a number',
      'number.min': 'Total marks should have a minimum value of {#limit}',
    }),
    subject: Joi.string().required().messages({
      'string.base': 'Subject should be a string',
      'any.required': 'Subject is required'
    }),

    dueDate: Joi.date().greater('now').required().messages({
      'date.base': 'Due date should be a date',
      'any.required': 'Due date is required'
    }),
  })
};

export const updateAssignmentSchema = {
  body: Joi.object({
    name: Joi.string().optional().min(3).messages({
      'string.base': 'Name should be a string',
      'string.min': 'Name should have a minimum length of {#limit}',
      'any.required': 'Name is required'
    }),
    description: Joi.string().optional().min(3).messages({
      'string.base': 'Description should be a string',
      'string.min': 'Description should have a minimum length of {#limit}',
      'any.required': 'Description is required'
    }),
    totalMarks: Joi.number().optional().min(1).messages({
      'number.base': 'Total marks should be a number',
      'number.min': 'Total marks should have a minimum value of {#limit}',
    }),
    subject: Joi.string().optional().messages({
      'string.base': 'Subject should be a string',
      'any.required': 'Subject is required'
    }),

    dueDate: Joi.date().greater('now').optional().messages({
      'date.base': 'Due date should be a date',
      'any.required': 'Due date is required'
    }),
  }),
  params: Joi.object({
    id: Joi.string().required().min(1).messages({
      'string.base': "id must be a string",
      'string.min': "id must be of length 1",
    }),
  })
};

export const deleteAssignmentSchema = {
  params: Joi.object({
    id: Joi.string().required().min(1).messages({
      'string.base': "id must be a string",
      'string.min': "id must be of length 1",
    }),
  })
}