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
exports.GetAllVehicles = exports.GetFeaturedVehicles = exports.GetVehicleDetail = exports.SearchVehicle = exports.PostVehicle = void 0;
const listValidation_1 = require("../validation/listValidation");
const vehiclepost_services_1 = require("../services/vehiclepost.services");
const error_1 = __importDefault(require("../utils/error"));
const errorType_1 = __importDefault(require("../utils/errorType"));
const PostVehicle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new error_1.default(500, "No files recieved"));
        }
        console.log(req.files);
        const userId = res.locals.id;
        req.body.vehicleFeatures = JSON.parse(req.body.vehicleFeatures);
        req.body.vehicleImage = "";
        const vehicleData = listValidation_1.VehicleSchema.parse(req.body);
        const uploadFile = Array.isArray(req.files.file)
            ? req.files.file[0]
            : req.files.file;
        const uploadedImage = yield (0, vehiclepost_services_1.uploadImage)(uploadFile);
        if (!uploadedImage) {
            return next(new error_1.default(500, "Error uploading image"));
        }
        if (uploadedImage) {
            // req.body.vehicleImage = uploadedImage;
            vehicleData.vehicleImage = uploadedImage;
        }
        const vehiclePost = yield (0, vehiclepost_services_1.createPost)(vehicleData, userId);
        if (vehiclePost) {
            res.status(201).json({
                msg: "Successfully created vehicle post",
                vehiclePost,
            });
        }
    }
    catch (error) {
        const errors = (0, errorType_1.default)(error);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.PostVehicle = PostVehicle;
const SearchVehicle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = req.query.name;
        // const currentPage = Number(req.query.page) || 1;
        const vehicleType = req.query.type;
        const vehicleData = yield (0, vehiclepost_services_1.searchVehicles)(searchQuery);
        res.status(200).json({
            vehicleData,
        });
    }
    catch (error) {
        const errors = (0, errorType_1.default)(error);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.SearchVehicle = SearchVehicle;
const GetVehicleDetail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicleId = req.params.id;
        console.log(vehicleId);
        const vehicleData = yield (0, vehiclepost_services_1.getVehicleDetail)(vehicleId);
        res.status(200).json({
            vehicleData,
        });
    }
    catch (error) {
        const errors = (0, errorType_1.default)(error);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.GetVehicleDetail = GetVehicleDetail;
const GetFeaturedVehicles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const featuredVehicles = yield (0, vehiclepost_services_1.getFeaturedVehicles)();
        res.status(200).json({
            featuredVehicles,
        });
    }
    catch (error) {
        const errors = (0, errorType_1.default)(error);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.GetFeaturedVehicles = GetFeaturedVehicles;
const GetAllVehicles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentPage = Number(req.query.page) || 1;
        // const localId = res.locals.id;
        const featuredVehicles = yield (0, vehiclepost_services_1.getAllVehicles)(
        // userType,
        currentPage);
        res.status(200).json({
            featuredVehicles,
        });
    }
    catch (error) {
        const errors = (0, errorType_1.default)(error);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.GetAllVehicles = GetAllVehicles;
