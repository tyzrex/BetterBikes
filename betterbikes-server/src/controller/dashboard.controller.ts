import { NextFunction, Request, Response } from "express";
import AppError from "../utils/error";
import ErrorHandler from "../utils/errorType";
import { checkUserType } from "../services/auth.services";
import { getDashboardData } from "../services/dashboard.services";

export const DashboardData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const localId = res.locals.id;
    console.log(localId);
    const currentPage = Number(req.query.page) || 1;
  
    const userType = await checkUserType(localId);
    const dashboardData = await getDashboardData(userType, currentPage);
    res.status(200).json({
      dashboardData,
    });
  } catch (err: any) {
    const errors = ErrorHandler(err);

    next(new AppError(errors.statusCode, errors.message));
  }
};

export const DashboardBookingData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const localId = res.locals.id;
    const currentPage = Number(req.query.page) || 1;
    const userType = await checkUserType(localId);
    const dashboardData = await getDashboardData(userType, currentPage);
    res.status(200).json({
      dashboardData,
    });
  } catch (err: any) {
    const errors = ErrorHandler(err);

    next(new AppError(errors.statusCode, errors.message));
  }
}