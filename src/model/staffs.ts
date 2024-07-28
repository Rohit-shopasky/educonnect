import mongoose from "mongoose";
import { gender, staffType } from "./constants";

export type StaffsDocument = mongoose.Document & {
   id:string,
   mob:string
   schoolId:string
  instituteId:string,
  staffType:staffType,
  firstName:string,
  lastName:string,
  age:number,
  gender:gender
  classes:string[],
  address:string,
  qualifications:string,
  createdAt:string,
};

const staffsSchema = new mongoose.Schema({
  id: { type: String, index: true, unique: true },
  mob:String,
  schoolId:String,
  instituteId: String,
  firstName: String,
  lastName: String,
  age:Number,
  gender:String,
  classes:[{type:String}],
  address:String,
   qualifications:String,
  createdAt: { type: Date, default: Date.now },
});

export const staffs =
  mongoose.models.staffs ||
  mongoose.model<StaffsDocument>("staffs", staffsSchema, "staffs");
