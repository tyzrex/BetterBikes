import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name:string;
      email: string;
      access_token: string;
      id: string;
      image?: string;
    };
  }
}
