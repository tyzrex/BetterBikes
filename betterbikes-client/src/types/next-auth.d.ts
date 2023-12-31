import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      name:string;
      email: string;
      access_token: JWT;
      refreshToken: JWT;
      accessExpireTime: Date;
      refreshExpireTime: Date;
      id: string;
      image?: string;
    };
  }

  interface User{
    id: string;
    name:string;
    email: string;
    image?: string;
    access_token: JWT;
    refreshToken: JWT;
    accessExpireTime: Date;
    refreshExpireTime: Date;
  }
}