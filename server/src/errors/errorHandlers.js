import httpStatus from 'http-status';
import logger from "../config/winston.config.js";
import { ValidationError } from 'express-validation';
import multer from 'multer';

export const notFoundHandler = (req, res) => {
    res.statusMessage = "Not Found";
    return res.status(httpStatus.NOT_FOUND).json({ message: "Page Not Found!" })
}

export const authErrorHandler = (req, res, next) => {
    res.statusMessage = "Unauthorized";
    return res.status(httpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
}

export const errorHandler = (err, req, res, next) => {
    //log the error if it is a server error
    if (err.status >= 500) {
        console.log("this is an internal error " + err.message);
        logger.error(err.message);
    }

    //send the response
    let errObj = { message: err.message };

    if (process.env.NODE_ENV !== "prod") {
        errObj.stack = err.stack && err.stack.split("\n").map(line => line.trim());
        errObj.cause = err?.cause;
    }

    if (process.env.NODE_ENV !== "prod" && err instanceof ValidationError) {
        errObj.message = "Validation Error";
        errObj.details = err.details;

        err.statusMessage = "Validation Error";
    }

    if (process.env.NODE_ENV !== "prod" && err instanceof multer.MulterError) {
        errObj.message = err.message;
        errObj.name = err?.name;
        errObj.code = err?.code;
        errObj.field = err?.field;
    }

    res.statusMessage = err.statusMessage || "Internal Server Error";
    return res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json(errObj);
}