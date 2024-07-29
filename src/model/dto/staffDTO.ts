import { gender, staffType } from "../constants";
import { IDeviceDetails } from "./parentDTO";

export interface IStaff{
  id:string,
  mob:string,
  schoolId:string
  instituteId:string,
  staffType:staffType,
  firstName:string,
  lastName:string,
  age:number,
  gender:gender
  classes:string[],
  device:IDeviceDetails[]
  address:string,
  qualifications:string,
  createdAt:string,
}

export interface IStaffReq{
  mob:string,
  instituteId:string,
  staffType:staffType,
  firstName:string,
  lastName:string,
  age:number,
   gender:gender,
  classes:string[],
  address:string,
  qualifications:string,
  schoolId:string
}