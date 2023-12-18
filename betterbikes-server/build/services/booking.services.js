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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOwner = exports.checkAlreadyBooked = exports.createBooking = void 0;
const prisma_1 = require("../config/prisma");
const createBooking = (props) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield prisma_1.prisma.booking.create({
            data: {
                vehicle_post_id: props.vehicle_post_id,
                start_date: props.start_date,
                end_date: props.end_date,
                total_price: props.total_price,
                user_id: props.user,
                status: "pending"
            }
        });
        return booking;
    }
    catch (err) {
        throw err;
    }
});
exports.createBooking = createBooking;
const checkAlreadyBooked = (vehicle_post_id, start_date, end_date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield prisma_1.prisma.booking.findFirst({
            //check if the vehicle is already booked in the given date range
            where: {
                vehicle_post_id: vehicle_post_id,
                start_date: {
                    lte: end_date
                },
                end_date: {
                    gte: start_date
                }
            },
            select: {
                booking_id: true
            }
        });
        return {
            status: booking ? true : false,
            booking_id: booking ? booking.booking_id : null
        };
    }
    catch (err) {
        throw err;
    }
});
exports.checkAlreadyBooked = checkAlreadyBooked;
const checkOwner = (userId, vehicle_post_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicle = yield prisma_1.prisma.vehiclePost.findFirst({
            where: {
                vehicle_post_id: vehicle_post_id,
                user_id: userId
            },
            select: {
                vehicle_post_id: true
            }
        });
        return vehicle ? true : false;
    }
    catch (err) {
        throw err;
    }
});
exports.checkOwner = checkOwner;
