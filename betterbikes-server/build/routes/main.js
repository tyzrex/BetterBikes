"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_route_1 = require("./auth.route");
const dashboard_route_1 = require("./dashboard.route");
const vehiclepost_route_1 = require("./vehiclepost.route");
const booking_route_1 = require("./booking.route");
const messenger_route_1 = __importDefault(require("./messenger.route"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.authRoutes);
router.use("/dashboard", dashboard_route_1.DashboardRoutes);
router.use("/vehiclepost", vehiclepost_route_1.vehiclePostRoutes);
router.use("/booking", booking_route_1.BookingRoutes);
router.use("/messenger", messenger_route_1.default);
exports.default = router;
