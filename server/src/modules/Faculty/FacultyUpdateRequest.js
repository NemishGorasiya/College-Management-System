import { Schema, model } from "mongoose";
import { APPROVED, PENDING, REJECTED } from "../../constants/constants";

const facultyUpdateRequestSchema = new Schema({
    faculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Faculty",
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

export default model("FacultyUpdateRequest", facultyUpdateRequestSchema, "facultyUpdateRequests");