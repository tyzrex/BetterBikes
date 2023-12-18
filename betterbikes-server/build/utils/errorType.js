"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("@prisma/client/runtime/library");
const jsonwebtoken_1 = require("jsonwebtoken");
const zod_1 = require("zod");
const ErrorHandler = (err) => {
    let statusCode = 500;
    let message = "Something went wrong";
    // Handle Prisma Known Request Errors
    if (err instanceof library_1.PrismaClientKnownRequestError) {
        switch (err.code) {
            case "P2002":
                statusCode = 409;
                message = "There is a unique constraint violation. Use a different Phone Number";
                break;
            default:
                statusCode = 400;
                message = err.message;
                break;
        }
    }
    // Handle Zod Errors
    if (err instanceof zod_1.ZodError) {
        const formatZodErrors = (error) => {
            const firstError = error.errors[0];
            if (firstError) {
                return firstError.message;
            }
            return "Validation failed";
        };
        statusCode = 422;
        message = formatZodErrors(err);
    }
    // Handle Token Expired Error
    if (err instanceof jsonwebtoken_1.TokenExpiredError) {
        statusCode = 401;
        message = "Token has expired";
    }
    // Handle other errors (unhandled)
    if (!statusCode) {
        statusCode = 500;
        message = "Internal Server Error";
    }
    return {
        statusCode,
        message,
    };
};
exports.default = ErrorHandler;
