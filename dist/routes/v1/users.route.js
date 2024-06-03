"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../../controller/studentController"); // Adjust the path as needed
const model_1 = require("../../model");
const loginController_1 = require("../../controller/loginController");
const studentsController = new studentController_1.StudentsController(model_1.students);
const loginController = new loginController_1.LoginController();
const router = (0, express_1.Router)();
// router.get("/test", async (req: Request, res: Response) => {
//   try {
//     const result = await studentsController.createStudent(req, res);
//     res.status(200).json({ status: 200, msg: "test route" });
//   } catch (error) {
//     console.error("An error ocurred:", error);
//     res.status(500).json(error);
//   }
// });
router.post("/registerStudent", async (req, res, next) => {
    try {
        const result = await studentsController.registerStudent(req, res, next);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
router.post("/login", async (req, res, next) => {
    try {
        const result = await loginController.login(req, res, next);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});
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
exports.default = router;
