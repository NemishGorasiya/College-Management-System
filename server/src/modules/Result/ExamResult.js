import { Schema, model } from "mongoose";

const examResultSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    exam: {
        type: Schema.Types.ObjectId,
        ref: "Exam",
        required: true
    },
    marks: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

examResultSchema.virtuals("percentage").get(async function () {
    const exam = await this.model('Exam').findOne({ _id: this.exam });

    // Calculate the percentage
    if (exam) {
        return (this.marks / exam.totalMarks) * 100;
    } else {
        return null; // Handle the case where exam document is not found
    }
});

examResultSchema.virtuals("grade").get(function () {
    // Calculate the grade
    if (this.percentage >= 90) {
        return "A+";
    } else if (this.percentage >= 80) {
        return "A";
    } else if (this.percentage >= 70) {
        return "B+";
    } else if (this.percentage >= 60) {
        return "B";
    } else if (this.percentage >= 50) {
        return "C";
    } else if (this.percentage >= 40) {
        return "D";
    } else {
        return "F";
    }
});

export default model("ExanResult", examResultSchema, "examResults")