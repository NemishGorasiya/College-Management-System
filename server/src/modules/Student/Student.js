import { Schema, Types, model } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import CustomError from '../../errors/CustomError.js';
import httpStatus from 'http-status';

const studentSchema = new Schema({
    enrollmentNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    doa: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHERS"],
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    parentPhoneNumber: {
        type: Number,
        length: 10,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    semester: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7, 8],
        required: true,
    },
    passOutYear: {
        type: Number,
        required: true,
    },
    department: {
        type: Types.ObjectId,
        required: true,
        ref: "Department",
    },
    profilePicture: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});

studentSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

studentSchema.pre("save", async function (next) {
    const department = await this.model("Department").findById(this.department);

    if (!department) {
        return next(new CustomError(httpStatus.BAD_REQUEST, "Department not found"));
    }

    next();
})

studentSchema.pre("save", function (next) {
    this.age = new Date().getFullYear() - this.dob.getFullYear();
    next();
});

studentSchema.plugin(passportLocalMongoose, {
    usernameField: "enrollmentNumber",
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
        // if (password.length < 8) {
        //     return cb({ message: "Password is too short" });
        // }
        // if (!password.match(/[a-z]/)) {
        //     return cb({ message: "Password must contain at least one lowercase letter" });
        // }
        // if (!password.match(/[A-Z]/)) {
        //     return cb({ message: "Password must contain at least one uppercase letter" });
        // }
        // if (!password.match(/[0-9]/)) {
        //     return cb({ message: "Password must contain at least one number" });
        // }
        cb(null);
    },
    // limitAttempts: true,
    // maxAttempts: 10,
    unlockInterval: 60000,
});

export default model("Student", studentSchema, "students");