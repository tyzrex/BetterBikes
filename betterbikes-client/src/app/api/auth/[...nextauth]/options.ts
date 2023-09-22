import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverRequest } from "@/app/services/serverRequest";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, _req) {
        try {
          const res = await serverRequest(
            "/auth/login/credentials",
            "POST",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );
          console.log(res.user)
          if (res) {
            return res.user
          }
          else{
           return null
          }
        } catch (err: any) {
          switch (err.status) {
            case 400:
            case 401:
              throw err;

            case 404:
              throw new Error("User not found");

            default: {
              throw new Error("Something went wrong");
            }
          }
        }
      },
    }),
  ],
  secret: process.env.NEXT_SECRECT_KEY,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/signout",
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token as any;

      if (new Date(session.user.accessExpireTime) <= new Date()) {
        console.log("Access token is expired or about to expire");
        const response = await serverRequest(
          "/auth/refresh-token",
          "POST",
          {
            token: session.user.refreshToken,
          }
        );
        session.user.access_token = response.data.newAccessToken;
      }
      return session;
    },
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const response = await serverRequest(
            "/auth/login/google",
            "POST",
            {
              token: account?.id_token,
            }
          );
          if (response) {
            user.access_token = response.user.access_token;
            user.refreshToken = response.user.refreshToken;
            user.accessExpireTime = response.user.accessExpireTime;
            user.refreshExpireTime = response.user.refreshExpireTime;
            return true;
          }
        }
        if(account?.provider === "credentials"){
          return true
        }
        return false;
      } catch (err: any) {
        console.log(err);
        switch (err.status) {
          case 400:
          case 401:
            throw err;

          case 404:
            throw new Error("User not found");

          default: {
            throw new Error("Something went wrong");
          }
        }
      }
    },
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      return token;
    },
  },
};
