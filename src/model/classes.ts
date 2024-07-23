import mongoose from "mongoose";

export type ClassesDocument = mongoose.Document & {
 id: string;
 instituteId:string,
 standard:string;
 section:string;
};

const classesSchema = new mongoose.Schema({
  id: { type: String, index: true, unique: true },
  instituteId: String,
  standard: String,
  section: String,
  createdAt: { type: Date, default: Date.now },
});

export const classes =
  mongoose.models.students ||
  mongoose.model<ClassesDocument>("classes", classesSchema, "classes");
