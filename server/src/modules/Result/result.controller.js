import httpStatus from "http-status";
import CustomError from "../../errors/CustomError.js";
import Exam from "../Exam/Exam.js";
import Student from "../Student/Student.js";
import ExamResult from "./ExamResult.js";
import { getSubjects } from "../Student/student.controllers.js";

export const createResult = async (req, res) => {
    const { student, exam, marks } = req.body;

    //need to check if the student has the exam in their subjects
    const studentExists = await Student.findById(student);

    if (!studentExists) {
        throw new CustomError(httpStatus.NOT_FOUND, "Student not found");
    };

    //check if the student has the exam in their subjects
    const studentExam = await Exam.findById(exam);

    //exam does not exist
    if (!studentExam) {
        throw new CustomError(httpStatus.FORBIDDEN, "Student cannot take this exam");
    };

    //check if the student is allowed to take the exam
    const studentSubjects = await getSubjects(studentExists.department, studentExists.semester);

    //check if the student has the exam in their subjects
    if (!studentSubjects.includes(studentExam.subject)) {
        throw new CustomError(httpStatus.FORBIDDEN, "Student cannot take this exam");
    }

    //check if the current faculty is the one who created the exam
    if (exam.faculty.toString() !== req.user._id.toString() && !(req.user instanceof Admin)) {
        throw new CustomError(httpStatus.FORBIDDEN, "Faculty can only create results for their exams");
    };

    //check if the marks are less than total marks
    if (marks > studentExam.totalMarks) {
        throw new CustomError(httpStatus.BAD_REQUEST, "Marks cannot be greater than total marks");
    };

    // check if the exam is completed or not -
    if (!studentExam.isCompleted) {
        throw new CustomError(httpStatus.BAD_REQUEST, "Exam is not completed yet");
    }

    //all checks passed, create the result
    const examResult = new ExamResult({
        student,
        exam,
        marks,
    });

    await examResult.save();

    return res.status(httpStatus.OK).send({
        message: "Result created successfully",
        examResult,
    });
};

export const getOwnResults = async (req, res) => {
    const { _id } = req.user;

    const exam = await Exam.find({ faculty: _id });

    const results = await ExamResult.find({
        exam: {
            $in: exam.map(exam => exam._id)
        }
    });

    return res.status(httpStatus.OK).send({
        message: "Results fetched successfully",
        results,
    });
};

export const getAllResults = async (req, res) => {
    const results = await ExamResult.find();

    return res.status(httpStatus.OK).send({
        message: "Results fetched successfully",
        results,
    });
};

export const getResult = async (req, res) => {
    const { resultId } = req.params;

    const result = await ExamResult.findById(resultId);

    if (!result) {
        throw new CustomError(httpStatus.NOT_FOUND, "Result not found");
    }

    return res.status(httpStatus.OK).send({
        message: "Result fetched successfully",
        result,
    });
};

//only marks can be updated in the result
export const updateResult = async (req, res) => {
    const { resultId } = req.params;
    const { marks } = req.body;

    const result = await ExamResult.findById(resultId).populate("exam");

    if (result.exam.faculty.toString() !== req.user._id.toString() && !(req.user instanceof Admin)) {
        throw new CustomError(httpStatus.FORBIDDEN, "Faculty can only update their exam results");
    }

    if (!result) {
        throw new CustomError(httpStatus.NOT_FOUND, "Result not found");
    }

    if (marks > result.exam.totalMarks) {
        throw new CustomError(httpStatus.BAD_REQUEST, "Marks cannot be greater than total marks");
    }

    result.marks = marks;

    await result.save();

    return res.status(httpStatus.OK).send({
        message: "Result updated successfully",
        result,
    });
};

export const deleteResult = async (req, res) => {
    const { resultId } = req.params;

    const result = await ExamResult.findById(resultId).populate("exam");

    if (!result) {
        throw new CustomError(httpStatus.NOT_FOUND, "Result not found");
    }

    if (result.exam.faculty.toString() !== req.user._id.toString() && !(req.user instanceof Admin)) {
        throw new CustomError(httpStatus.FORBIDDEN, "Faculty can only delete their exam results");
    }

    await ExamResult.deleteOne({ _id: resultId });

    return res.status(httpStatus.OK).send({
        message: "Result deleted successfully",
    });
};