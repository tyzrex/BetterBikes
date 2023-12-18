"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.checkUserType = exports.getRefreshToken = exports.loginWithOAuth = exports.loginWithCredentials = exports.createOauthUser = exports.createUser = exports.checkAlreadyRegistered = void 0;
const prisma_1 = require("../config/prisma");
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const generateToken_1 = require("../utils/generateToken");
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = __importDefault(require("../utils/error"));
const accessExpireTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
const refreshExpireTime = new Date(Date.now() + 24 * 7 * 60 * 60 * 1000);
const checkAlreadyRegistered = (email, phone) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                email: email,
                phone: phone
            },
        });
        if (user) {
            return {
                user,
                oAuthUser: null,
                status: true,
            };
        }
        const oAuthUser = yield prisma_1.prisma.oAuthUser.findUnique({
            where: {
                email: email,
            },
        });
        if (oAuthUser) {
            return {
                user: null,
                oAuthUser,
                status: true,
            };
        }
        return {
            user: null,
            oAuthUser: null,
            status: false,
        };
    }
    catch (err) {
        throw err;
    }
});
exports.checkAlreadyRegistered = checkAlreadyRegistered;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, fullName, phone, address } = userData;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield prisma_1.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: fullName,
                phone,
                address,
            },
        });
        return user;
    }
    catch (err) {
        throw err;
    }
});
exports.createUser = createUser;
const createOauthUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, profileImage, oAuthId, oAuthProvider } = userData;
        const oAuthUser = yield prisma_1.prisma.oAuthUser.create({
            data: {
                email: email,
                name: name,
                profile_image: profileImage,
                oAuth_provider: oAuthProvider,
                oAuth_id: oAuthId,
            },
        });
        const token = (0, generateToken_1.generateToken)(oAuthUser.id);
        const refreshToken = (0, generateToken_1.generateRefreshToken)(oAuthUser.id);
        const user = {
            id: oAuthUser.id,
            name: oAuthUser.name,
            email: oAuthUser.email,
            access_token: token,
            refreshToken: refreshToken,
            accessExpireTime: accessExpireTime,
            refreshExpireTime: refreshExpireTime,
        };
        return user;
    }
    catch (err) {
        throw err;
    }
});
exports.createOauthUser = createOauthUser;
const loginWithCredentials = (registeredUser, password, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    try {
        const isPasswordValid = yield bcrypt_1.default.compare(password, (_a = registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.user) === null || _a === void 0 ? void 0 : _a.password);
        if (!isPasswordValid) {
            return next(new error_1.default(401, "Invalid Credentials"));
        }
        const token = (0, generateToken_1.generateToken)((_b = registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.user) === null || _b === void 0 ? void 0 : _b.id);
        const refreshToken = (0, generateToken_1.generateRefreshToken)((_c = registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.user) === null || _c === void 0 ? void 0 : _c.id);
        const user = {
            id: (_d = registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.user) === null || _d === void 0 ? void 0 : _d.id,
            name: (_e = registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.user) === null || _e === void 0 ? void 0 : _e.name,
            email: (_f = registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.user) === null || _f === void 0 ? void 0 : _f.email,
            access_token: token,
            refreshToken: refreshToken,
            accessExpireTime: accessExpireTime,
            refreshExpireTime: refreshExpireTime,
        };
        return user;
    }
    catch (err) {
        throw err;
    }
});
exports.loginWithCredentials = loginWithCredentials;
const loginWithOAuth = (registeredUser) => __awaiter(void 0, void 0, void 0, function* () {
    var _g, _h, _j, _k, _l;
    try {
        const token = (0, generateToken_1.generateToken)((_g = registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.oAuthUser) === null || _g === void 0 ? void 0 : _g.id);
        const refreshToken = (0, generateToken_1.generateRefreshToken)((_h = registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.oAuthUser) === null || _h === void 0 ? void 0 : _h.id);
        const user = {
            id: (_j = registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.oAuthUser) === null || _j === void 0 ? void 0 : _j.id,
            name: (_k = registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.oAuthUser) === null || _k === void 0 ? void 0 : _k.name,
            email: (_l = registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.oAuthUser) === null || _l === void 0 ? void 0 : _l.email,
            access_token: token,
            refreshToken: refreshToken,
            accessExpireTime: accessExpireTime,
            refreshExpireTime: refreshExpireTime,
        };
        return user;
    }
    catch (err) {
        throw err;
    }
});
exports.loginWithOAuth = loginWithOAuth;
const getRefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const newAccessToken = (0, generateToken_1.generateToken)(decodedToken.id);
        console.log("refreshed token");
        return newAccessToken;
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.TokenExpiredError) {
            // Handle expired token error here
            console.error('Token has expired:', err.message);
            // You can return an error response or take other actions as needed
            throw new Error('Token has expired');
        }
        else {
            // Handle other JWT verification errors
            console.error('JWT verification error:', err.message);
            throw new Error('Failed to get token');
        }
    }
});
exports.getRefreshToken = getRefreshToken;
const checkUserType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (user) {
            return {
                user,
                oAuthUser: null,
                status: true,
            };
        }
        const oAuthUser = yield prisma_1.prisma.oAuthUser.findUnique({
            where: {
                id: id,
            },
        });
        if (oAuthUser) {
            return {
                user: null,
                oAuthUser,
                status: true,
            };
        }
        return {
            user: null,
            oAuthUser: null,
            status: false,
        };
    }
    catch (err) {
        throw err;
    }
});
exports.checkUserType = checkUserType;
