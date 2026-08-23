"use server";
import { prisma } from "./prisma";
import { auth } from "@/auth";

async function getCurrentUser() {
  try {
    const session = await auth();
    if (!session?.user?.id) return null;
    const { email, userName, name } = session?.user;
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        provider: true,
        avatar: true,
        avatarId: true,
        bio: true,
      },
    });
    if (!user) return null;
    return { userName, email, name, ...user };
  } catch (error) {
    console.log("Something went wrong while fetch user, ERROR:", error);
    return null;
  }
}
export async function getUserById(userId: string) {
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true },
  });
  return user;
}
export default getCurrentUser;
