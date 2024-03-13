import { required } from 'joi';
import { Schema, Types, model } from 'mongoose';
import { add } from 'winston';

const studentSchema = new Schema({
    enrollmentNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
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
        required: true,
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
})