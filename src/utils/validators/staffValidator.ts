import { IStaffReq } from "../../model/dto/staffDTO";
import { CustomError } from "../../types/errorTypes";

export class StaffValidator {
  validateStaff(params: IStaffReq) {
    if (!params.instituteId) {
      throw new CustomError("InstituteId is required!", 400);
    }
    if (!params.firstName) {
      throw new CustomError("firstName is required!", 400);
    }
     if (!params.lastName) {
      throw new CustomError("lastName is required!", 400);
    }
     if (!params.mob) {
      throw new CustomError("mob is required!", 400);
    }
     if (!params.staffType) {
      throw new CustomError("staffType is required!", 400);
    }
     if (!params.age) {
      throw new CustomError("age is required!", 400);
    }
     if (!params.gender) {
      throw new CustomError("gender is required!", 400);
    }
     if (!params.schoolId) {
      throw new CustomError("firstName is required!", 400);
    }
  }
}
