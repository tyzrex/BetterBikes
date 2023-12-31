import dotenv from 'dotenv';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import jwt from 'jsonwebtoken';

import AppError from '../utils/error';
import ErrorHandler from '../utils/errorType';

dotenv.config();

interface IAccessToken {
  id: string;
  iat: number;
  exp: number;
}


export const validateToken = async (req: Request, res:Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    // console.log(req.headers.authorization)
    if (!token) {
      return res.status(401).json({ message: 'You are not authorized' });
    }

    const decodedToken = jwt.verify(token, 
      process.env.JWT_SECRET as string) as IAccessToken;
    // req.body.id = decodedToken.id;
    res.locals.id = decodedToken.id;
    // console.log(decodedToken)
    next();
  } catch (err: any) {
    console.log(err)
    const errors = ErrorHandler(err);
    next(new AppError(errors.statusCode, errors.message))
  }
}