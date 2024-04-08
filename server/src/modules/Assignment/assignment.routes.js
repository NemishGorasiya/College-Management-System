import { Router } from 'express';
import { validate } from 'express-validation';
import { checkPermissions, isAuthenticated } from '../../middlewares/middlewares.js';
import Admin from '../Admin/Admin.js';
import Faculty from '../Faculty/Faculty.js';
import { createAssignment, deleteAssignment, getAllAssignments, getAssignment, getAssignmentSubmissions, getOwnAssignments, updateAssignment, updateSubmittedAssignment } from './assignment.controller.js';
import { createAssignmentSchema, deleteAssignmentSchema, updateAssignmentSchema, updateSubmittedAssignmentSchema } from './assignment.schema.js';

const router = Router({ mergeParams: true });


//!PATH: /api/assignment

router
  .get("/", isAuthenticated, checkPermissions(Faculty), getOwnAssignments) //own published assignments
  .post("/create", isAuthenticated, checkPermissions(Faculty), validate(createAssignmentSchema), createAssignment) //create assignment
  .get("/all", isAuthenticated, checkPermissions(Admin), getAllAssignments) //all assignments
  .patch("/update/:id", isAuthenticated, checkPermissions(Faculty), validate(updateAssignmentSchema), updateAssignment) //update assignment
  .delete("/delete/:id", isAuthenticated, checkPermissions(Faculty), validate(deleteAssignmentSchema), deleteAssignment) //delete assignment
  .get("/:assignmentId", isAuthenticated, checkPermissions(Faculty, Admin), getAssignment) //get assignment's all of the data by id 
  .get("/:assignmentId/submissions", isAuthenticated, checkPermissions(Faculty), getAssignmentSubmissions)
  .patch("/:submissionId/update", isAuthenticated, checkPermissions(Faculty), validate(updateSubmittedAssignmentSchema), updateSubmittedAssignment) //update assignment
  ; //get assignment submissions

export default router;