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
exports.getMyBookingRequests = exports.getDashboardData = void 0;
const prisma_1 = require("../config/prisma");
const MAX_VEHICLE_POSTS = 4;
const MAX_BOOKING_POSTS = 6;
const getDashboardData = (userId, currentPage) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        if (!userId) {
            throw new Error("User not found");
        }
        const count = yield prisma_1.prisma.vehiclePost.count({
            where: {
                user_id: userId
            }
        });
        const pages = Math.ceil(count / MAX_VEHICLE_POSTS);
        const previousPage = currentPage > 1 ? `/?page=${currentPage - 1}` : null;
        const nextPage = currentPage < pages ? `/?page=${currentPage + 1}` : null;
        const vehiclePosts = yield prisma_1.prisma.vehiclePost.findMany({
            take: MAX_VEHICLE_POSTS,
            skip: (currentPage - 1) * MAX_VEHICLE_POSTS,
            where: {
                user_id: userId
            },
        });
        const bookingRequests = yield prisma_1.prisma.booking.count({
            where: {
                vehicle_post: {
                    user_id: userId
                },
            }
        });
        const vehicleDataCount = (type) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma_1.prisma.vehiclePost.count({
                where: {
                    user_id: userId,
                    vehicle_type: type
                }
            });
        });
        const bikeVehicleData = yield vehicleDataCount("Bike");
        const scooterVehicleData = yield vehicleDataCount("Scooter");
        //data for booking by type pending, accepted, rejected
        const bookingStatusData = (status) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma_1.prisma.booking.count({
                where: {
                    vehicle_post: {
                        user_id: userId
                    },
                    status: status
                }
            });
        });
        const pendingBookingData = yield bookingStatusData("pending");
        const acceptedBookingData = yield bookingStatusData("accepted");
        const rejectedBookingData = yield bookingStatusData("rejected");
        const earnings = yield prisma_1.prisma.booking.aggregate({
            where: {
                vehicle_post: {
                    user_id: userId
                },
                status: "accepted"
            },
            _sum: {
                total_price: true
            }
        });
        const earningData = (status) => __awaiter(void 0, void 0, void 0, function* () {
            return prisma_1.prisma.booking.aggregate({
                where: {
                    vehicle_post: {
                        user_id: userId
                    },
                    status: status
                },
                _sum: {
                    total_price: true
                }
            });
        });
        const pendingEarnings = yield earningData("pending");
        const acceptedEarnings = yield earningData("accepted");
        return {
            vehiclesCount: count,
            bookingCount: bookingRequests,
            earnings: ((_a = earnings._sum) === null || _a === void 0 ? void 0 : _a.total_price) ? (_b = earnings._sum) === null || _b === void 0 ? void 0 : _b.total_price : 0,
            pages,
            previousPage,
            nextPage,
            vehiclePosts,
            vehicleData: {
                bike: bikeVehicleData,
                scooter: scooterVehicleData
            },
            bookingData: {
                pending: pendingBookingData,
                accepted: acceptedBookingData,
                rejected: rejectedBookingData
            },
            earningsData: {
                pending: ((_c = pendingEarnings._sum) === null || _c === void 0 ? void 0 : _c.total_price) ? (_d = pendingEarnings._sum) === null || _d === void 0 ? void 0 : _d.total_price : 0,
                accepted: ((_e = acceptedEarnings._sum) === null || _e === void 0 ? void 0 : _e.total_price) ? (_f = acceptedEarnings._sum) === null || _f === void 0 ? void 0 : _f.total_price : 0,
            }
        };
    }
    catch (err) {
        console.log(err);
        throw err;
    }
});
exports.getDashboardData = getDashboardData;
const getMyBookingRequests = (userId, currentPage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //from the user id get the vehicle posts which have booking requests
        const count = yield prisma_1.prisma.booking.count({
            where: {
                vehicle_post: {
                    user_id: userId
                },
                // status: "pending"
            }
        });
        const pages = Math.ceil(count / MAX_BOOKING_POSTS);
        const previousPage = currentPage > 1 ? `/?page=${currentPage - 1}` : null;
        const nextPage = currentPage < pages ? `/?page=${currentPage + 1}` : null;
        const bookingRequests = yield prisma_1.prisma.booking.findMany({
            take: MAX_BOOKING_POSTS,
            skip: (currentPage - 1) * MAX_BOOKING_POSTS,
            where: {
                vehicle_post: {
                    user_id: userId
                },
            },
            select: {
                booking_id: true,
                start_date: true,
                end_date: true,
                vehicle_post_id: true,
                status: true,
                vehicle_post: {
                    select: {
                        vehicle_name: true,
                        vehicle_image: true,
                        vehicle_price: true,
                        vehicle_type: true,
                        created_at: true,
                        vehicle_brand: true,
                        vehicle_number: true,
                    }
                }
            }
        });
        return {
            bookingRequests,
            pages,
            previousPage,
            nextPage
        };
    }
    catch (err) {
        throw err;
    }
});
exports.getMyBookingRequests = getMyBookingRequests;
