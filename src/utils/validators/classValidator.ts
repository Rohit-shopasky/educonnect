import { IClass } from "../../model/dto/classDTO";
import { CustomError } from "../../types/errorTypes";

export class ClassValidator {
  validateClass(params: IClass) {
    if (!params.instituteId) {
      throw new CustomError("InstituteId is required!", 400);
    }
    if (!params.standard) {
      throw new CustomError("Standard is required!", 400);
    }
  }
}
