"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
exports.errorMiddleware = ((error, req, res, next) => {
    res.status((error === null || error === void 0 ? void 0 : error.statusCode) || 500).json({
        status: (error === null || error === void 0 ? void 0 : error.status) || "error",
        message: (error === null || error === void 0 ? void 0 : error.message) || "Internal Server Error",
    });
});
