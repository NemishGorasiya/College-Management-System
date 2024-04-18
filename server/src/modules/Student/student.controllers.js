
import httpStatus from "http-status";
import CustomError from "../../errors/CustomError.js";
import { csvToJson, validateStudents } from "../../utils/csvToJson.utils.js";
import { generateFinalResultPdf, generateTimetablePdf } from "../../utils/generatePdf.utils.js";
import Admin from "../Admin/Admin.js";
import Assignment from "../Assignment/Assignment.js";
import SubmittedAssignment from "../Assignment/SubmittedAssignment.js";
import Exam from "../Exam/Exam.js";
import ExamResult from "../Result/ExamResult.js";
import FinalResult from "../Result/FinalResult.js";
import Subject from "../Subject/Subject.js";
import Student from "./Student.js";
import StudentUpdateRequest from "./StudentUpdateRequest.js";
import { studentRegisterInterSchema } from "./student.schema.js";



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

    const { enrollmentNumber, _id, firstName, lastName, email } = req.user;

    const user = {
        enrollmentNumber, _id, firstName, lastName, email
    }

    return res.status(httpStatus.OK).send({
        message: "Student logged in successfully",
        user,
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
    }).populate("department", "_id name").sort({
        createdAt: -1,
    }).select("_id name subjectCode department semester description credits resources"); 
}

export const studentGetSubjects = async (req, res) => {
    //get the subjects of the students
    const { semester, department } = req.user;

    const subjectList = await getSubjects(department, semester);

    return res.status(httpStatus.OK).send({
        message: "Student's subjects fetched successfully",
        subjectList 
    });
};

export const studentGetAssignments = async (req, res) => {
    //to get the student assignments we need to find the subjects it listens to
    const { department, semester } = req.user;

    let subjects = await getSubjects(department, semester);

    let assignments = await Assignment.find({
        subject: {
            $in: subjects.map(subject => subject._id)
        },
    }).populate("subject").sort({
        dueDate: 1,
        createdAt: -1,
    });

    const userId = req.user._id.toString();

    // Separate submitted and non-submitted assignments using array filtering
    const submittedAssignments = assignments.filter(assignment =>
        assignment.students.some(student => student.student.toString() === userId)
    );

    const nonSubmittedAssignments = assignments.filter(assignment =>
        !assignment.students.some(student => student.student.toString() === userId)
    );

    // Map assignments to required response format
    const mapAssignment = assignment => ({
        _id: assignment._id,
        name: assignment.name,
        description: assignment.description,
        totalMarks: assignment.totalMarks,
        subject_id: assignment.subject._id,
        subject: assignment.subject.name,
        dueDate: assignment.dueDate,
        faculty: assignment.faculty
    });

    return res.status(httpStatus.OK).send({
        message: "Student's assignments fetched successfully",
        submittedAssignments: submittedAssignments.map(mapAssignment),
        nonSubmittedAssignments: nonSubmittedAssignments.map(mapAssignment)
    });
};

export const studentSubmitAssignment = async (req, res) => {
    const { file } = req.body;
    const { _id } = req.user;
    const { assignmentId } = req.params;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
        throw new CustomError(httpStatus.NOT_FOUND, "Assignment not found");
    }

    const studentSubjects = await getSubjects(req.user.department, req.user.semester);

    if (!studentSubjects.find(subject => subject._id.toString() === assignment.subject.toString())) {
        throw new CustomError(httpStatus.FORBIDDEN, "You are not allowed to submit assignment for this subject");
    }

    const submittedAssignment = await SubmittedAssignment.create({
        student: _id,
        assignment: assignmentId,
        subject: assignment.subject,
        file
    }).select("_id student assignment subject file isLate"); 

    return res.status(httpStatus.CREATED).send({
        message: "Assignment submitted successfully",
        submittedAssignment,
        assignment
    })
};

export const studentRegisterCSV = async (req, res) => {
    const { csv_link, department } = req.body;

    const students = await csvToJson(csv_link);

    const validated = await validateStudents(studentRegisterInterSchema, students);

    //validation successful otherwise error is thrown
    let registeredStudents = [];
    for (let student of validated) {
        const newStudent = new Student({ ...student, department });

        const { enrollmentNumber, _id, firstName, lastName, email } = await Student.register(newStudent, student.password);

        registeredStudents.push({ enrollmentNumber, _id, firstName, lastName, email });
    }

    return res.status(httpStatus.OK).send({
        message: "Students registered successfully",
        registeredStudents
    });
};

export const studentGetExams = async (req, res) => {
    try {
        const { page, limit, faculty, examType, date } = req.query;
        const { department, semester } = req.user;

        // Get subjects for the student
        const subjects = await getSubjects(department, semester);

        // Construct filter object
        const filterObj = {
            subject: { $in: subjects.map(subject => subject._id) }
        };

        if (faculty) filterObj['faculty._id'] = faculty;
        if (examType) filterObj.examType = new RegExp(examType, 'i');
        if (date) filterObj.date = date;

        // Query exams
        let exams = await Exam.find(filterObj)
            .populate("subject")
            .populate("faculty")
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ date: 1, createdAt: -1 });

        // Separate completed and remaining exams
        const completedExams = exams.filter(exam => exam.isCompleted);
        const remainingExams = exams.filter(exam => !exam.isCompleted);

        // Map exams to required format
        const mapExam = exam => ({
            _id: exam._id,
            name: exam.name,
            description: exam.description,
            totalMarks: exam.totalMarks,
            subject_id: exam.subject._id,
            subject: exam.subject.name,
            date: exam.date,
            examType: exam.examType,
            duration: exam.duration,
            isCompleted: exam.isCompleted
        });

        return res.status(httpStatus.OK).send({
            message: "Student's exams fetched successfully",
            completedExams: completedExams.map(mapExam),
            exams: remainingExams.map(mapExam)
        });
    } catch (error) {
        console.error("Error fetching student exams:", error);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "Internal server error" });
    }
};


export const studentGetTimetable = async (req, res) => {
    const { department, semester } = req.user;
    let { examType } = req.params;

    examType = getExamType(examType);

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

    const filePath = await generateTimetablePdf({ exams, user: req.user, filename: `${req.user.fullName}_${req.user.id}_exams.pdf` })

    return res.download(filePath, `${req.user.fullName}_${req.user.id}_exams.pdf`, async (err) => {
        if (err) {
            throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR, "Error downloading file");
        }

        // fs.unlinkSync(filePath);
        console.log("File returned successfully");
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
    }).populate("exam","_id name totalMarks subject date").sort({
        createdAt: -1,
    }).select("_id student exam marks examType percentage");

    return res.status(httpStatus.OK).send({
        message: "Student's results fetched successfully",
        results
    });
};

export const studentGetFinalResult = async (req, res) => {
    const { department, semester } = req.user;
    let { examType } = req.params;

    examType = getExamType(examType);

    //check if the student already made the final result
    const finalResultExists = await FinalResult.findOne({
        student: req.user._id,
        semester,
        examType,
    }) // final results for the student for the semester and exam type

    //get the subjects of the students
    const subjects = await getSubjects(department, semester);

    //check if the student has no exam left to take
    let exams = await Exam.find({
        subject: {
            $in: subjects.map(subject => subject._id)
        },
        examType,
    });

    let remainingExams = exams.filter(exam => exam.isCompleted !== true); // remaining exams for the student

    if (remainingExams.length > 0) {
        throw new CustomError(httpStatus.BAD_REQUEST, "Student has exams left to take");
    }

    //get the results of the student
    let results = await ExamResult.find({
        student: req.user._id,
        exam: {
            $in: exams.map(exam => exam._id)
        },
    });


    if (exams.length !== results.length) {
        throw new CustomError(httpStatus.BAD_REQUEST, "Student has not taken all exams");
    };

    let finalResult;
    if (finalResultExists) {
        //update the final result
        finalResultExists.examResults = results.map(result => result._id);  //update the exam results
        finalResult = finalResultExists;
        await finalResultExists.save();
    } else {
        //create the final result
        finalResult = new FinalResult({
            student: req.user._id,
            semester,
            examResults: results.map(result => result._id),
            examType
        });

        await finalResult.save();
    }

    //get the final result for the student
    const finalResultPopulated = await FinalResult.findById(finalResult._id)
        .populate({
            path: "examResults",
            populate: {
                path: "exam",
                populate: {
                    path: "subject",
                    select: {
                        _id: 1,
                        name: 1,
                        subjectCode: 1,
                        credits: 1,
                    }
                },
                select: {
                    _id: 1,
                    totalMarks: 1,
                    name: 1,
                    description: 1,
                    examType: 1,
                    date: 1,
                }
            },
        }).populate({
            path: "student",
            populate: {
                path: "department",
                _id: 1,
                select: {
                    name: 1,
                }
            },
            select: {
                _id: 1,
                enrollmentNumber: 1,
                firstName: 1,
                lastName: 1,
                email: 1,
                dob: 1,
                doa: 1,
                gender: 1,
                semester: 1,
                department: 1,
                passOutYear: 1,
                profilePicture: 1,
                bloodGroup: 1,
            }
        });

    return res.status(httpStatus.OK).send({
        message: "Final result created successfully",
        finalResultPopulated
    });
};

export const studentGetFinalResultDownload = async (req, res) => {
    const { semester } = req.user;
    let { examType } = req.params;

    examType = getExamType(examType);

    //check if the student already made the final result
    const finalResultExists = await FinalResult.findOne({
        student: req.user._id,
        semester,
        examType,
    })
        .populate({
            path: "examResults",
            populate: {
                path: "exam",
                populate: {
                    path: "subject",
                    select: {
                        _id: 1,
                        name: 1,
                        subjectCode: 1,
                        credits: 1,
                    }
                },
                select: {
                    _id: 1,
                    totalMarks: 1,
                    name: 1,
                    description: 1,
                    examType: 1,
                    date: 1,
                }
            },
        }).populate({
            path: "student",
            populate: {
                path: "department",
                select: {
                    _id: 1,
                    name: 1,
                }
            },
            select: {
                _id: 1,
                enrollmentNumber: 1,
                firstName: 1,
                lastName: 1,
                email: 1,
                dob: 1,
                doa: 1,
                gender: 1,
                semester: 1,
                department: 1,
                passOutYear: 1,
                profilePicture: 1,
                bloodGroup: 1,
            }
        });


    if (!finalResultExists) {
        throw new CustomError(httpStatus.NOT_FOUND, "Final result not found");
    }

    const filePath = await generateFinalResultPdf({ finalResult: finalResultExists, user: req.user, filename: `${req.user.fullName}_${req.user.id}_finalResult.pdf` })

    return res.download(filePath, `${req.user.fullName}_${req.user.id}_${examType}_finalResult.pdf`, async (err) => {
        if (err) {
            throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR, "Error downloading file");
        }

        // fs.unlinkSync(filePath);
        console.log("File returned successfully");
    });
};

export function getExamType(examType) {
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
    return examType;
};


export const getStudents = async (req, res) => {
    const { semester, department, page, limit, sortBy, sortType } = req.query //sortBy has options - firstname, enrollment, doe, dob
    const filterObj = {};

   if (department && semester) {
        filterObj.department = department;
        filterObj.semester = {
            $in: semester.split(",")
        };
    }
    else if (department) {
        filterObj.department = department;
    }
    else if (semester) {
        filterObj.semester = {
            $in: semester.split(",")
        };
    }
    const students = await Student.find(filterObj).skip((page - 1) * limit).limit(limit).sort({ [sortBy]: sortType })

    res.status(httpStatus.OK).json({ Students: students })
}