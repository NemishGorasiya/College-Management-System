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
    },
    achievedMarks: {
        type: Number
    },
    totalMarks: {
        type: Number
    },
    percentage: {
        type: Number
    },
    examType: {
        type: String
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

finalResultSchema.index({ student: 1, semester: 1, examType: 1 }, { unique: true });

finalResultSchema.pre("save", async function (next) {
    //calculate the achieved marks
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

    this.achievedMarks = achievedMarks;

    //calculate the total marks
    let totalMarks = 0;
    const examResults2 = await this.model("ExamResult").aggregate([
        {
            $match: {
                _id: {
                    $in: this.examResults
                }
            }
        },
        {
            $lookup: {
                from: "exams", //collection name
                localField: "exam", //field in the input document
                foreignField: "_id", //field in the documents of the "from" collection
                as: "exam" //output array field
            }
        },
        {
            $unwind: "$exam" //deconstructs the array field from the input documents to output a document for each element
        },
        {
            $group: {
                _id: this.student,
                totalMarks: {
                    $sum: "$exam.totalMarks"
                }
            }
        }
    ])

    if (examResults2.length > 0) {
        totalMarks = examResults2[0].totalMarks;
    }

    this.totalMarks = totalMarks;

    //calculate the percentage
    this.percentage = (this.achievedMarks / this.totalMarks) * 100;

    next();
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

finalResultSchema.virtual("spi").get(function () {
    return (this.percentage / 10) + 0.5;
});

export default model("FinalResult", finalResultSchema, "finalResults");