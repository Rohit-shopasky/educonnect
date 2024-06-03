"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsService = void 0;
const uuid_1 = require("uuid");
const parentsService_1 = require("./parentsService");
const errorTypes_1 = require("../types/errorTypes");
const parentService = new parentsService_1.ParentsService();
class StudentsService {
    students;
    parentService;
    constructor(students) {
        this.students = students;
        this.parentService = parentService;
    }
    /**
     * Create student
     * @param params
     */
    async registerStudentService(params) {
        try {
            const parent = await this.parentService.registerParentService(params.parents, params.address);
            const isStudentExists = await this.checkDupicateStudentIdExists(params);
            if (isStudentExists) {
                throw new errorTypes_1.CustomError(`Student with schoolId ${params.schoolId} already exists!`, 400);
            }
            const id = (0, uuid_1.v4)();
            return this.students.create({
                id: id,
                instituteId: params.instituteId,
                firstName: params.firstName,
                lastName: params.lastName,
                standard: params.standard,
                parentId: parent.id,
                gender: params.gender,
                schoolId: params.schoolId,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async checkDupicateStudentIdExists(params) {
        try {
            const studentData = await this.students.findOne({
                schoolId: params.schoolId,
            });
            return studentData ? true : false;
        }
        catch (error) {
            throw new errorTypes_1.CustomError("Error while searching duplicate studentId", 500);
        }
    }
    async fetchStudentByParentId(parentId) {
        try {
            const studentDetails = await this.students.find({ parentId: parentId });
            return studentDetails;
        }
        catch (error) {
            throw new errorTypes_1.CustomError("Error while fetching student!", 500);
        }
    }
}
exports.StudentsService = StudentsService;
