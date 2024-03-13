import { Schema, model, Types } from "mongoose";

const SubjectResourcesSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    _id: false,
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    subjectCode: {
        type: Number,
        required: true,
        unique: true,
    },
    department: {
        type: Types.ObjectId,
        required: true,
        ref: "Department",
    },
    semester: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true,
    },
    desciption: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    hoursPerWeek: {
        type: Number,
        required: true,
    },
    resources: {
        type: [SubjectResourcesSchema],
        required: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

//virtuals property for faculties of subject
subjectSchema.virtual("faculties").get(function () {
    return this.model("Faculty").find({
        subjects: {
            $in: [this._id]
        }
    })
});

export default model("Subject", subjectSchema, "subjects");