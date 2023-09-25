import {prisma} from "../config/prisma"
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { generateRefreshToken, generateToken } from "../utils/generateToken";
import { IGoogleLogin, IRegister } from "../interfaces/auth";
import { IRegisteredResponse, IRegisteredUser } from "../interfaces/user";
import bcrypt from "bcrypt";
import { NextFunction } from "express";
import AppError from "../utils/error";

const accessExpireTime = new Date(
  Date.now() + 24 * 60 * 60 * 1000
);

const refreshExpireTime = new Date(
  Date.now() + 24 * 7 * 60 * 60 * 1000
);

export const checkAlreadyRegistered= async (email: string, phone?: string): Promise<IRegisteredResponse>=> {
 try {
    const user = await prisma.user.findUnique({
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

    const oAuthUser = await prisma.oAuthUser.findUnique({
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
    catch(err:any){
        throw err
    }
}

interface IRefreshToken {
  id: string;
  iat: number;
  exp: number;
}


export const createUser = async (userData: IRegister) => {
  try {
    const { email, password, fullName, phone, address } = userData;
        const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   const user = await prisma.user.create({
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
  catch(err:any){
throw err
  }
}

export const createOauthUser = async (userData: IGoogleLogin) => {
  try {

    const { email, name, profileImage, oAuthId, oAuthProvider} = userData;
    const oAuthUser = await prisma.oAuthUser.create({
        data: {
          email: email,
          name: name,
          profile_image: profileImage,
          oAuth_provider: oAuthProvider,
          oAuth_id: oAuthId,
        },
      });
    const token = generateToken(oAuthUser.id);
    const refreshToken = generateRefreshToken(oAuthUser.id);

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
  catch(err:any){
throw err
  }
}

export const loginWithCredentials = async (registeredUser: IRegisteredResponse, password: string, next: NextFunction) => {
 try{
    const isPasswordValid = await bcrypt.compare(
    password,
      registeredUser?.user?.password as string
    );

    if (!isPasswordValid) {
      return next(new AppError(401, "Invalid Credentials"))
    }

    const token = generateToken(registeredUser?.user?.id as string);
    const refreshToken = generateRefreshToken(
      registeredUser?.user?.id as string
    );

    const user = {
      id: registeredUser?.user?.id,
      name: registeredUser?.user?.name,
      email: registeredUser?.user?.email,
      access_token: token,
      refreshToken: refreshToken,
      accessExpireTime: accessExpireTime,
      refreshExpireTime: refreshExpireTime,
    };

    return user;

 }
  catch(err:any){
throw err
  }
}

export const loginWithOAuth = async (registeredUser: IRegisteredResponse) => {
  try{
    const token = generateToken(registeredUser?.oAuthUser?.id as string);
    const refreshToken = generateRefreshToken(
      registeredUser?.oAuthUser?.id as string
    );
    const user = {
      id: registeredUser?.oAuthUser?.id,
      name: registeredUser?.oAuthUser?.name,
      email: registeredUser?.oAuthUser?.email,
      access_token: token,
      refreshToken: refreshToken,
      accessExpireTime: accessExpireTime,
      refreshExpireTime: refreshExpireTime,
    };

    return user;
  }
  catch(err:any){
throw err
  }
}


export const getRefreshToken = async (token: string) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as IRefreshToken;
    const newAccessToken = generateToken(decodedToken.id);
    console.log("refreshed token")
    return newAccessToken;
  } catch (err: any) {
    if (err instanceof TokenExpiredError) {
      // Handle expired token error here
      console.error('Token has expired:', err.message);
      // You can return an error response or take other actions as needed
      throw new Error('Token has expired');
    } else {
      // Handle other JWT verification errors
      console.error('JWT verification error:', err.message);
      throw new Error('Failed to get token');
    }
  }
};

export const checkUserType = async (id: string) => {
  try{
    const user = await prisma.user.findUnique({
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

    const oAuthUser = await prisma.oAuthUser.findUnique({
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
  catch(err:any){
throw err
  }
}