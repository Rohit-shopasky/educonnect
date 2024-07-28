import { Model } from "mongoose";
import { staffs } from "../model/staffs";
import { IStaff, IStaffReq } from "../model/dto/staffDTO";
import { CustomError } from "../types/errorTypes";
import { v4 as uuidv4 } from "uuid";

export class StaffService {
  private staffs: Model<any>;
  constructor() {
    this.staffs = staffs;
  }

  public async createStaffService(
    params: IStaffReq
  ):Promise<IStaff> {
    try {
      const id = uuidv4();
      const isStaffExists = await this.checkIfStaffExists(params);
      console.log("isStaffExisits====>",isStaffExists);
      if(isStaffExists){
        throw new CustomError(`Staff already exists!`,400);
      }

     const result= await this.staffs.create({
        id:id,
        instituteId:params.instituteId,
        mob:params.mob,
        staffType:params.staffType,
        firstName:params.firstName,
        lastName:params.lastName,
        age:params.age,
        gender:params.gender,
        classes:[],
        address:params.address,
        qualifications:params.qualifications,
        schoolId:params.schoolId
      })
      return result;
    } catch (error:any) {
      if(error.message!="Staff already exists!"){
      throw new CustomError(
        "Something went wrong while creating staff!",
        500
      );
    }
    else{
      throw error;
    }
     }
  }

  public async checkIfStaffExists(params:IStaffReq){
    try {
      const result = await this.staffs.findOne({
        $or:[{mob:params.mob},{ schoolId:params.schoolId}]
        
       
      })
      return result;
    } catch (error) {
      throw new CustomError(
        "Something went wrong while checking existance of staff!",
        500
      );
    }

  }

  


 

  
   
}
