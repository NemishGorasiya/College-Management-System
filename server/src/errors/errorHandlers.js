import httpStatus from 'http-status';
import logger from "../config/winston.config.js";

export const notFoundHandler = (req, res) => {
    res.statusMessage = "Not Found";
    return res.status(httpStatus.NOT_FOUND)
}

export const errorHandler = (err, req, res, next) => {
    //log the error
    if (err.status >= 500) {
        logger.error(err.message);
    }

    let errObj = { message: err.message };

    if (process.env.NODE_ENV !== "prod") {
        errObj.stack = err.stack && err.stack.split("\n").map(line => line.trim());
        errObj.cause = err?.cause;
    }

    res.statusMessage = err.statusMessage || "Internal Server Error";
    return res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR).json(errObj);
}