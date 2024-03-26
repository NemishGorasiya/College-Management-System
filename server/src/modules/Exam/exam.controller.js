import { addDays, isWeekend } from "date-fns";
import httpStatus from "http-status";
import CustomError from "../../errors/CustomError.js";
import { getSubjects } from "../Student/student.controllers.js";
import Exam from "./Exam.js";
import Admin from "../Admin/Admin.js";

export const createExam = async (req, res) => {
    const { name, description, totalMarks, subject, examType, date, duration } = req.body;
    const faculty = req.user;

    //check if the faculty has subjects in it
    if (!faculty.subjects.includes(subject)) {
        throw new CustomError(httpStatus.FORBIDDEN, "Faculty can only create exams for subjects they teach");
    };

    //create the exam
    const exam = new Exam({
        name,
        description,
        totalMarks,
        subject,
        examType,
        date,
        duration,
        faculty: faculty._id,
    });

    await exam.save();

    return res.status(httpStatus.OK).send({
        "message": "Exam Created Successfully",
        exam,
    });
};


export const createExamSemester = async (req, res) => {
    let { name, description, totalMarks, examType, date, duration } = req.body;
    const faculty = req.user;
    let department;
    const semester = req.params.semester;

    if (req.user instanceof Admin) {
        if (!req.body.department) {
            throw new CustomError(httpStatus.BAD_REQUEST, "Department is required for admins");
        }

        department = req.body.department;
    } else {
        department = faculty.department;
    }

    //check if the faculty is HOD
    if (!faculty.isHOD) {
        throw new CustomError(httpStatus.FORBIDDEN, "Only HOD can create this exam");
    };

    //get the subjects of the whole department and semester
    const subjects = await getSubjects(department, semester);

    //create the exam for each subject
    let i = 0, exams = [];

    while (i < subjects.length) {
        try {
            if (isWeekend(date)) {
                date = addDays(date, 1);
                continue;
            } else {
                //check if conflicting with other exams 
                const conflictingExam = await Exam.findOne({
                    subject: {
                        $in: subjects.map(subject => subject._id),
                    },
                    date,
                });

                if (conflictingExam) {
                    date = addDays(date, 1);
                    continue;
                }

                //create the exam
                const exam = new Exam({
                    name,
                    description,
                    totalMarks,
                    subject: subjects[i]._id,
                    examType,
                    date,
                    duration,
                    faculty: faculty._id,
                });

                await exam.save();
                exams.push(exam);
                date = addDays(date, 1);
                i++;
            };
        } catch (error) {
            date = addDays(date, 1);
        }
    };

    return res.status(httpStatus.OK).send({
        "message": "Exams Created Successfully",
        exams,
    })
};

export const getExam = async (req, res) => {
    const examId = req.params.examId;

    const exam = await Exam.findById(examId);

    if (!exam) {
        throw new CustomError(httpStatus.NOT_FOUND, "Exam not found");
    };

    return res.status(httpStatus.OK).send({
        exam,
    });
};

export const updateExam = async (req, res) => {
    const examId = req.params.examId;

    const exam = await Exam.findById(examId);

    if (!exam) {
        throw new CustomError(httpStatus.NOT_FOUND, "Exam not found");
    };

    for (let key in req.body) {
        if (key === "subject") {
            const faculty = req.user;
            if (!faculty.subjects.includes(req.body[key])) {
                throw new CustomError(httpStatus.FORBIDDEN, "Faculty can only create exams for subjects they teach");
            };
        }

        exam[key] = req.body[key];
    }

    await exam.save();

    return res.status(httpStatus.OK).send({
        "message": "Exam Updated Successfully",
        exam,
    });
};

export const deleteExam = async (req, res) => {
    const examId = req.params.examId;

    const exam = await Exam.findById(examId);

    if (!exam) {
        throw new CustomError(httpStatus.NOT_FOUND, "Exam not found");
    };

    if (exam.faculty.toString() !== req.user._id.toString()) {
        throw new CustomError(httpStatus.FORBIDDEN, "Faculty can only delete their exams");
    }

    await Exam.deleteOne({ _id: examId });

    return res.status(httpStatus.OK).send({
        "message": "Exam Deleted Successfully",
    });
};

export const getOwnExams = async (req, res) => {
    const faculty = req.user;

    const exams = await Exam.find({ faculty: faculty._id });

    return res.status(httpStatus.OK).send({
        exams,
    });
};

export const getAllExams = async (req, res) => {
    const { semester, subject, faculty, department, examType, date, isCompleted } = req.query;

    let filterObj = {};

    if (semester) {
        filterObj.semester = semester;
    }

    if (subject) {
        filterObj.subject = {
            $in: subject.split(","),
        };
    }

    if (faculty) {
        filterObj.faculty = faculty;
    }

    if (department) {
        filterObj.department = department;
    }

    if (examType) {
        filterObj.examType = {
            $regex: new RegExp(examType),
            $options: "i",
        };
    }

    if (date) {
        filterObj.date = date;
    }

    let exams = await Exam.find(filterObj).sort({ date: 1 });

    if (isCompleted) {
        exams = exams.filter(exam => exam.isCompleted === true);
    }

    return res.status(httpStatus.OK).send({
        exams,
    });
};