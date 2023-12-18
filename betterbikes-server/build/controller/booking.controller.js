"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcceptBookingRequest = exports.BookVehicle = void 0;
const errorType_1 = __importDefault(require("../utils/errorType"));
const error_1 = __importDefault(require("../utils/error"));
const booking_services_1 = require("../services/booking.services");
const prisma_1 = require("../config/prisma");
const socket_1 = require("../socket");
const BookVehicle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const { checkIn, checkOut, total_price, vehicle_post_id } = data;
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const user = res.locals.id;
        if (checkInDate.getTime() > checkOutDate.getTime()) {
            return next(new error_1.default(409, "Check In date cannot be greater than Check Out date"));
        }
        const isOwner = yield (0, booking_services_1.checkOwner)(user, vehicle_post_id);
        const getOwnerId = yield prisma_1.prisma.vehiclePost.findFirst({
            where: {
                vehicle_post_id: vehicle_post_id,
            },
            select: {
                user_id: true,
            },
        });
        if (isOwner) {
            return next(new error_1.default(409, "You cannot book your own vehicle"));
        }
        const checkBooking = yield (0, booking_services_1.checkAlreadyBooked)(vehicle_post_id, checkInDate, checkOutDate);
        console.log(checkBooking);
        if (checkBooking.status === true) {
            return next(new error_1.default(409, "This vehicle is already booked for these dates"));
        }
        const booking = yield (0, booking_services_1.createBooking)({
            vehicle_post_id: vehicle_post_id,
            start_date: checkInDate,
            end_date: checkOutDate,
            total_price: total_price,
            user: user
        });
        if (booking) {
            console.log(booking);
            const owner = getOwnerId === null || getOwnerId === void 0 ? void 0 : getOwnerId.user_id;
            console.log(owner);
            (0, socket_1.emitSocketEvent)(req, owner, "booking", {
                booking_id: booking.booking_id,
                vehicle_post_id: booking.vehicle_post_id,
                start_date: booking.start_date,
                end_date: booking.end_date,
            });
            res.status(200).json({
                message: "Booking Successful",
                booking_id: booking.booking_id,
            });
        }
    }
    catch (err) {
        const errors = (0, errorType_1.default)(err);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.BookVehicle = BookVehicle;
const AcceptBookingRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingId = req.params.id;
        console.log(bookingId);
        const booking = yield prisma_1.prisma.booking.update({
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
    }
    catch (err) {
        const errors = (0, errorType_1.default)(err);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.AcceptBookingRequest = AcceptBookingRequest;
