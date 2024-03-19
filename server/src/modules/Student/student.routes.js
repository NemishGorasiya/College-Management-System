import { Router } from 'express';
import { validate } from 'express-validation';
import passport from 'passport';
import { checkPermissions, isAuthenticated } from '../../middlewares/middlewares.js';
import Admin from '../Admin/Admin.js';
import { studentLogin, studentRegister, studentUpdate } from './student.controllers.js';
import Student from './Student.js';
import { studentLoginSchema, studentRegisterSchema, studentUpdateSchema } from './student.schema.js';


const router = Router({ mergeParams: true });

//!PATH: /api/student 

router
    .post("/register", isAuthenticated, checkPermissions(Admin), validate(studentRegisterSchema, { keyByField: true }), studentRegister);

router
    .post("/login", validate(studentLoginSchema, { keyByField: true }), passport.authenticate('student', { failureRedirect: '/api/error' }), studentLogin);

router
    .patch("/update/request", isAuthenticated, checkPermissions(Student, Admin), validate(studentUpdateSchema, { keyByField: true }), studentUpdate)
    .delete("/delete/:studentId", isAuthenticated, checkPermissions(Admin), validate(studentDeleteSchema, { keyByField: true }), studentDelete);


export default router;