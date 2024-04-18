import mongoose, { Schema, model } from "mongoose";
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

    if (assignment.students === undefined) assignment.students = [];

    assignment.students.push({
        student: this.student,
        subimission: this.id
    });

    await assignment.save();

    next();
});

//save and update handler

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

        this.grade = marks >= 90 ? "A" : marks >= 80 ? "B" : this.marks >= 70 ? "C" : this.marks >= 60 ? "D" : "F";

        this.percentage = (this.marks / assignment.totalMarks) * 100;

        next();
    }
    next();
})

submittedAssignmentSchema.pre('updateOne', async function (next) {
    const update = this.getUpdate();

    // Check if the 'marks' field is being updated
    if (update.hasOwnProperty('marks')) {
        const queryFilter = this.getQuery();

        const CurrentSubmittedAssignment = await this.model.findOne(queryFilter);
        const assignmentId = CurrentSubmittedAssignment.assignment;


        try {
            const assignment = await mongoose.model("Assignment").findById(assignmentId);

            if (!assignment) {
                throw new Error("Assignment not found");
            }

            if (update.marks > assignment.totalMarks) {
                throw new Error("Marks cannot be greater than total marks");
            }

            if (update.marks < 0) {
                throw new Error("Marks cannot be negative");
            }

            // Calculate percentage
            const percentage = (update.marks / assignment.totalMarks) * 100;
            const grade = marks >= 90 ? "A" : marks >= 80 ? "B" : this.marks >= 70 ? "C" : this.marks >= 60 ? "D" : "F";

            // Update the document with the new percentage
            this.updateOne({}, { percentage, grade });

            next();
        } catch (error) {
            next(error);
        }
    } else {
        // If 'marks' field is not being updated, proceed to the next middleware
        next();
    }
});



export default model("SubmittedAssignment", submittedAssignmentSchema, "submittedAssignments");