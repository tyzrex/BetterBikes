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
exports.RefreshToken = exports.GoogleLoginUser = exports.CredentialLoginUser = exports.RegisterUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const google_auth_library_1 = require("google-auth-library");
const prisma_1 = require("../config/prisma");
const auth_services_1 = require("../services/auth.services");
const error_1 = __importDefault(require("../utils/error"));
const errorType_1 = __importDefault(require("../utils/errorType"));
const authValidation_1 = require("../validation/authValidation");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
dotenv_1.default.config();
const RegisterUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = authValidation_1.registerSchema.parse(req.body);
        const checkRegistration = yield (0, auth_services_1.checkAlreadyRegistered)(userData.email);
        if ((checkRegistration === null || checkRegistration === void 0 ? void 0 : checkRegistration.status) === true) {
            return next(new error_1.default(409, "User already Exists please login"));
        }
        const user = yield (0, auth_services_1.createUser)(userData);
        if (user) {
            const createProfile = yield prisma_1.prisma.profile.create({
                data: {
                    id: user.id,
                    name: user.name,
                    oauth_user_id: null,
                    user_id: user.id,
                    email: user.email,
                }
            });
        }
        if (user) {
            res.status(200).json({
                message: "Successfully Registered, Proceed to Login",
            });
        }
    }
    catch (err) {
        const errors = (0, errorType_1.default)(err);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.RegisterUser = RegisterUser;
const CredentialLoginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const credentials = authValidation_1.loginSchema.parse(req.body);
        const registeredUser = yield (0, auth_services_1.checkAlreadyRegistered)(credentials.email);
        if ((registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.status) === false) {
            return next(new error_1.default(401, "This email is not registered"));
        }
        const isOAuthUser = registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.oAuthUser;
        if (isOAuthUser) {
            return next(new error_1.default(409, "This account was linked using OAuth. Please sign in with Oauth"));
        }
        const user = yield (0, auth_services_1.loginWithCredentials)(registeredUser, credentials.password, next);
        if (user) {
            res.status(200).json({
                user: user,
                message: "Successfully Logged In",
            });
        }
    }
    catch (err) {
        console.log(err);
        const errors = (0, errorType_1.default)(err);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.CredentialLoginUser = CredentialLoginUser;
const GoogleLoginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const credentials = req.body;
        console.log(req.body);
        const ticket = yield client.verifyIdToken({
            idToken: credentials.token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const registeredUser = yield (0, auth_services_1.checkAlreadyRegistered)(payload === null || payload === void 0 ? void 0 : payload.email);
        if ((registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.status) === false) {
            const createCredentials = {
                email: payload === null || payload === void 0 ? void 0 : payload.email,
                name: payload === null || payload === void 0 ? void 0 : payload.name,
                profileImage: payload === null || payload === void 0 ? void 0 : payload.picture,
                oAuthId: payload === null || payload === void 0 ? void 0 : payload.sub,
                oAuthProvider: "google",
            };
            const user = yield (0, auth_services_1.createOauthUser)(createCredentials);
            if (user) {
                const profile = yield prisma_1.prisma.profile.create({
                    data: {
                        id: user.id,
                        name: user.name,
                        oauth_user_id: user.id,
                        user_id: null,
                        email: user.email,
                    }
                });
            }
            if (user) {
                return res.status(200).json({
                    user: user,
                    message: "Successfully Logged In",
                });
            }
        }
        else {
            if (((_a = registeredUser === null || registeredUser === void 0 ? void 0 : registeredUser.user) === null || _a === void 0 ? void 0 : _a.email) === (payload === null || payload === void 0 ? void 0 : payload.email)) {
                return res.status(401).json({
                    message: "This account was linked using credentials. Please sign in with your email and password",
                });
            }
            else {
                const user = yield (0, auth_services_1.loginWithOAuth)(registeredUser);
                console.log(user);
                if (user) {
                    return res.status(200).json({
                        user: user,
                        message: "Successfully Logged In",
                    });
                }
            }
        }
    }
    catch (err) {
        const errors = (0, errorType_1.default)(err);
        next(new error_1.default(errors.statusCode, errors.message));
    }
});
exports.GoogleLoginUser = GoogleLoginUser;
const RefreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const newAccessToken = yield (0, auth_services_1.getRefreshToken)(token);
        const newRefreshToken = yield (0, auth_services_1.getRefreshToken)(token);
        const accessExpireTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const refreshExpireTime = new Date(Date.now() + 24 * 7 * 60 * 60 * 1000);
        res.status(200).json({
            newAccessToken: newAccessToken,
            accessExpireTime: accessExpireTime,
            refreshExpireTime: refreshExpireTime,
            refreshToken: newRefreshToken,
        });
    }
    catch (err) {
        res.status(400).json(err);
    }
});
exports.RefreshToken = RefreshToken;
