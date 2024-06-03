"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const message_1 = require("../utils/message");
const studentValidator_1 = require("../utils/validators/studentValidator");
const loginService_1 = require("../service/loginService");
class LoginController extends loginService_1.LoginService {
    validator;
    constructor() {
        super();
        this.validator = new studentValidator_1.StudentValidator();
    }
    /**
     * Create book
     * @param {*} event
     */
    async login(req, res, next) {
        const params = req.body;
        try {
            //const validateParams = this.validator.validateStudentRegistration(params);
            const result = await this.loginService(params);
            return message_1.MessageUtil.success(result, 200);
        }
        catch (err) {
            throw err;
        }
    }
}
exports.LoginController = LoginController;
