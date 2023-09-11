import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string,{
    expiresIn: '1d'
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string,{
    expiresIn: '7d'
  });
}