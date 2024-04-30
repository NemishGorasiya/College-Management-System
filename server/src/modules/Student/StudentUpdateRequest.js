import { Schema, model } from "mongoose";
import { APPROVED, PENDING, REJECTED } from "../../constants/constants.js";

const studentUpdateRequestSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Student",
    },
    changes: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        enum: [PENDING, APPROVED, REJECTED],
        default: PENDING,
    },
    actionBy: {
        type: Schema.Types.ObjectId,
        ref: "Admin",
    },
}, { timestamps: true });

export default model("StudentUpdateRequest", studentUpdateRequestSchema, "studentUpdateRequests");