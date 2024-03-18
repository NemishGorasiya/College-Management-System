import { Router } from "express";
import { validate } from "express-validation";
import { checkPermissions, isAuthenticated } from "../../middlewares/middlewares.js";
import Admin from "../Admin/Admin.js";
import Faculty from "../Faculty/Faculty.js";
import Student from "../Student/Student.js";
import { createDepartmentSchema } from "./department.schema.js";
import { createDepartment, getDepartments } from "./department.controller.js";

const router = Router({ mergeParams: true });

//! Path: /api/department

router
    .use(isAuthenticated);

router
    .get("/", checkPermissions(Admin, Student, Faculty), getDepartments)
    .post("/create", checkPermissions(Admin), validate(createDepartmentSchema), createDepartment);

export default router;