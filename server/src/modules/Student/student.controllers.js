
import httpStatus from "http-status";
import CustomError from "../../errors/CustomError.js";
import { csvToJson, validateStudents } from "../../utils/csvToJson.utils.js";
import { generatePdf } from "../../utils/generatePdf.utils.js";
import Assignment from "../Assignment/Assignment.js";
import SubmittedAssignment from "../Assignment/SubmittedAssignment.js";
import Exam from "../Exam/Exam.js";
import Subject from "../Subject/Subject.js";
import Student from "./Student.js";
import StudentUpdateRequest from "./StudentUpdateRequest.js";
import { studentRegisterInterSchema } from "./student.schema.js";
import fs from "fs";

export const studentRegister = async (req, res) => {
    const {
        enrollmentNumber,
        firstName,
        lastName,
        dob,
        doa,
        email,
        gender,
        bloodGroup,
        phoneNumber,
        fatherName,
        motherName,
        parentPhoneNumber,
        address,
        semester,
        passOutYear,
        profilePicture,
        department,
    } = req.body;

    const newStudent = new Student({
        enrollmentNumber,
        firstName,
        lastName,
        dob,
        doa,
        email,
        gender,
        bloodGroup,
        phoneNumber,
        fatherName,
        motherName,
        parentPhoneNumber,
        address,
        semester,
        passOutYear,
        profilePicture,
        department,
    });

    await Student.register(newStudent, req.body.password);

    return res.status(httpStatus.CREATED).json({ message: "Student created successfully", student: newStudent.id });
};

export const studentLogin = async (req, res) => {
    return res.status(httpStatus.OK).send({
        message: "Student logged in successfully",
        user: req.user,
    });
};

export const studentUpdate = async (req, res) => {
    let _id;
    if (req.user instanceof Admin) {
        _id = req.query.studentId;

        if (!_id) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: "Student id is required in the query params" });
        }
    } else {
        _id = req.user._id;
    }

    const changes = req.body;

    const student = await Student.findById(_id);

    if (!student) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Student not found" });
    }

    const studentUpdateRequest = new StudentUpdateRequest({
        student: _id,
        changes,
    });

    await studentUpdateRequest.save();


    return res.status(httpStatus.OK).json({ message: "Student update request created successfully", studentUpdateRequest: studentUpdateRequest.id });
};

export const studentDelete = async (req, res) => {
    const { studentId } = req.params;

    const student = await Student.findById(studentId);

    if (!student) {
        return res.status(httpStatus.NOT_FOUND).json({ message: "Student not found" });
    }

    await Student.deleteOne({
        _id: student._id,
    })

    return res.status(httpStatus.OK).json({ message: "Student deleted successfully" });
};

export const getSubjects = async (department, semester) => {
    return await Subject.find({
        department,
        semester
    }).populate("department").sort({
        createdAt: -1,
    });
}

export const studentGetSubjects = async (req, res) => {
    //get the subjects of the students
    const { semester, department } = req.user;

    const subjects = await getSubjects(department, semester);

    return res.status(httpStatus.OK).send({
        message: "Student's subjects fetched successfully",
        subjects
    });
};

export const studentGetAssignments = async (req, res) => {
    //to get the student assignments we need to find the subjects it listens to
    const { department, semester } = req.user;

    let subjects = await getSubjects(department, semester);

    let assignments = await Assignment.find({
        subject: {
            $in: subjects.map(subject => subject._id)
        }
    }).populate("subject").sort({
        dueDate: 1,
        createdAt: -1,
    });

    let submittedAssignments = [];
    let nonSubmittedAssignments = [];

    for (let assignment of assignments) {
        if (assignment.students.find(student => student.student.toString() === req.user._id.toString())) {
            submittedAssignments.push(assignment);
        } else {
            nonSubmittedAssignments.push(assignment);
        }
    }

    return res.status(httpStatus.OK).send({
        message: "Student's assignment fetched successfully",
        submittedAssignments,
        assignments: nonSubmittedAssignments
    })
};

export const studentSubmitAssignment = async (req, res) => {
    const { subjectId, file } = req.body;
    const { _id } = req.user;
    const { assignmentId } = req.params;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
        throw new CustomError(httpStatus.NOT_FOUND, "Assignment not found");
    }

    if (assignment.subject.toString() !== subjectId) {
        throw new CustomError(httpStatus.BAD_REQUEST, "Assignment does not belong to the subject");
    }

    const studentSubjects = await getSubjects(req.user.department, req.user.semester);

    if (!studentSubjects.find(subject => subject._id.toString() === subjectId)) {
        throw new CustomError(httpStatus.FORBIDDEN, "You are not allowed to submit assignment for this subject");
    }

    const submittedAssignment = await SubmittedAssignment.create({
        student: _id,
        assignment: assignmentId,
        subject: subjectId,
        file
    });

    return res.status(httpStatus.CREATED).send({
        message: "Assignment submitted successfully",
        submittedAssignment,
        assignment
    })
};

export const studentRegisterCSV = async (req, res) => {
    const { csv_link } = req.body;

    const students = await csvToJson(csv_link);

    const validated = await validateStudents(studentRegisterInterSchema, students);

    //validation successful otherwise error is thrown
    let registeredStudents = [];
    for (let student of validated) {
        const newStudent = new Student(student);

        const registeredStudent = await Student.register(newStudent, student.password);

        registeredStudents.push(registeredStudent);
    }

    return res.status(httpStatus.OK).send({
        message: "Students registered successfully",
        registeredStudents
    });
};

export const studentGetExams = async (req, res) => {
    const { department, semester } = req.user;

    let subjects = await getSubjects(department, semester);

    //TODO: add pagination, filter by date, exam type, faculty and isCompleted or not

    let exams = await Exam.find({
        subject: {
            $in: subjects.map(subject => subject._id)
        }
    }).populate("subject").populate("faculty").sort({
        date: 1,
        createdAt: -1,
    });

    return res.status(httpStatus.OK).send({
        message: "Student's exams fetched successfully",
        exams
    });
};

export const studentGetTimetable = async (req, res) => {
    const { department, semester } = req.user;
    let { examType } = req.params;

    switch (examType) {
        case "midsem":
            examType = "Mid-Semester";
            break;
        case "internal":
            examType = "Internal Submissions";
            break;
        case "viva":
            examType = "Viva";
            break;
        default:
            throw new CustomError(httpStatus.BAD_REQUEST, "Invalid exam type");
    }

    let subjects = await getSubjects(department, semester);

    let exams = await Exam.find({
        subject: {
            $in: subjects.map(subject => subject._id)
        },
        examType: {
            $regex: examType,
            $options: "i",
        }
    }).populate("subject").populate("faculty").sort({
        date: 1,
        createdAt: -1,
    });

    if (!exams) {
        throw new CustomError(httpStatus.NOT_FOUND, "Exam not found");
    }

    exams = exams.filter(exam => exam.isCompleted === false);

    if (exams.length === 0) {
        return res.status(httpStatus.OK).send({
            message: "No exams found",
        });
    }

    // const { secure_url: urlPath, original_filename, format } = await generatePdf({ exams, user: req.user, filename: `${req.user.fullName}_${req.user.id}_exams.pdf` })
    const filePath = await generatePdf({ exams, user: req.user, filename: `${req.user.fullName}_${req.user.id}_exams.pdf` })

    // return res.status(httpStatus.OK).send({
    //     message: "Student's timetable fetched successfully",
    //     // urlPath,
    //     // filename: original_filename + "." + format,

    //     filePath
    // });

    return res.download(filePath, `${req.user.fullName}_${req.user.id}_exams.pdf`, async (err) => {
        if (err) {
            throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR, "Error downloading file");
        }

        fs.unlinkSync(filePath);
    });
};

export const studentGetResults = async (req, res) => {
    const { department, semester } = req.user;

    //get the subjects of the students  
    let subjects = await getSubjects(department, semester);

    //get the exams of the subjects
    let exams = await Exam.find({
        subject: {
            $in: subjects.map(subject => subject._id)
        }
    });

    //get the results of the student
    let results = await ExamResult.find({
        exam: {
            $in: exams.map(exam => exam._id)
        },
        student: req.user._id
    }).populate("exam").sort({
        createdAt: -1,
    });

    return res.status(httpStatus.OK).send({
        message: "Student's results fetched successfully",
        results
    });
};