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
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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

adminSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
})

adminSchema.plugin(passportLocalMongoose, {
    usernameField: "email", // username is email - primary key
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
    // limitAttempts: true,
    // maxAttempts: 10,
    unlockInterval: 60000,

});

export default model("Admin", adminSchema, "admins");