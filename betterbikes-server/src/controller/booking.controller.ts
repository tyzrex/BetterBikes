import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/errorType";
import AppError from "../utils/error";
import { checkUserType } from "../services/auth.services";
import {
  checkAlreadyBooked,
  checkOwner,
  createBooking,
} from "../services/booking.services";
import { prisma } from "../config/prisma";
import { emitSocketEvent } from "../socket";

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

    if (checkInDate.getTime() > checkOutDate.getTime()) {
      return next(
        new AppError(409, "Check In date cannot be greater than Check Out date")
      );
    }

    const isOwner = await checkOwner(user, vehicle_post_id);
    const getOwnerId = await prisma.vehiclePost.findFirst({
      where: {
        vehicle_post_id: vehicle_post_id,
      },
      select: {
          user_id: true,
      },
    });


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
      user: user
    });

    if (booking) {
      console.log(booking);
      const owner = getOwnerId?.user_id as string;
      console.log(owner);
      emitSocketEvent(req, owner, "booking", {
        booking_id: booking.booking_id,
        vehicle_post_id: booking.vehicle_post_id,
        start_date: booking.start_date,
        end_date: booking.end_date,
      }
      );
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

export const AcceptBookingRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingId = req.params.id;
    console.log(bookingId);
    const booking = await prisma.booking.update({
      where: {
        booking_id: bookingId,
      },
      data: {
        status: "accepted",
      },
    });
    // emitSocketEvent(req, booking.auth_user_id, "booking", {
    //   booking_id: booking.booking_id,
    //   vehicle_post_id: booking.vehicle_post_id,
    //   start_date: booking.start_date,
    //   end_date: booking.end_date,
    //   status: booking.status,
    // });
    res.status(200).json({
      message: "Booking request accepted",
    });
  } catch (err: any) {
    const errors = ErrorHandler(err);
    next(new AppError(errors.statusCode, errors.message));
  }
}