import { Router } from 'express';
import { checkPermissions, isAuthenticated } from '../../middlewares/middlewares.js';
import Faculty from '../Faculty/Faculty.js';
import { createAssignment, updateAssignment } from './assignment.controller.js';
import { createAssignmentSchema, updateAssignmentSchema } from './assignment.schema.js';

const router = Router({ mergeParams: true });


//!PATH: /api/assignment

router
  .post("/create", isAuthenticated, checkPermissions(Faculty), validate(createAssignmentSchema), createAssignment)
  .get("/", isAuthenticated, checkPermissions(Faculty), getOwnAssignments)
  //TODO: add the schema for the update and delete request
  .patch("/:id", isAuthenticated, checkPermissions(Faculty), validate(updateAssignmentSchema), updateAssignment)
  .delete("/:id", isAuthenticated, checkPermissions(Faculty), deleteAssignment);

export default router;