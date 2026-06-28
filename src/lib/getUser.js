"use server";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { auth } from "@/auth";

async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
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
