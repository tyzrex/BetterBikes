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
            case 400: {
              throw new Error(
                JSON.stringify({ errors: err.response.data, status: 400 })
              );
            }
            case 401: {
              throw new Error(
                JSON.stringify({ errors: err.response.data, status: 401 })
              );
            }
            default: {
              throw new Error(
                JSON.stringify({
                  errors: ["Something went wrong"],
                  status: 500,
                })
              );
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
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ user, account }) {
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
    },
    async jwt({ token }) {
      return token;
    },
  },
};
