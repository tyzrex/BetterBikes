import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { TokenExpiredError } from "jsonwebtoken";
import { z, ZodError } from "zod";

const ErrorHandler = (err: any) => {
  let statusCode = 500;
  let message = "Something went wrong";

  // Handle Prisma Known Request Errors
  if (err instanceof PrismaClientKnownRequestError) {
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
  if (err instanceof ZodError) {
    const formatZodErrors = (error: z.ZodError): string => {
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
  if (err instanceof TokenExpiredError) {
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

export default ErrorHandler;
