import { Model } from "mongoose";
import { MessageUtil } from "../utils/message";
import { StudentsService } from "../service/studentService";
import { IStudent, IStudentRegReq } from "../model/dto/studentDTO";
import { StudentValidator } from "../utils/validators/studentValidator";
import { ILoginReq } from "../types/interfaces";
import { LoginService } from "../service/loginService";

export class LoginController extends LoginService {
  private validator: StudentValidator;
  constructor() {
    super();
    this.validator = new StudentValidator();
  }

  /**
   * Create book
   * @param {*} event
   */
  async login(req: any, res: any, next: any): Promise<any> {
    const params: ILoginReq = req.body;
    try {
      //const validateParams = this.validator.validateStudentRegistration(params);
      const result = await this.loginService(params);
      return MessageUtil.success(result, 200);
    } catch (err: any) {
      throw err;
    }
  }
}
