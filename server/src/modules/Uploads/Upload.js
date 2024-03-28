import { Schema, model } from "mongoose";

const uploadedSchema = new Schema({
    asset_id: {
        type: String,
        required: true,
    }
    ,
    public_id: {
        type: String,
        required: true,
    }
    ,
    signature: {
        type: String,
        required: true,
    }
    ,
    width: {
        type: Number,
    }
    ,
    height: {
        type: Number,
    }
    ,
    format: {
        type: String,
        required: true,
    }
    ,
    resource_type: {
        type: String,
        required: true,
    }
    ,
    created_at: {
        type: String,
        required: true,
    }
    ,
    url: {
        type: String,
        required: true,
    }
    ,
    secure_url: {
        type: String,
        required: true,
    }
    ,
    folder: {
        type: String,
        required: true,
    }
    ,
    original_filename: {
        type: String,
        required: true,
    }
    ,
    api_key: {
        type: String,
        required: true,
    },
    bytes: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
});

uploadedSchema.virtual('response').get(function () {
    return {
        id: this._id,
        asset: this.asset_id,
        public_id: this.public_id,
        width: this?.width,
        height: this?.height,
        secure_url: this.secure_url,
        original_filename: this.original_filename,
        createdBy: this.createdBy,
    }
})

export default model("Upload", uploadedSchema, "uploads");