"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.students = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const studentsSchema = new mongoose_1.default.Schema({
    id: { type: String, index: true, unique: true },
    instituteId: String,
    firstName: String,
    lastName: String,
    standard: String,
    parentId: String,
    gender: String,
    schoolId: String,
    createdAt: { type: Date, default: Date.now },
});
exports.students = mongoose_1.default.models.students ||
    mongoose_1.default.model("students", studentsSchema, "students");
