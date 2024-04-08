import { model, Schema } from "mongoose";

const CircularSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
})

export default model("Circular", CircularSchema, "circulars");