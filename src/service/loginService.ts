import { students } from "../model";
import { CustomError } from "../types/errorTypes";
import { ILoginReq, ILoginResponse } from "../types/interfaces";
import { ParentsService } from "./parentsService";
import { StaffService } from "./staffService";
import { StudentsService } from "./studentService";

const parentService = new ParentsService();
const studentService = new StudentsService(students);
const staffService = new StaffService();
export class LoginService {
  private parentService: ParentsService;
  private studentService: StudentsService;
  private staffService:StaffService;
  constructor() {
    this.parentService = parentService;
    this.studentService = studentService;
    this.staffService = staffService;
  }

  public async loginService(params: ILoginReq): Promise<ILoginResponse> {
    try {
      const checkIfParentExists = await this.parentService.findParentByMobLogin(
        params.mob,
        params.instituteId
      );
      if (!checkIfParentExists) {
        throw new CustomError(
          `${params.mob} is not registered! Kindly ask your admin to register your mobile number.`,
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

  public async staffLoginService(params: ILoginReq): Promise<any> {
    try {
        const checkIfStaffExists= await this.staffService.findStaffByMobile(params.mob,params.instituteId)
       if(!checkIfStaffExists){
        throw new CustomError(`${params.mob} is not registered!  Kindly ask your admin to register your mobile number.`,400)
       }

       const result= await this.staffService.registerDeviceDetails(params,checkIfStaffExists);
       return result;
        // return {
        //   jwt: result,
        //   studentDetails: studentDetails,
        // };

      
      
    } catch (error) {
      throw error;
    }
  }
}
