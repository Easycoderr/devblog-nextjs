import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import CustomPrismaAdapter from "./lib/auth/custom-prisma-adapter";
import NextAuth, { Session, type NextAuthResult } from "next-auth";
import { signInSchema } from "./lib/utils/schema";
import type { JWT } from "next-auth/jwt";
const authResult: NextAuthResult = NextAuth({
  ...authConfig,
  adapter: CustomPrismaAdapter(),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/auth-error",
  },
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = signInSchema.parse({
          email: credentials.email,
          password: credentials.password,
        });
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) return null;
        if (user.provider === "google") {
          throw new Error(
            "This account was created with Google. Please continue with Google.",
          );
        }
        if (!user.emailVerified) {
          throw new Error("Please verify your email before signing in.");
        }
        if (!user.password) return null;
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) return null;
        const { password: _, ...safeUser } = user;
        return safeUser;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email) {
          return false;
        }
        const existingUser = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (existingUser?.provider === "credentials") {
          throw new Error(
            "This email is already registered with email and password. Please sign in using your credentials.",
          );
        }
      }
      return true;
    },
    async jwt({ session, token, trigger, user }) {
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.email) token.email = session.email;
        if (session.userName) token.userName = session.userName;
        if (session.avatar) token.avatar = session.avatar;
      }
      if (user) {
        token.id = user.id!;
        token.name = user.name;
        token.userName = user.userName;
        token.avatar = user.avatar;
        token.email = user.email!;
      }
      return token;
    },
    async session({ token, session }: { token: JWT; session: Session }) {
      if (token && session.user) {
        session.user.email = token.email;
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.userName = token.userName;
        session.user.avatar = token.avatar;
      }
      return session;
    },
  },
});

export const handlers = authResult.handlers;
export const signIn = authResult.signIn;
export const auth = authResult.auth;
export const signOut = authResult.signOut;
