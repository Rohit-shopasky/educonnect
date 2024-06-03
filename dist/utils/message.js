"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageUtil = void 0;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["success"] = 200] = "success";
    StatusCode[StatusCode["error"] = 400] = "error";
})(StatusCode || (StatusCode = {}));
class Result {
    statusCode;
    code;
    message;
    data;
    constructor(statusCode, code, message, data) {
        this.statusCode = statusCode;
        this.code = code;
        this.message = message;
        this.data = data;
    }
    /**
     * Serverless: According to the API Gateway specs, the body content must be stringified
     */
    bodyToString() {
        return {
            statusCode: this.statusCode,
            body: {
                code: this.code,
                message: this.message,
                data: this.data,
            },
        };
    }
}
class MessageUtil {
    static success(data, code) {
        const result = new Result(StatusCode.success, code, "success", data);
        return result.bodyToString();
    }
    static error(code, message) {
        const result = new Result(StatusCode.error, code, message);
        return result.bodyToString();
    }
}
exports.MessageUtil = MessageUtil;
