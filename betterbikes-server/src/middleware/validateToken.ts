import { NextFunction, Request, Response } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import jwt from "jsonwebtoken";

interface IRefreshToken {
  id: string;
  iat: number;
  exp: number;
}

export const validateToken = async (req: Request, res:Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'You are not authorized' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as IRefreshToken;
    req.body.id = decodedToken.id;
    next();
  } catch (err: any) {
    if (err instanceof TokenExpiredError) {
      // Handle expired token error here
      console.error('Token has expired:', err.message);
      // You can return an error response or take other actions as needed
    return res.status(401).json({ message: 'Token as expired' });
    } else {
      // Handle other JWT verification errors
      console.error('JWT verification error:', err.message);
      res.status(401).json({message:"Failed to retrieve token"})
    }
  }
}