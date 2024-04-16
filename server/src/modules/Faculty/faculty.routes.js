import { Router } from "express";
import { validate } from "express-validation";
import passport from "passport";
import {
  checkPermissions,
  isAuthenticated,
} from "../../middlewares/middlewares.js";
import Admin from "../Admin/Admin.js";
import {
  deleteFaculty,
  getFaculty,
  loginFaculty,
  registerFaculty,
  updateFaculty,
} from "./faculty.controller.js";
import Faculty from "./Faculty.js";
import {
  facultyDeleteSchema,
  facultyLoginSchema,
  facultyUpdateSchema,
  registerFacultySchema,
} from "./faculty.schema.js";


const router = Router({ mergeParams: true });

//!PATH: /api/faculty

router.post(
  "/register",
  isAuthenticated,
  checkPermissions(Admin),
  validate(registerFacultySchema, { keyByField: true }),
  registerFaculty
);

router.post(
  "/login",
  passport.authenticate("faculty", { failureRedirect: "/api/error" }),
  validate(facultyLoginSchema),
  loginFaculty
);

router
  .patch(
    "/update/request",
    isAuthenticated,
    checkPermissions(Faculty, Admin),
    validate(facultyUpdateSchema, { keyByField: true }),
    updateFaculty
  )
  .delete(
    "/delete/:facultyId",
    isAuthenticated,
    checkPermissions(Admin),
    validate(facultyDeleteSchema, { keyByField: true }),
    deleteFaculty
  );

router.get("/", isAuthenticated, getFaculty);
export default router;
