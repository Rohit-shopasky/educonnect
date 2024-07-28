import { gender } from "../constants";
import { IParentDetails } from "./parentDTO";

export interface IStudent {
  instituteId: string;
  firstName: string;
  lastName: string;
  classId:string;
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



export interface IStudentRegReq {
  instituteId: string;
  firstName: string;
  lastName: string;
  standard: string;
  section:string;
  parents: IParentDetails[];
  gender: gender;
  schoolId: string;
  id?: string;
  address?: string;
}
