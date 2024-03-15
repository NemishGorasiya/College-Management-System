import { Schema, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
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
    fullName: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});

adminSchema.plugin(passportLocalMongoose, {
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

export default model("Admin", adminSchema, "admins");