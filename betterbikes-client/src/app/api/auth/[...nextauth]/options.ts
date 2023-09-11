import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PostRequest } from "@/app/services/httpRequest";

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
          const res = await PostRequest("/auth/login/credentials", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = res.data;

          if (user) {
            return user.user;
          }
        } catch (err: any) {
          console.log(err.response.data);
          switch (err.response.status) {
            case 400:
            case 401:
              throw new Error(err.response.data.message);

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
    signIn: "/signin",
    error: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      return session;
    },
    async signIn({ user, account }) {
      try {
        if (account?.provider === "google") {
          const response = await PostRequest("/auth/login/google", {
            email: user?.email,
            name: user?.name,
            profileImage: user?.image,
            oAuthId: account?.providerAccountId,
            oAuthProvider: account?.provider,
          });
        }
        return true;
      } catch (err: any) {
        switch (err.response.status) {
          case 400:
          case 401:
            throw new Error(err.response.data.message);

          default: {
            throw new Error("Something went wrong");
          }
        }
      }
    },
    async jwt({ token }) {
      return token;
    },
  },
};
