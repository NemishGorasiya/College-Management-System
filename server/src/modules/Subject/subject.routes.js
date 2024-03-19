import { Router } from "express";
import { validate } from "express-validation";
import { checkPermissions, isAuthenticated } from "../../middlewares/middlewares.js";
import Admin from "../Admin/Admin.js";
import { createSubject, getSubjects } from "./subject.controller.js";
import { createSubjectSchema } from "./subject.schema.js";

const router = Router({ mergeParams: true });

//!Path - /api/subject

router
    .get("/", isAuthenticated, getSubjects)
    .post("/create", isAuthenticated, checkPermissions(Admin), validate(createSubjectSchema, { keyByField: true }), createSubject);

export default router;