import { v2 as cloudinary } from "cloudinary";
import CustomError from "../../errors/CustomError.js";
import httpStatus from "http-status";
import fsPromises from "node:fs/promises"
import Upload from "./Upload.js";

cloudinary.config({
    cloud_name: 'dhjo1bmn7',
    api_key: '791439462714441',
    api_secret: 'wvDK2HBaTYa_PTc7Tm9N-IS_7qY',

})

export const uploadHandler = async (req, res) => {
    const { path } = req.file;

    if (!path && !req.file) {
        throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR, "Image was not uploaded");
    }

    await cloudinary.uploader.upload(path, {
        folder: "ClgMgmtSys",
        use_filename: true,
    }, async (err, result) => {
        if (err) {
            throw new CustomError(err.http_code, err.message);
        }
        try {
            result.createdBy = req.user._id;
            const newUpload = await Upload.create(result);

            await fsPromises.unlink(path);

            return res.status(httpStatus.CREATED).send({
                message: "File Uploaded Successfully",
                response: newUpload.response,
            })
        } catch (err) {
            console.log(err);
            throw new CustomError(err.status || httpStatus.INTERNAL_SERVER_ERROR, err.message);
        }
    })
}