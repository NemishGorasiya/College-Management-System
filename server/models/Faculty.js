import { Schema, Types, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const facultySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: Types.ObjectId,
        required: true,
        ref: "Department",
    },
    designation: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    qualification: {
        type: [String],
        required: true
    },
    experience: {
        type: Number,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    doj: {
        type: Date,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    semesters: {
        type: [Number],
        required: true,
    },
    subjects: {
        type: [Types.ObjectId],
        required: true,
        ref: "Subject",
    },
    profilePicture: {
        type: String,
    },
    isHOD: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
});

facultySchema.plugin(passportLocalMongoose, {
    usernameField: "email", // username is email
    passwordError: "Invalid password",
    userNotFound: "Invalid enrollment number",
    incorrectPassword: "Invalid password",
    missingUsername: "Enrollment number is required",
    missingPassword: "Password is required",
    userExists: "User already exists",
    noSaltValueStored: "Authentication not possible",
    tooManyAttempts: "Too many attempts, account locked",
    attempts: "attempts",
    lastLogin: "lastLogin",
    passwordValidator: (password, cb) => {
        if (password.length < 8) {
            return cb({ message: "Password is too short" });
        }
        if (!password.match(/[a-z]/)) {
            return cb({ message: "Password must contain at least one lowercase letter" });
        }
        if (!password.match(/[A-Z]/)) {
            return cb({ message: "Password must contain at least one uppercase letter" });
        }
        if (!password.match(/[0-9]/)) {
            return cb({ message: "Password must contain at least one number" });
        }
        cb(null);
    },
    // limitAttempts: true,
    // maxAttempts: 10,
    unlockInterval: 60000,
});

export default model("Faculty", facultySchema, "faculties");