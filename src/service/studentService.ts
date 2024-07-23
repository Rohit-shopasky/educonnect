import { Model } from "mongoose";
import { IStudent, IStudentRegReq, gender } from "../model/dto/studentDTO";
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
      const parent = await this.parentService.registerParentService(
        params.parents,
        params.address
      );

      const isStudentExists = await this.checkDupicateStudentIdExists(params);
      if (isStudentExists) {
        throw new CustomError(
          `Student with schoolId ${params.schoolId} already exists!`,
          400
        );
      }
      
      // get the classId
      this.classService.getClassById("i00");

      const id = uuidv4();
      return this.students.create({
        id: id,
        instituteId: params.instituteId,
        firstName: params.firstName,
        lastName: params.lastName,
        standard: params.standard,
        parentId: parent.id,
        gender: params.gender,
        schoolId: params.schoolId,
        section:params.section
      });
    } catch (error: any) {
      throw error;
    }
  }

  public async checkDupicateStudentIdExists(params: IStudentRegReq) {
    try {
      const studentData = await this.students.findOne({
        schoolId: params.schoolId,
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
