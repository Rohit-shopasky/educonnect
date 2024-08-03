import { Model } from "mongoose";
import { staffs } from "../model/staffs";
import { IStaff, IStaffReq } from "../model/dto/staffDTO";
import { CustomError } from "../types/errorTypes";
import { v4 as uuidv4 } from "uuid";
import { ILoginReq } from "../types/interfaces";
import { ParentsService } from "./parentsService";
const parentService = new ParentsService();
export class StaffService {
  private staffs: Model<any>;
  private parentService: ParentsService;
  constructor() {
    this.staffs = staffs;
    this.parentService = parentService;
    
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
        $and:[{mob:params.mob},{ schoolId:params.schoolId},{instituteId:params.instituteId}]
      })
      return result;
    } catch (error) {
      throw new CustomError(
        "Something went wrong while checking existance of staff!",
        500
      );
    }
  }

  public async findStaffByMobile(mob:string,instituteId:string){
    try {
      const result = await this.staffs.findOne({
        mob:mob,
        instituteId:instituteId
      })
      return result;
    } catch (error) {
      throw new CustomError(
        "Something went wrong while checking existance of staff!",
        500
      );
    }
  }
  

  public async registerDeviceDetails(params:ILoginReq,existingStaff:IStaff){
      try {
     
        // update only jwt and token
        const jwt = await this.parentService.generateJWT(existingStaff.id,existingStaff.mob,existingStaff.instituteId);
        const updateData = await this.staffs.updateOne({
          id:existingStaff.id,
          mob:existingStaff.mob,
          instituteId:existingStaff.instituteId
        },{
          $set:{
            "device.jwt":jwt,
            "device.platformType":params.platformType,
            "device.token":params.token,
            "device.adid":params.adid
          }
        })
        console.log("updateData===>",updateData);
        const result = await this.staffs.findOne({
          id:existingStaff.id
        })

        return {
          jwt:jwt,
          staffDetails:result
        }
        
      } catch (error) {
        throw new CustomError("Error while updating user device", 500);
      }
  }

  


 

  
   
}
