import { Router } from "express";
import { checkPermissions, isAuthenticated } from "../../middlewares/middlewares.js";
import Admin from "../Admin/Admin.js";
import Faculty from "../Faculty/Faculty.js";
import { validate } from "express-validation";
import { createExamSchema, createExamSemesterSchema, updateExamSchema } from "./exam.schema.js";
import { createExam, createExamSemester, deleteExam, getAllExams, getExam, getOwnExams, updateExam, getExamResults } from "./exam.controller.js";

const router = Router({ mergeParams: true });

//PATH: /api/exam

router
    .post("/create", isAuthenticated, checkPermissions(Faculty, Admin), validate(createExamSchema, { keyByField: true }), createExam) //create
    .post("/create/:semester", isAuthenticated, checkPermissions(Faculty, Admin), validate(createExamSemesterSchema, { keyByField: true }), createExamSemester) //HOD exam create main examinations like - Midsems, Internal,
    .get("/get/:examId", isAuthenticated, checkPermissions(Faculty, Admin), getExam)
    // TODO: faculty
    .get("/result/:examId", isAuthenticated, checkPermissions(Faculty, Admin), getExamResults)
    .patch("/update/:examId", isAuthenticated, checkPermissions(Faculty, Admin), validate(updateExamSchema, { keyByField: true }), updateExam)
    .delete("/delete/:examId", isAuthenticated, checkPermissions(Faculty, Admin), deleteExam)
    .get("/get-own", isAuthenticated, checkPermissions(Faculty, Admin), getOwnExams)
    .get("/get-all", isAuthenticated, checkPermissions(Admin), getAllExams);


export default router;