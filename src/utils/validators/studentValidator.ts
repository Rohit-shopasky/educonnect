import { IStudent, IStudentRegReq } from "../../model/dto/studentDTO";
import { CustomError } from "../../types/errorTypes";

export class StudentValidator {
  validateStudentRegistration(params: IStudentRegReq) {
    if (!params.firstName) {
      throw new CustomError("First name is required!", 400);
    }
    if (!params.gender) {
      throw new CustomError("Gender is required!", 400);
    }
    if (!params.schoolId) {
      throw new CustomError("School id is required!", 400);
    }
    // parents validation
    if (!params.parents || params.parents.length == 0) {
      throw new CustomError("Parents details is required!", 400);
    }
    if (params.parents.length == 0) {
      throw new CustomError("Parents details is required!", 400);
    }
    if (!params.parents[0].mob) {
      throw new CustomError("Parents mobile number is required!", 400);
    }
    if (!params.parents[0].firstName) {
      throw new CustomError("Parent firstName is required!", 400);
    }
    if (!params.parents[0].parentType) {
      throw new CustomError("Parent type is required!", 400);
    }
  }
}
