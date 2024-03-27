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

examResultSchema.pre("save", function (next) {
    // Check if the marks are less than total marks
    const exam = this.model("Exam").findById(this.exam);

    //Check if the student has already taken the exam
    this.model("ExamResult").findOne({ student: this.student, exam: this.exam })
        .then(result => {
            if (result) {
                next(new Error("Student has already taken the exam"));
            } else {
                next();
            }
        })
        .catch(next);

    //save the result in the exam
    exam.results.push({ student: this.student, marks: this.marks });
    next();
});

examResultSchema.virtual("percentage").get(async function () {
    const exam = await this.model('Exam').findOne({ _id: this.exam });

    // Calculate the percentage
    if (exam) {
        return (this.marks / exam.totalMarks) * 100;
    } else {
        return null; // Handle the case where exam document is not found
    }
});

examResultSchema.virtual("grade").get(function () {
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

export default model("ExamResult", examResultSchema, "examResults")