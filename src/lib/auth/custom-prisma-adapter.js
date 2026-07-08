"use server";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../prisma";
import { generateUserName } from "../actions/auth";

async function CustomPrismaAdapter() {
  const adapter = PrismaAdapter(prisma);
  return {
    ...adapter,
    async createUser(data) {
      const [firstName = "", ...rest] = (data.name ?? "").trim().split(" ");
      const lastName = rest.join(" ");
      return prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          avatar: data.image,
          firstName,
          lastName,
          userName: await generateUserName(data.name),
          password: null,
          emailVerified: new Date(),
          provider: "google",
        },
      });
    },
  };
}

export default CustomPrismaAdapter;
