import { EPlatformType } from "../model/dto/parentDTO";
import { EParentType, IParent, IStudent } from "../model/dto/studentDTO";

export interface ILoginReq {
  mob: string;
  owner: EParentType;
  platformType: EPlatformType;
  token: string;
  adid: string;
}

export interface ILoginResponse {
  jwt: string;
  studentDetails: IStudent[];
}
