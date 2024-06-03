// src/middlewares/errorMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { HttpError } from "../types/errorTypes";

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("middleware err-->", err.message, " error==>", err.status);

  const statusCode = err.status || 500;
  const body = err.message || "Something went wrong";

  return res.status(statusCode).json({
    statusCode,
    body
  });
};
