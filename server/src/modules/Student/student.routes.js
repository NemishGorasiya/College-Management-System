import { Router } from 'express';
import httpStatus from 'http-status';
import Student from './Student.js';
import { checkPermissions, isAuthenticated } from '../../middlewares/middlewares.js';
import Admin from '../Admin/Admin.js';
import { studentLogin, studentRegister } from './student.controllers.js';
import passport from 'passport';


const router = Router({ mergeParams: true });

//!PATH: /api/student 

router
    .post("/register", isAuthenticated, checkPermissions(Admin), studentRegister);

router
    .post("/login", passport.authenticate('student', { failureRedirect: '/api/error' }), studentLogin);

export default router;