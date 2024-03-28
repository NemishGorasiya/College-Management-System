import { Schema, model } from "mongoose";

const assignmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    faculty: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
        required: true
    },
    students: [
        {
            student: {
                type: Schema.Types.ObjectId,
                ref: "Student"
            },
            submission: {
                type: Schema.Types.ObjectId,
                ref: "SubmittedAssignment"
            }
        }
    ]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

export default model("Assignment", assignmentSchema, "assignments");