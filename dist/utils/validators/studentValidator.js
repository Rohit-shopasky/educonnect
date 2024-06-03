"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentValidator = void 0;
const errorTypes_1 = require("../../types/errorTypes");
class StudentValidator {
    validateStudentRegistration(params) {
        if (!params.firstName) {
            throw new errorTypes_1.CustomError("First name is required!", 400);
        }
        if (!params.gender) {
            throw new errorTypes_1.CustomError("Gender is required!", 400);
        }
        if (!params.schoolId) {
            throw new errorTypes_1.CustomError("School id is required!", 400);
        }
        // parents validation
        if (!params.parents || params.parents.length == 0) {
            throw new errorTypes_1.CustomError("Parents details is required!", 400);
        }
        if (params.parents.length == 0) {
            throw new errorTypes_1.CustomError("Parents details is required!", 400);
        }
        if (!params.parents[0].mob) {
            throw new errorTypes_1.CustomError("Parents mobile number is required!", 400);
        }
        if (!params.parents[0].firstName) {
            throw new errorTypes_1.CustomError("Parent firstName is required!", 400);
        }
        if (!params.parents[0].parentType) {
            throw new errorTypes_1.CustomError("Parent type is required!", 400);
        }
    }
}
exports.StudentValidator = StudentValidator;
