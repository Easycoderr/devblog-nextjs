"use server";
import { prisma } from "./prisma";
import { auth } from "@/auth";

async function getCurrentUser() {
  const session = await auth();
  if (!session?.user) return null;
  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
        userName: true,
        name: true,
        provider: true,
      },
    });
    return user ?? null;
  } catch (error) {}
}
export async function getUserById(userId) {
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    omit: { password: true },
  });
  return user;
}
export default getCurrentUser;
