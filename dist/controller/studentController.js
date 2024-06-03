"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsController = void 0;
const message_1 = require("../utils/message");
const studentService_1 = require("../service/studentService");
const studentValidator_1 = require("../utils/validators/studentValidator");
class StudentsController extends studentService_1.StudentsService {
    validator;
    constructor(students) {
        super(students);
        this.validator = new studentValidator_1.StudentValidator();
    }
    /**
     * Create book
     * @param {*} event
     */
    async registerStudent(req, res, next) {
        const params = req.body;
        try {
            const validateParams = this.validator.validateStudentRegistration(params);
            const result = await this.registerStudentService(params);
            return message_1.MessageUtil.success(result, 200);
        }
        catch (err) {
            throw err;
        }
    }
}
exports.StudentsController = StudentsController;
