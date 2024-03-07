import { Schema, model, connect } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
    enrollmentNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    dateOfBirth: {
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
        enum: ["Male", "Female", "Other"]
    },
    parentPhoneNumber: {
        type: Number,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
    },
    age: {
        type: Number,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
}, {
    timeseries: true,
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
})

userSchema.pre("save", function (next) {
    this.age = new Date().getFullYear() - this.dateOfBirth.getFullYear();
    next();
})


userSchema.plugin(passportLocalMongoose, {
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
})


const User = model("User", userSchema);

export default User;