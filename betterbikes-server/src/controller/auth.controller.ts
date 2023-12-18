import dotenv from 'dotenv';
import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { OAuth2Client } from 'google-auth-library';

import { prisma } from '../config/prisma';
import { type IGoogleLogin } from '../interfaces/auth';
import {
  checkAlreadyRegistered,
  createOauthUser,
  createUser,
  getRefreshToken,
  loginWithCredentials,
  loginWithOAuth,
} from '../services/auth.services';
import AppError from '../utils/error';
import ErrorHandler from '../utils/errorType';
import {
  loginSchema,
  registerSchema,
} from '../validation/authValidation';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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

    if(user){
      const createProfile = await prisma.profile.create({
        data:{
          id: user.id,
          name: user.name,
          oauth_user_id: null,
          user_id: user.id,
          email: user.email,
        }
      })
    }

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
      credentials.password,
      next
    );
    if (user) {
      res.status(200).json({
        user: user,
        message: "Successfully Logged In",
      });
    }
  } catch (err) {
    console.log(err)
    const errors = ErrorHandler(err)
    next(new AppError(errors.statusCode, errors.message ));
  }
};

export const GoogleLoginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials = req.body;
    console.log(req.body)
    const ticket = await client.verifyIdToken({
      idToken: credentials.token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const registeredUser = await checkAlreadyRegistered(payload?.email as string);


    if (registeredUser?.status === false) {

    const createCredentials = {
      email: payload?.email,
      name: payload?.name,
      profileImage: payload?.picture,
      oAuthId: payload?.sub,
      oAuthProvider: "google",
    };

      const user = await createOauthUser(
        createCredentials as IGoogleLogin
      );
      if(user){
        const profile = await prisma.profile.create({
          data:{
            id: user.id,
            name: user.name,
            oauth_user_id: user.id,
            user_id: null,
            email: user.email,
          }
        })
      }
      if (user) {
        return res.status(200).json({
          user: user,
          message: "Successfully Logged In",
        });
      }
    } else {
      if (registeredUser?.user?.email === payload?.email) {
        return res.status(401).json({
          message:
            "This account was linked using credentials. Please sign in with your email and password",
        });
      } else {
        const user = await loginWithOAuth(registeredUser);
        console.log(user)
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
    const newRefreshToken = await getRefreshToken(token);
    const accessExpireTime = new Date(
    Date.now() + 24 * 60 * 60 * 1000
    );

    const refreshExpireTime = new Date(
     Date.now() + 24 * 7 * 60 * 60 * 1000
    );

    res.status(200).json({
      newAccessToken: newAccessToken,
      accessExpireTime: accessExpireTime,
      refreshExpireTime: refreshExpireTime,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
