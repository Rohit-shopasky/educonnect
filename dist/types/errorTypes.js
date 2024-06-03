"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    message;
    status;
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
        this.status = status;
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
