import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string,{
    expiresIn: process.env.JWT_EXPIRY_TIME
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string,{
    expiresIn: process.env.JWT_REFRESH_EXPIRY_TIME
  });
}