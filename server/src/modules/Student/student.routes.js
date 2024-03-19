import { Router } from 'express';
import { validate } from 'express-validation';
import passport from 'passport';
import { checkPermissions, isAuthenticated } from '../../middlewares/middlewares.js';
import Admin from '../Admin/Admin.js';
import { studentLogin, studentRegister } from './student.controllers.js';
import { studentLoginSchema, studentRegisterSchema } from './student.schema.js';


const router = Router({ mergeParams: true });

//!PATH: /api/student 

router
    .post("/register", isAuthenticated, checkPermissions(Admin), validate(studentRegisterSchema, { keyByField: true }), studentRegister);

router
    .post("/login", validate(studentLoginSchema, { keyByField: true }), passport.authenticate('student', { failureRedirect: '/api/error' }), studentLogin);

export default router;