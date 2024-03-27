import { Router } from 'express';
import { validate } from 'express-validation';
import passport from 'passport';
import { checkPermissions, isAuthenticated } from '../../middlewares/middlewares.js';
import Admin from '../Admin/Admin.js';
import { studentDelete, studentGetAssignments, studentGetExams, studentGetResults, studentGetSubjects, studentGetTimetable, studentLogin, studentRegister, studentRegisterCSV, studentSubmitAssignment, studentUpdate } from './student.controllers.js';
import Student from './Student.js';
import { studentDeleteSchema, studentLoginSchema, studentRegisterCSVSchema, studentRegisterSchema, studentSubmitAssignmentSchema, studentUpdateSchema } from './student.schema.js';


const router = Router({ mergeParams: true });

//!PATH: /api/student 

router
    .post("/register", isAuthenticated, checkPermissions(Admin), validate(studentRegisterSchema, { keyByField: true }), studentRegister)
    .post("/register/csv", isAuthenticated, checkPermissions(Admin), validate(studentRegisterCSVSchema), studentRegisterCSV)
    .post("/login", validate(studentLoginSchema, { keyByField: true }), passport.authenticate('student', { failureRedirect: '/api/error' }), studentLogin)
    .patch("/update/request", isAuthenticated, checkPermissions(Student, Admin), validate(studentUpdateSchema, { keyByField: true }), studentUpdate)
    .delete("/delete/:studentId", isAuthenticated, checkPermissions(Admin), validate(studentDeleteSchema, { keyByField: true }), studentDelete)
    .get("/assignments", isAuthenticated, checkPermissions(Student), studentGetAssignments)
    .get("/exams", isAuthenticated, checkPermissions(Student), studentGetExams)
    .get("/exams/:examType/timetable", isAuthenticated, checkPermissions(Student), studentGetTimetable)
    .get("/results", isAuthenticated, checkPermissions(Student), studentGetResults)
    .get("/subjects", isAuthenticated, checkPermissions(Student), studentGetSubjects)
    .post("/submit-assignment/:assignmentId", isAuthenticated, checkPermissions(Student), validate(studentSubmitAssignmentSchema, { keyByField: true }), studentSubmitAssignment);

export default router;