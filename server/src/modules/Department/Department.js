import { Schema, model } from 'mongoose';

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
    contactPhoneNumber: {
        type: Number,
        required: true,
    },
    officeAddress: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    researchAreas: {
        type: [String],
        required: true,
    },
    facilities: {
        type: [String],
        required: true,
    },
    accreditation: {
        type: String,
        enum: ["NBA", "NAAC", "ABET", "AICTE", "UGC"],
        required: true,
    },
    departmentLogo: {
        type: String,
        required: true,
        default: "https://placehold.co/600x400/EEE/31343C?font=montserrat&text=Montserrat",
    },
    doe: {
        type: Date,
        required: true,
    },
    hod: {
        type: Schema.Types.ObjectId,
        ref: "Faculty",
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

//create a index for the department name
departmentSchema.index({ name: 1 }, { unique: true });

departmentSchema.virtual("faculties", {
    ref: "Faculty",
    localField: "_id",
    foreignField: "department",
    justOne: false,
});

departmentSchema.virtual("subjects", {
    ref: "Subject",
    localField: "_id",
    foreignField: "department",
    justOne: false,
});

departmentSchema.virtual("students", {
    ref: "Student",
    localField: "_id",
    foreignField: "department",
    justOne: false,
});


export default model('Department', departmentSchema, "departments");