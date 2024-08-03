import { Model } from "mongoose";
import { IStudent, IStudentRegReq, } from "../model/dto/studentDTO";
import { v4 as uuidv4 } from "uuid";
import { ParentsService } from "./parentsService";
import {ClassesService} from "./classesService";
import { CustomError } from "../types/errorTypes";

const parentService = new ParentsService();
const classService = new ClassesService();
export class StudentsService {
  private students: Model<any>;
  private parentService: ParentsService;
  private classService:ClassesService;
  constructor(students: Model<any>) {
    this.students = students;
    this.parentService = parentService;
    this.classService = classService;
  }

  /**
   * Create student
   * @param params
   */

  public async registerStudentService(params: IStudentRegReq) {
    try {

      // get the classId
     const classDetails=await this.classService.getClassByStandardAndSection(params.standard,params.section,params.instituteId);
   
     if(!classDetails){
      throw new CustomError(`Class does not exists!`,400);
     }

     
      const parent = await this.parentService.registerParentService(
        params.parents,
        params.instituteId,
        params.address
      );

      const isStudentExists = await this.checkDupicateStudentIdExists(params);
      if (isStudentExists) {
        throw new CustomError(
          `Student with schoolId ${params.schoolId} already exists!`,
          400
        );
      }
      
      const id = uuidv4();
      return this.students.create({
        id: id,
        instituteId: params.instituteId,
        firstName: params.firstName,
        lastName: params.lastName,
        parentId: parent.id,
        gender: params.gender,
        schoolId: params.schoolId,
        classId:classDetails.id
      });
    } catch (error: any) {
      throw error;
    }
  }

  public async checkDupicateStudentIdExists(params: IStudentRegReq) {
    try {
      const studentData = await this.students.findOne({
        schoolId: params.schoolId,
        instituteId:params.instituteId
      });
      return studentData ? true : false;
    } catch (error: any) {
      throw new CustomError("Error while searching duplicate studentId", 500);
    }
  }

  public async fetchStudentByParentId(parentId: string) {
    try {
      const studentDetails = await this.students.find({ parentId: parentId });
      return studentDetails;
    } catch (error) {
      throw new CustomError("Error while fetching student!", 500);
    }
  }

  //   /**
  //    * Update a book by id
  //    * @param id
  //    * @param data
  //    */
  //   protected updateBooks(id: number, data: object) {
  //     return this.books.findOneAndUpdate({ id }, { $set: data }, { new: true });
  //   }

  /**
   * Find books
   */
  // protected findStudents() {
  //   return this.students.find();
  // }

  // /**
  //  * Query book by id
  //  * @param id
  //  */
  // protected findStudentById(id: number) {
  //   return this.students.findOne({ id });
  // }

  //   /**
  //    * Delete book by id
  //    * @param id
  //    */
  //   protected deleteOneBookById(id: number) {
  //     return this.books.deleteOne({ id });
  //   }
}
