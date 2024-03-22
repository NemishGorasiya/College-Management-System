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
    }
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
        throw new CustomError(httpStatus.BAD_REQUEST, "Assignment is overdue");
    }

    assignment.students.push({
        student: this.student,
        subimission: this._id
    })

    await assignment.save();

    next();
})

//TODO: remove virtuals while development is done
// submittedAssignmentSchema.virtual("percentage").get(async function () {
//     const assignement = await this.model('Assignment').findOne({ _id: this.assignment });

//     return (this.marks / assignement.totalMarks) * 100;
// });

// submittedAssignmentSchema.virtual("grade").get(function () {
//     // Calculate the grade
//     if (this.percentage >= 90) {
//         return "A+";
//     } else if (this.percentage >= 80) {
//         return "A";
//     } else if (this.percentage >= 70) {
//         return "B+";
//     } else if (this.percentage >= 60) {
//         return "B";
//     } else if (this.percentage >= 50) {
//         return "C";
//     } else if (this.percentage >= 40) {
//         return "D";
//     } else {
//         return "F";
//     }
// });

// submittedAssignmentSchema.virtual("isLate").get(async function () {
//     const assignement = await this.model('Assignment').findOne({ _id: this.assignment });

//     return Date.now() > assignement.dueDate;
// })

export default model("SubmittedAssignment", submittedAssignmentSchema, "submittedAssignments");