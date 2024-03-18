import { Router } from 'express';
import { registerFaculty, loginFaculty } from './faculty.controller.js';
import { registerFacultySchema, facultyLoginSchema } from './faculty.schema.js';
import { checkPermissions, isAuthenticated } from '../../middlewares/middlewares.js';
import Admin from '../Admin/Admin.js';
import passport from 'passport';
import { validate } from 'express-validation';


const router = Router({ mergeParams: true });

//!PATH: /faculty

router
    .post("/register", isAuthenticated, checkPermissions(Admin), validate(registerFacultySchema, {
        keyByField: true,
    }), registerFaculty);

router
    .post("/login", passport.authenticate("faculty", { failureRedirect: "/error" }), loginFaculty);

export default router;