import { Router } from 'express';
import { validate } from 'express-validation';
import { checkPermissions, isAuthenticated } from '../../middlewares/middlewares.js';
import Faculty from '../Faculty/Faculty.js';
import Admin from '../Admin/Admin.js';
import { createAssignment, deleteAssignment, getOwnAssignments, updateAssignment, getAllAssignments } from './assignment.controller.js';
import { createAssignmentSchema, deleteAssignmentSchema, updateAssignmentSchema } from './assignment.schema.js';

const router = Router({ mergeParams: true });


//!PATH: /api/assignment

router
  .get("/", isAuthenticated, checkPermissions(Faculty), getOwnAssignments)
  .post("/create", isAuthenticated, checkPermissions(Faculty), validate(createAssignmentSchema), createAssignment)
  .get("/all", isAuthenticated, checkPermissions(Admin), getAllAssignments)
  .patch("/update/:id", isAuthenticated, checkPermissions(Faculty), validate(updateAssignmentSchema), updateAssignment)
  .delete("/delete/:id", isAuthenticated, checkPermissions(Faculty), validate(deleteAssignmentSchema), deleteAssignment);

export default router;