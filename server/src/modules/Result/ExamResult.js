import { Schema, model } from "mongoose";
import CustomError from "../../errors/CustomError.js";
import httpStatus from "http-status";

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
    },
    percentage: {
        type: Number,
    },
    examType: {
        type: String,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

examResultSchema.pre("save", async function (next) {
    
        
        if (this.isNew) {
            // Check if the marks are less than total marks
            const exam = await this.model("Exam").findById(this.exam);

            if (!exam) {
                throw new CustomError(httpStatus.NOT_FOUND, "Exam not found");
            }

            if (this.marks > exam.totalMarks) {
                throw new CustomError(httpStatus.BAD_REQUEST, "Marks cannot be greater than total marks");
            }

            // Check if the student has already taken the exam
            const existingResult = await this.model("ExamResult").findOne({ student: this.student, exam: this.exam });

            if (existingResult) {
                throw new CustomError(httpStatus.BAD_REQUEST, "Student has already taken the exam");
            }

            // Add the exam type to the result
            this.examType = exam.examType;

            // Save the result in the exam
            if (!exam.results) {
                exam.results = [];
            }

            exam.results.push({ student: this.student, marks: this.marks });

            this.percentage = (this.marks / exam.totalMarks) * 100;

            await this.model("Exam").findByIdAndUpdate(this.exam, exam);
            next();
        }else{
            if(this.isModified("marks")){
                const exam = await this.model("Exam").findById(this.exam);
                this.percentage=(this.marks/exam.totalMarks)*100;
                next()
            }
            else{
                next()
            }
        }
       
  
});

examResultSchema.index({ student: 1, exam: 1 }, { unique: true });

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