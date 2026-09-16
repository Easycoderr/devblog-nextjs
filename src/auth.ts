import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import CustomPrismaAdapter from "./lib/auth/custom-prisma-adapter";
import NextAuth, { Session } from "next-auth";
import { signInSchema } from "./lib/utils/schema";
import { encode, type JWT } from "next-auth/jwt";
import { randomUUID } from "node:crypto";
const adapter = CustomPrismaAdapter();
export const { handlers, signIn, auth, signOut } = NextAuth({
  ...authConfig,
  adapter,
  session: { strategy: "database" },
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
        const isMatch = await bcrypt.compare(password, user.password);
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
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }

      return token;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.email = user.email;
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.userName = user.userName;
        session.user.avatar = user.avatar;
      }
      return session;
    },
  },
  jwt: {
    async encode(params) {
      if (params.token?.credentials) {
        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }
        const sessionToken = randomUUID();
        await adapter.createSession?.({
          sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
        return sessionToken;
      }
      return encode(params);
    },
  },
});
