import { Router } from "express";
import { validate } from "express-validation";
import { checkPermissions, isAuthenticated } from "../../middlewares/middlewares.js";
import Admin from "../Admin/Admin.js";
import { createSubject, getSubjects, updateSubject, deleteSubject, getSubject } from "./subject.controller.js";
import { createSubjectSchema, deleteSubjectSchema, getSubjectSchema, updateSubjectSchema } from "./subject.schema.js";

const router = Router({ mergeParams: true });

//!Path - /api/subject

router
    .get("/", isAuthenticated, getSubjects)
    .get("/:id", isAuthenticated, validate(getSubjectSchema), getSubject)
    .post("/create", isAuthenticated, checkPermissions(Admin), validate(createSubjectSchema, { keyByField: true }), createSubject)
    .patch("/update/:id", isAuthenticated, checkPermissions(Admin), validate(updateSubjectSchema, { keyByField: true }), updateSubject)
    .delete("/delete/:id", isAuthenticated, checkPermissions(Admin), validate(deleteSubjectSchema, { keyByField: true }), deleteSubject);
export default router;