import { Schema, Types, model } from 'mongoose';
import CustomError from "../../errors/CustomError.js";
import httpStatus from 'http-status';
import Faculty from "../Faculty/Faculty.js";
import { isAfter } from 'date-fns';
import { InternalSubmissions, Lab, MidSemester, Project, Quiz, Viva } from '../../constants/constants.js';

// Define sub-schema for different types of exams
const examSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    totalMarks: {
        type: Number,
        required: true
    },
    subject: {
        type: Types.ObjectId,
        required: true,
        ref: "Subject"
    },
    examType: {
        type: String,
        enum: [MidSemester, InternalSubmissions, Viva, Quiz, Project, Lab], //no ENd-Semester exams because they are handled by the university
        validate: {
            validator: function (v) {
                //assert the totalMarks and exam-type are consistent
                if (!v || !this.totalMarks) return false; //if either is not defined, return false (invalid)

                switch (v) {
                    case "Mid-Semester":
                        return this.totalMarks === 30; //mid-semester has 30 totalMarks
                    case "End-Semester":
                        return this.totalMarks === 70; //end-semester has 70 totalMarks
                    case "Quiz":
                        return this.totalMarks ? this.totalMarks < 100 : false; //quiz has totalMarks less than 100
                    case "Lab":
                        return this.totalMarks === 100; //lab has 100 totalMarks
                    case "Project":
                        return this.totalMarks === 100; //project has 100 totalMarks
                    case "Viva":
                        return this.totalMarks === 20; //these types have 100 marks
                    default:
                        return false; //invalid type
                }
            },
            message: "Total marks and exam type are inconsistent or invalid"
        },
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    duration: { //in hours
        type: Number,
        required: true
    },
    faculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Faculty",
    },
    results: [{
        student: {
            type: Schema.Types.ObjectId,
            ref: "Student",
        },
        marks: {
            type: Number,
        },
    }]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
});

examSchema.virtual("isCompleted").get(function () {
    if (isAfter(new Date(), this.date)) {
        return true;
    }

    return false;
})

const handleHODexams = async (exam, next) => {

    const faculty = await Faculty.findById(exam.faculty)

    if (!faculty) {
        next(new CustomError(httpStatus.NOT_FOUND, "Faculty not found"))
    }

    if (!faculty.isHOD) {
        next(new CustomError(httpStatus.FORBIDDEN, "Only HOD can create this exam"));
    }

    next();
};

const handleNormalExams = async (exam, next) => {
    const faculty = await Faculty.findById(exam.faculty)

    if (!faculty) {
        next(new CustomError(httpStatus.NOT_FOUND, "Faculty not found"))
    }

    if (!faculty.subjects.includes(exam.subject)) {
        next(new CustomError(httpStatus.FORBIDDEN, "HOD can only create exams for subjects they teach"));
    }

    next();
}

examSchema.pre("save", function (next) {
    if (this.isModified("examType")) {
        //handle HOD exams - Viva, Mid-Semester and Internal Exams
        //handlle normal exams - Quiz, Project, Lab - created by faculty
        switch (this.examType) {
            case Viva:
            case MidSemester:
            case InternalSubmissions:
                handleHODexams(this, next);
                break;
            case Quiz:
            case Project:
            case Lab:
                handleNormalExams(this, next);
                break;
            default:
                next(new CustomError(httpStatus.BAD_REQUEST, "Invalid exam type"));
        }
    } else {
        next();
    }

});

examSchema.pre("updateOne", function (next) {
    if (this.isModified("examType")) {
        //handle HOD exams - Viva, Mid-Semester and Internal Exams
        //handlle normal exams - Quiz, Project, Lab - created by faculty
        switch (this.examType) {
            case Viva:
            case MidSemester:
            case InternalSubmissions:
                handleHODexams(this, next);
                break;
            case Quiz:
            case Project:
            case Lab:
                handleNormalExams(this, next);
                break;
            default:
                next(new CustomError(httpStatus.BAD_REQUEST, "Invalid exam type"));
        }
    }

});

examSchema.methods.getResults = async function () {
    const results = await this.model("ExamResult").find({ exam: this._id }).populate({
        path: "student",
        select: "name email"
    });
    return results;
}


export default model("Exam", examSchema, "exams");