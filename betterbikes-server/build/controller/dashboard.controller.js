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
exports.DashboardBookingData = exports.DashboardData = void 0;
const auth_services_1 = require("../services/auth.services");
const dashboard_services_1 = require("../services/dashboard.services");
const error_1 = __importDefault(require("../utils/error"));
const errorType_1 = __importDefault(require("../utils/errorType"));
const DashboardData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const localId = res.locals.id;
        const currentPage = Number(req.query.page) || 1;
        const dashboardData = yield (0, dashboard_services_1.getDashboardData)(localId, currentPage);
        res.status(200).json({
            dashboardData,
        });
    }
    catch (err) {
        console.log(err);
        const errors = (0, errorType_1.default)(err);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.DashboardData = DashboardData;
const DashboardBookingData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const localId = res.locals.id;
        const currentPage = Number(req.query.page) || 1;
        const userType = yield (0, auth_services_1.checkUserType)(localId);
        const dashboardData = yield (0, dashboard_services_1.getMyBookingRequests)(localId, currentPage);
        res.status(200).json({
            dashboardData,
        });
    }
    catch (err) {
        const errors = (0, errorType_1.default)(err);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.DashboardBookingData = DashboardBookingData;
