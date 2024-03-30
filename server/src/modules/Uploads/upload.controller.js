import httpStatus from "http-status";
import streamifier from "streamifier";
import CustomError from "../../errors/CustomError.js";
import Upload from "./Upload.js";
import cloudinary from "../../config/cloudinary.config.js";

export const uploadHandler = async (req, res) => {
    const { originalname } = req.file;

    if (!req.file) {
        throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR, "Image was not uploaded");
    }

    const uploadStream = cloudinary.uploader.upload_stream({
        resource_type: "auto",
        folder: `ClgMgmtSys/${req.user._id}`,
        filename_override: originalname,
        optimize: true,
        allowed_formats: ["jpeg", "jpg", "png", "gif", "auto", "pdf", "csv", "json"],
    }, async (err, result) => {
        if (err) {
            throw new CustomError(err.http_code, err.message);
        }
        try {
            result.createdBy = req.user._id;

            if (result.format === undefined) {
                result.format = result.resource_type || "file";
            }

            const newUpload = await Upload.create(result);

            return res.status(httpStatus.CREATED).send({
                message: "File Uploaded Successfully",
                response: newUpload.response,
            })
        } catch (err) {
            throw new CustomError(err.status || httpStatus.INTERNAL_SERVER_ERROR, err.message);
        }
    })

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream, { end: true });
};