import { Schema, model } from "mongoose";

const finalResultSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    examResults: {
        type: [Schema.Types.ObjectId],
        ref: "ExamResult",
        required: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

finalResultSchema.virtual("achievedMarks").get(async function () {
    let achievedMarks = 0;
    const examResults = await this.model("ExamResult").aggregate([
        {
            $match: {
                _id: {
                    $in: this.examResults
                }
            }
        },
        {
            $project: {
                marks: 1
            }
        },
        {
            $group: {
                _id: this.student,
                marks: {
                    $sum: "$marks"
                }
            }
        }
    ]);

    if (examResults.length > 0) {
        achievedMarks = examResults[0].marks;
    }

    return achievedMarks;
});

finalResultSchema.virtual("totalMarks").get(async function () {
    let totalMarks = 0

    const examResults = this.model("ExamResult").aggregate([
        {
            $match: {
                _id: {
                    $in: this.examResults
                }
            }
        },
        {
            $lookup: {
                from: "exams",
                localField: "exam",
                foreignField: "_id",
                as: "exam"
            }
        },
        {
            $unwind: "$exam"
        },
        {
            $group: {
                _id: this.student,
                totalMarks: {
                    $sum: "$exam.totalMarks"
                }
            }
        }
    ]);

    if (examResults.length > 0) {
        totalMarks = examResults[0].totalMarks;
    }

    return totalMarks;
});

finalResultSchema.virtual("percentage").get(function () {
    return (this.achievedMarks / this.totalMarks) * 100;
});

finalResultSchema.virtual("grade").get(function () {
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

finalResultSchema.virtual("gpa").get(function () {
    if (this.percentage >= 90) {
        return 4.0;
    } else if (this.percentage >= 80) {
        return 3.5;
    } else if (this.percentage >= 70) {
        return 3.0;
    } else if (this.percentage >= 60) {
        return 2.5;
    } else if (this.percentage >= 50) {
        return 2.0;
    } else if (this.percentage >= 40) {
        return 1.5;
    } else {
        return 0.0;
    }
});


export default model("FinalResult", finalResultSchema, "finalResults");