import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorType";
import AppError from "../utils/error";
import { checkUserType } from "../services/auth.services";
import {
  checkAlreadyBooked,
  checkOwner,
  createBooking,
} from "../services/booking.services";

export const BookVehicle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    const { checkIn, checkOut, total_price, vehicle_post_id } = data;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const user = res.locals.id;
    const userType = await checkUserType(user);

    const isOwner = await checkOwner(userType, vehicle_post_id);

    if (isOwner) {
      return next(new AppError(409, "You cannot book your own vehicle"));
    }

    const checkBooking = await checkAlreadyBooked(
      vehicle_post_id,
      checkInDate,
      checkOutDate
    );

    console.log(checkBooking);

    if (checkBooking.status === true) {
      return next(
        new AppError(409, "This vehicle is already booked for these dates")
      );
    }

    const booking = await createBooking({
      vehicle_post_id: vehicle_post_id,
      start_date: checkInDate,
      end_date: checkOutDate,
      total_price: total_price,
      user: userType,
    });

    if (booking) {
      console.log(booking);
      res.status(200).json({
        message: "Booking Successful",
        booking_id: booking.booking_id,
      });
    }
  } catch (err: any) {
    const errors = ErrorHandler(err);
    next(new AppError(errors.statusCode, errors.message));
  }
};
