"use server";

import { prisma } from "@/lib/prisma";

export async function getUserByUserName(userName: string) {
  if (!userName) return null;
  const user = await prisma.user.findUnique({ where: { userName } });
  return user;
}
