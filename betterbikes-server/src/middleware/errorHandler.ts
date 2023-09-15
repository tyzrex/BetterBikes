// import { ZodError } from "zod";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import  AppError from "../utils/error";
import { NextFunction, Request, Response } from "express";

export const errorMiddleware =((error: AppError, req: Request, res: Response, next: NextFunction) => {
  res.status(error?.statusCode || 500).json({
    status: error?.status || "error",
    message: error?.message || "Internal Server Error",
  });
});