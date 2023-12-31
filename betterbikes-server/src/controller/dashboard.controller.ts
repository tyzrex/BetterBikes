import {
  NextFunction,
  Request,
  Response,
} from 'express';

import { checkUserType } from '../services/auth.services';
import {
  getDashboardData,
  getMyBookingRequests,
} from '../services/dashboard.services';
import AppError from '../utils/error';
import ErrorHandler from '../utils/errorType';

export const DashboardData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const localId = res.locals.id;
    const currentPage = Number(req.query.page) || 1;
  
    const dashboardData = await getDashboardData(localId, currentPage);
    res.status(200).json({
      dashboardData,
    });
  } catch (err: any) {
    console.log(err)
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
    const dashboardData = await getMyBookingRequests(localId, currentPage);
    res.status(200).json({
      dashboardData,
    });
  } catch (err: any) {
    const errors = ErrorHandler(err);

    next(new AppError(errors.statusCode, errors.message));
  }
}