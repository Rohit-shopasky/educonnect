"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const model_1 = require("../model");
const errorTypes_1 = require("../types/errorTypes");
const parentsService_1 = require("./parentsService");
const studentService_1 = require("./studentService");
const parentService = new parentsService_1.ParentsService();
const studentService = new studentService_1.StudentsService(model_1.students);
class LoginService {
    parentService;
    studentService;
    constructor() {
        this.parentService = parentService;
        this.studentService = studentService;
    }
    async loginService(params) {
        try {
            const checkIfParentExists = await this.parentService.findParentByMobLogin(params.mob);
            if (!checkIfParentExists) {
                throw new errorTypes_1.CustomError(`${params.mob} is not registered! Kindly ask your admin to register your mobile number`, 400);
            }
            else {
                const result = await this.parentService.registerParentDevice(params, checkIfParentExists);
                const studentDetails = await this.studentService.fetchStudentByParentId(checkIfParentExists.id);
                return {
                    jwt: result,
                    studentDetails: studentDetails,
                };
            }
        }
        catch (error) {
            throw error;
        }
    }
}
exports.LoginService = LoginService;
