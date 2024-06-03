import { IParentDetails } from "./parentDTO";

export interface IStudent {
  instituteId: string;
  firstName: string;
  lastName: string;
  standard: string;
  parentId: string;
  gender: gender;
  schoolId: string;
  id?: string;
}

export interface IParent {
  name: string;
  parentType: EParentType;
  mobile: string;
  parentId: string;
}

export enum EParentType {
  FATHER = "FATHER",
  MOTHER = "MOTHER",
  GAURDIAN = "GAURDIAN",
}

export enum gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export interface IStudentRegReq {
  instituteId: string;
  firstName: string;
  lastName: string;
  standard: string;
  parents: IParentDetails[];
  gender: gender;
  schoolId: string;
  id?: string;
  address?: string;
}
