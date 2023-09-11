import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";
import { Request, Response } from "express";
import { checkAlreadyRegistered } from "../services/auth.services";
import dotenv from "dotenv";
import { PrismaClient, Prisma } from '@prisma/client';
import {
  type IRegister,
  type ILogin,
  type IGoogleLogin,
} from "@app/interfaces/auth";
import { generateRefreshToken, generateToken } from "../utils/generateToken";
dotenv.config();

export const RegisterUser = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, phone, address }: IRegister = req.body;

    const checkRegistration = await checkAlreadyRegistered(email);

    if (checkRegistration?.status === true) {
      return res.status(409).json({ message: "User already registered" });
    }

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
    

    res.status(200).json(
    {
       message: "Successfully Registered, Proceed to Login"
    }
    );
  } catch (err) {
     if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // The .code property can be accessed in a type-safe manner
    if (err.code === 'P2002') {
      return res.status(422).json({
        message: "There is a unique constraint violation, a new user cannot be created with this phone"
      })
    }}
    res.status(400).json(err);
  }
};

export const CredentialLoginUser = async (req: Request, res: Response) => {
  try {
    const credentials = req.body as ILogin;
    const registeredUser = await checkAlreadyRegistered(credentials.email);
    if (registeredUser?.status === false) {
      return res
        .status(401)
        .json({ message: "User not found, please register" });
    }

    const isOAuthUser = registeredUser?.oAuthUser;

    if (isOAuthUser) {
      return res
        .status(401)
        .json({ message: "Use OAuth with Google for this email" });
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      registeredUser?.user?.password as string
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(registeredUser?.user?.id as string);
    const refreshToken = generateRefreshToken(
      registeredUser?.user?.id as string
    );
    const accessExpireTime = new Date(
      new Date().getTime() + 24 * 60 * 60 * 1000
    );
    const refreshExpireTime = new Date(
      new Date().getTime() + 24 * 7 * 60 * 60 * 1000
    );

    res.status(200).json({
      user: {
        email: registeredUser?.user?.email,
        name: registeredUser?.user?.name,
        id: registeredUser?.user?.id,
        access_token: token,
        refreshToken: refreshToken,
        accessExpireTime: accessExpireTime,
        refreshExpireTime: refreshExpireTime,
        role: registeredUser?.user?.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

export const GoogleLoginUser = async (req: Request, res: Response) => {
  try {
    const credentials = req.body as IGoogleLogin;
    const registeredUser = await checkAlreadyRegistered(credentials.email);

    if (registeredUser?.status === false) {
      const user = await prisma.oAuthUser.create({
        data: {
          email: credentials.email,
          name: credentials.name,
          profile_image: credentials.profileImage,
          oAuth_provider: credentials.oAuthProvider,
          oAuth_id: credentials.oAuthId,
        },
      });

      const token = generateToken(user?.id as string);

      return res.status(200).json({
        user: {
          email: user?.email,
          name: user?.name,
          id: user?.id,
          access_token: token,
        },
      });
    } else {
      if (registeredUser?.user?.email === credentials.email) {
        return res.status(401).json({
          message:
            "This account was linked using credentials. Please sign in with your email and password",
        });
      } else {
        const token = generateToken(registeredUser?.user?.id as string);
        const refreshToken = generateRefreshToken(
          registeredUser?.user?.id as string
        );
        const accessExpireTime = new Date(
          new Date().getTime() + 24 * 60 * 60 * 1000
        );
        const refreshExpireTime = new Date(
          new Date().getTime() + 24 * 7 * 60 * 60 * 1000
        );
        return res.status(200).json({
          user: {
            email: registeredUser?.oAuthUser?.email,
            name: registeredUser?.oAuthUser?.name,
            id: registeredUser?.oAuthUser?.id,
            access_token: token,
            refreshToken: refreshToken,
            accessExpireTime: accessExpireTime,
            refreshExpireTime: refreshExpireTime,
            role: registeredUser?.oAuthUser?.role,
          },
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};
