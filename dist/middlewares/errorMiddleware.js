"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.log("middleware err-->", err.message, " error==>", err.status);
    const statusCode = err.status || 500;
    const body = err.message || "Something went wrong";
    return res.status(statusCode).json({
        statusCode,
        body
    });
};
exports.errorHandler = errorHandler;
