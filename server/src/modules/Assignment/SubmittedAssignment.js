import { Schema, model } from "mongoose";
import CustomError from "../../errors/CustomError.js";
import httpStatus from "http-status";

const submittedAssignmentSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    assignment: {
        type: Schema.Types.ObjectId,
        ref: "Assignment",
        required: true
    },
    file: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
    },
    grade: {
        type: String
    },
    percentage: {
        type: Number
    },
    isLate: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

submittedAssignmentSchema.index({ student: 1, assignment: 1 }, { unique: true });

submittedAssignmentSchema.pre("save", async function (next) {
    const assignment = await this.model("Assignment").findById(this.assignment);

    if (!assignment) {
        throw new CustomError(httpStatus.BAD_REQUEST, "Assignment not found");
    }

    if (Date.now() > assignment.dueDate) {
        this.isLate = true;
    }

    assignment.students.push({
        student: this.student,
        subimission: this._id
    })

    await assignment.save();

    next();
});

submittedAssignmentSchema.pre("save", async function (next) {
    if (this.isModified("marks")) {
        const assignment = await this.model("Assignment").findById(this.assignment);

        if (!assignment) {
            throw new CustomError(httpStatus.BAD_REQUEST, "Assignment not found");
        }

        if (this.marks > assignment.totalMarks) {
            throw new CustomError(httpStatus.BAD_REQUEST, "Marks cannot be greater than total marks");
        }

        if (this.marks < 0) {
            throw new CustomError(httpStatus.BAD_REQUEST, "Marks cannot be negative");
        }

        this.grade = this.marks >= 90 ? "A+" : this.marks >= 80 ? "A" : this.marks >= 70 ? "B+" : this.marks >= 60 ? "B" : this.marks >= 50 ? "C" : this.marks >= 40 ? "D" : "F";

        this.percentage = (this.marks / assignment.totalMarks) * 100;

        next();
    }
})

export default model("SubmittedAssignment", submittedAssignmentSchema, "submittedAssignments");