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
exports.getAllVehicles = exports.searchVehicles = exports.getFeaturedVehicles = exports.getVehicleDetail = exports.createPost = exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = require("../config/prisma");
dotenv_1.default.config();
// Configuration
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_URL,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImage = (uploadFile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicId = `vehicle/${uploadFile.name.split(".")[0]}-${Date.now()}`;
        const result = yield cloudinary_1.v2.uploader.upload(uploadFile.tempFilePath, {
            public_id: publicId,
            resource_type: "auto",
            folder: "uploaded",
            use_filename: true,
            unique_filename: true,
            overwrite: false,
        });
        if (result.url) {
            return result.url;
        }
    }
    catch (error) {
        throw Error;
    }
});
exports.uploadImage = uploadImage;
const createPost = (vehiclePost, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newVehiclePost = yield prisma_1.prisma.vehiclePost.create({
            data: {
                vehicle_name: vehiclePost.vehicleName,
                vehicle_type: vehiclePost.vehicleType,
                vehicle_image: vehiclePost.vehicleImage ? vehiclePost.vehicleImage : "",
                vehicle_features: vehiclePost.vehicleFeatures,
                vehicle_number: vehiclePost.vehicleNumber,
                vehicle_model: vehiclePost.vehicleManufactureDate,
                vehicle_brand: vehiclePost.vehicleBrand,
                vehicle_color: vehiclePost.vehicleColor,
                vehicle_price: parseInt(vehiclePost.vehiclePrice),
                vehicle_description: vehiclePost.vehicleDescription,
                user_id: userId
            },
        });
        return newVehiclePost;
    }
    catch (error) {
        throw error;
    }
});
exports.createPost = createPost;
const getVehicleDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicleDetail = yield prisma_1.prisma.vehiclePost.findUnique({
            where: {
                vehicle_post_id: id
            }
        });
        if (!vehicleDetail) {
            throw new Error("Vehicle not found");
        }
        else {
            return vehicleDetail;
        }
    }
    catch (err) {
        throw err;
    }
});
exports.getVehicleDetail = getVehicleDetail;
const getFeaturedVehicles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const featuredVehicles = yield prisma_1.prisma.vehiclePost.findMany({
            take: 5,
            select: {
                vehicle_name: true,
                vehicle_image: true,
                vehicle_post_id: true,
                vehicle_price: true
            }
        });
        return featuredVehicles;
    }
    catch (err) {
        throw err;
    }
});
exports.getFeaturedVehicles = getFeaturedVehicles;
const searchVehicles = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield prisma_1.prisma.vehiclePost.findMany({
            where: {
                OR: [
                    { vehicle_name: { contains: name, mode: 'insensitive' } },
                    { vehicle_brand: { contains: name, mode: 'insensitive' } },
                ],
            },
        });
        return vehicles;
    }
    catch (err) {
        throw err;
    }
});
exports.searchVehicles = searchVehicles;
const MAX_VEHICLE_POSTS = 10;
const getAllVehicles = (currentPage) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield prisma_1.prisma.vehiclePost.count();
        const pages = Math.ceil(count / MAX_VEHICLE_POSTS);
        const previousPage = currentPage > 1 ? `/?page=${currentPage - 1}` : null;
        const nextPage = currentPage < pages ? `/?page=${currentPage + 1}` : null;
        //get all vehicles except the ones that are the user's own
        const vehicles = yield prisma_1.prisma.vehiclePost.findMany({
            take: MAX_VEHICLE_POSTS,
            skip: (currentPage - 1) * MAX_VEHICLE_POSTS,
            select: {
                vehicle_name: true,
                vehicle_image: true,
                vehicle_post_id: true,
                vehicle_price: true
            }
        });
        return {
            vehicles,
            pages,
            nextPage,
            previousPage
        };
    }
    catch (err) {
        throw err;
    }
});
exports.getAllVehicles = getAllVehicles;
