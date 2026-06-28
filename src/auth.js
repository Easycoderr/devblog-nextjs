import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
export const { handlers, signIn, auth, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        const user = prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) return null;
        const isMutch = await bcrypt.compare(password, user.password);
        if (!isMutch) return null;
        const { password: pass, ...safeUser } = user;
        return safeUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.userName = user.userName;
        token.avatar = user.avatar;
      }
      return token;
    },
    async session({ token, session }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.userName = token.userName;
      session.user.avatar = token.avatar;
      return session;
    },
  },
});
