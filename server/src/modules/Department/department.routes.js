import { Router } from "express";
import { validate } from "express-validation";
import { checkPermissions, isAuthenticated } from "../../middlewares/middlewares.js";
import Admin from "../Admin/Admin.js";
import Faculty from "../Faculty/Faculty.js";
import Student from "../Student/Student.js";
import { createDepartmentSchema, updateDepartmentSchema, deleteDepartmentSchema, getDepartmentSchema } from "./department.schema.js";
import { createDepartment, getDepartments, updateDepartment, deleteDepartment, getDepartment } from "./department.controller.js";

const router = Router({ mergeParams: true });

//! Path: /api/department

router
    .use(isAuthenticated);

router
    .get("/", checkPermissions(Admin, Student, Faculty), validate(getDepartmentSchema, { context: true }), getDepartments)
    .get("/:id", checkPermissions(Admin, Student, Faculty), validate(getDepartmentSchema, { context: true }), getDepartment)
    .post("/create", checkPermissions(Admin), validate(createDepartmentSchema, { keyByField: true, }), createDepartment)
    .patch("/update/:id", checkPermissions(Admin), validate(updateDepartmentSchema, { keyByField: true, }), updateDepartment)
    .delete("/delete/:id", checkPermissions(Admin), validate(deleteDepartmentSchema, { keyByField: true }), deleteDepartment);

export default router;