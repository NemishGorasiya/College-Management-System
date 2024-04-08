import httpStatus from "http-status";

export default class CustomError extends Error {
    constructor(errCode, message) {
        super(message);

        this.status = errCode;
        this.message = message;
        this.statusMessage = httpStatus[errCode] || "Internal Server Error";
    }
}