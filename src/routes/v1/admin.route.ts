import { NextFunction, Request, Response, Router } from "express";
import { StudentsController } from "../../controller/studentController"; // Adjust the path as needed
import { students } from "../../model";
import { LoginController } from "../../controller/loginController";
import { ClassController } from "../../controller/classController";
import {StaffController} from "../../controller/staffController";

const studentsController = new StudentsController(students);
const classController = new ClassController();
const staffController = new StaffController();

const router = Router();



router.post(
  "/assignClass",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await studentsController.registerStudent(req, res, next);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);







export default router;
