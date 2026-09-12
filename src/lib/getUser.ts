"use server";
import { prisma } from "./prisma";
import { auth } from "@/auth";

async function getCurrentUser() {
  try {
    const session = await auth();
    if (!session?.user?.id) return null;
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        userName: true,
        email: true,
        name: true,
        firstName: true,
        lastName: true,
        provider: true,
        avatar: true,
        avatarId: true,
        bio: true,
      },
    });
    if (!user) return null;
    return user;
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
