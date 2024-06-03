import { students } from "../model";
import { CustomError } from "../types/errorTypes";
import { ILoginReq, ILoginResponse } from "../types/interfaces";
import { ParentsService } from "./parentsService";
import { StudentsService } from "./studentService";

const parentService = new ParentsService();
const studentService = new StudentsService(students);
export class LoginService {
  private parentService: ParentsService;
  private studentService: StudentsService;
  constructor() {
    this.parentService = parentService;
    this.studentService = studentService;
  }

  public async loginService(params: ILoginReq): Promise<ILoginResponse> {
    try {
      const checkIfParentExists = await this.parentService.findParentByMobLogin(
        params.mob
      );
      if (!checkIfParentExists) {
        throw new CustomError(
          `${params.mob} is not registered! Kindly ask your admin to register your mobile number`,
          400
        );
      } else {
        const result = await this.parentService.registerParentDevice(
          params,
          checkIfParentExists
        );

        const studentDetails = await this.studentService.fetchStudentByParentId(
          checkIfParentExists.id
        );

        return {
          jwt: result,
          studentDetails: studentDetails,
        };
      }
    } catch (error) {
      throw error;
    }
  }
}
