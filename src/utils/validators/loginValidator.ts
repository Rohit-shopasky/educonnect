import { CustomError } from "../../types/errorTypes";
import { ILoginReq } from "../../types/interfaces";

export class LoginValidator {
  validateLogin(params: ILoginReq) {
    if (!params.mob) {
      throw new CustomError("Mob is required!", 400);
    }
    if (!params.instituteId) {
      throw new CustomError("InstituteId is required!", 400);
    }
    if (!params.adid) {
      throw new CustomError("Adid is required!", 400);
    }
    if (!params.platformType) {
      throw new CustomError("PlatformType is required!", 400);
    }

    if (!params.token) {
      throw new CustomError("Token is required!", 400);
    }
    
  }
}
