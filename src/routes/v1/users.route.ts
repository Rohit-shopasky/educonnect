import { NextFunction, Request, Response, Router } from "express";
import { StudentsController } from "../../controller/studentController"; // Adjust the path as needed
import { students } from "../../model";
import { LoginController } from "../../controller/loginController";
import { ClassController } from "../../controller/classController";

const studentsController = new StudentsController(students);
const loginController = new LoginController();
const classController = new ClassController();

const router = Router();

// router.get("/test", async (req: Request, res: Response) => {
//   try {
//     const result = await studentsController.createStudent(req, res);
//     res.status(200).json({ status: 200, msg: "test route" });
//   } catch (error) {
//     console.error("An error ocurred:", error);
//     res.status(500).json(error);
//   }
// });

router.post(
  "/registerStudent",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await studentsController.registerStudent(req, res, next);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await loginController.login(req);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/createClass",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await classController.createClassController(req);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

// router.put("/:id", async (req: Request, res: Response) => {
//   try {
//     res.status(200).json({});
//   } catch (error) {
//     console.error("An error occurred:", error);
//     res.status(500).json(error);
//   }
// });

// router.delete("/:id", async (req: Request, res: Response) => {
//   try {
//     res.status(200).json({});
//   } catch (error) {
//     console.error("An error occurred:", error);
//     res.status(500).json(error);
//   }
// });

export default router;
