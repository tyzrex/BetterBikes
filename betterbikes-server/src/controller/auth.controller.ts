import { NextFunction, Request, Response } from "express";
import {
  checkAlreadyRegistered,
  createOauthUser,
  createUser,
  getRefreshToken,
  loginWithCredentials,
  loginWithOAuth,
} from "../services/auth.services";
import dotenv from "dotenv";
import { loginSchema, registerSchema } from "../validation/authValidation";
import { type IGoogleLogin } from "@app/interfaces/auth";
import AppError from "../utils/error";
import ErrorHandler from "../utils/errorType";

dotenv.config();

export const RegisterUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = registerSchema.parse(req.body);

    const checkRegistration = await checkAlreadyRegistered(userData.email);

    if (checkRegistration?.status === true) {
      return next(new AppError(409, "User already Exists please login"))
    }

    const user = await createUser(userData);

    if (user) {
      res.status(200).json({
        message: "Successfully Registered, Proceed to Login",
      });
    }
  } catch (err: any) {
    const errors = ErrorHandler(err)
    next(new AppError(errors.statusCode, errors.message))
  }
};

export const CredentialLoginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const credentials = loginSchema.parse(req.body);
    const registeredUser = await checkAlreadyRegistered(credentials.email);
    if (registeredUser?.status === false) {
      return next(new AppError(401, "This email is not registered"));
    }

    const isOAuthUser = registeredUser?.oAuthUser;

    if (isOAuthUser) {
      return next(new AppError(409, "This account was linked using OAuth. Please sign in with Oauth"))
    }

    const user = await loginWithCredentials(
      registeredUser,
      credentials.password
    );
    if (user) {
      res.status(200).json({
        user: user,
        message: "Successfully Logged In",
      });
    }
  } catch (err) {
    const errors = ErrorHandler(err)
    next(new AppError(errors.statusCode, errors.message ));
  }
};

export const GoogleLoginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials = req.body as IGoogleLogin;
    const registeredUser = await checkAlreadyRegistered(credentials.email);

    if (registeredUser?.status === false) {
      const user = await createOauthUser(credentials);
      if (user) {
        return res.status(200).json({
          user: user,
          message: "Successfully Logged In",
        });
      }
    } else {
      if (registeredUser?.user?.email === credentials.email) {
        return res.status(401).json({
          message:
            "This account was linked using credentials. Please sign in with your email and password",
        });
      } else {
        const user = await loginWithOAuth(registeredUser);
        if (user) {
          return res.status(200).json({
            user: user,
            message: "Successfully Logged In",
          });
        }
      }
    }
  } catch (err) {
    const errors = ErrorHandler(err)
    next(new AppError(errors.statusCode, errors.message ));
  }
};

export const RefreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newAccessToken = await getRefreshToken(token);

    res.status(200).json({
      newAccessToken: newAccessToken,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
