import { Model } from "mongoose";
import { classes } from "../model/classes";
import { IClass } from "../model/dto/classDTO";
import { CustomError } from "../types/errorTypes";
import { v4 as uuidv4 } from "uuid";

export class ClassesService {
  private classes: Model<any>;
  constructor() {
    this.classes = classes;
  }

  public async createClassService(
    params: IClass
  ) {
    try {
      const id = uuidv4();
      const isClassExists = await this.checkIfClassExists(params);
     
      if(isClassExists){
        throw new CustomError(`Class already exists!`,500);
      }

     const result= await this.classes.create({
        id:id,
        instituteId:params.instituteId,
        section:params.section,
        standard:params.standard
      })
      return result;
    } catch (error:any) {
      if(error.message!="Class already exists!"){
      throw new CustomError(
        "Something went wrong while creating class!",
        500
      );
    }
    else{
      throw error;
    }
     }
  }

  public async checkIfClassExists(params:IClass){
    try {
      const result = await this.classes.findOne({
        instituteId:params.instituteId,
        standard:params.standard,
        section:params.section
      })
      return result;
    } catch (error) {
      throw new CustomError(
        "Something went wrong while checking existance of class!",
        500
      );
    }

  }

  public async getClassById(
    id:string
  ) {
    try {
     const result= await this.classes.findOne({
        id:id,
      })
      return result;
    } catch (error) {
      throw new CustomError(
        "Something went wrong while fetching class!",
        500
      );
    }
  }

 

  
   
}
