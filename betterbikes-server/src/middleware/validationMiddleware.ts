import { Request, Response, NextFunction } from "express";
import { validationResult, Result, ValidationError } from "express-validator";

export function validationMiddleware(req: Request, res: Response, next: NextFunction) {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    next();
    return null;
}