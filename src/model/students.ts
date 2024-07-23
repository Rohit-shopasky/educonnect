import mongoose from "mongoose";

export type StudentsDocument = mongoose.Document & {
  id: string;
  instituteId: string;
  firstName: string;
  lastName: string;
  standard: string;
  parentId: string;
  gender: string;
  schoolId: string;
  createdAt: Date;
};

const studentsSchema = new mongoose.Schema({
  id: { type: String, index: true, unique: true },
  instituteId: String,
  firstName: String,
  lastName: String,
  standard: String,
  section:String,
  parentId: String,
  gender: String,
  schoolId: String,
  createdAt: { type: Date, default: Date.now },
});

export const students =
  mongoose.models.students ||
  mongoose.model<StudentsDocument>("students", studentsSchema, "students");
