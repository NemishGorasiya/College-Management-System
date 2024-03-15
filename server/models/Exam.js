import { Schema, Types, model } from 'mongoose';

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
        enum: ["Mid-Semester", "End-Semester", "Quiz", "Lab", "Project", "Viva", "Other"],
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
                        return this.totalMarks === "100"; //lab has 100 totalMarks
                    case "Project":
                        return this.totalMarks === "100"; //project has 100 totalMarks
                    case "Viva":
                        return this.totalMarks === "20"; //these types have 100 marks
                    default:
                        return false; //invalid type
                }
            },
            message: "Exam type must be specified"
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
}, {
    timestamps: true,
});

const Exams = model('Exams', examSchema, "exams");

module.exports = Exams;
