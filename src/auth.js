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
});
