import { Router } from 'express';
import { registerFaculty, loginFaculty, updateFaculty, deleteFaculty } from './faculty.controller.js';
import { registerFacultySchema, facultyLoginSchema, facultyUpdateSchema, facultyDeleteSchema } from './faculty.schema.js';
import { checkPermissions, isAuthenticated } from '../../middlewares/middlewares.js';
import Admin from '../Admin/Admin.js';
import passport from 'passport';
import { validate } from 'express-validation';
import Faculty from './Faculty.js';


const router = Router({ mergeParams: true });

//!PATH: /api/faculty

router
    .post("/register", isAuthenticated, checkPermissions(Admin), validate(registerFacultySchema, { keyByField: true }), registerFaculty);

router
    .post("/login", passport.authenticate("faculty", { failureRedirect: "/api/error" }), validate(facultyLoginSchema), loginFaculty);

router
    .patch("/update/request", isAuthenticated, checkPermissions(Faculty, Admin), validate(facultyUpdateSchema, { keyByField: true }), updateFaculty)
    .delete("/delete/:facultyId", isAuthenticated, checkPermissions(Admin), validate(facultyDeleteSchema, { keyByField: true }), deleteFaculty);

export default router;