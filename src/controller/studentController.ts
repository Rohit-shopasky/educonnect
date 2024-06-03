import { Model } from "mongoose";
import { MessageUtil } from "../utils/message";
import { StudentsService } from "../service/studentService";
import { IStudent, IStudentRegReq } from "../model/dto/studentDTO";
import { StudentValidator } from "../utils/validators/studentValidator";
export class StudentsController extends StudentsService {
  private validator: StudentValidator;
  constructor(students: Model<any>) {
    super(students);
    this.validator = new StudentValidator();
  }

  /**
   * Create book
   * @param {*} event
   */
  async registerStudent(req: any, res: any, next: any): Promise<any> {
    const params: IStudentRegReq = req.body;
    try {
      const validateParams = this.validator.validateStudentRegistration(params);
      const result = await this.registerStudentService(params);
      return MessageUtil.success(result, 200);
    } catch (err: any) {
      throw err;
    }
  }
}
