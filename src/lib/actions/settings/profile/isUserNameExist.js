"use server";
import { prisma } from "@/lib/prisma";

async function isUserNameExist(userName) {
  const user = await prisma.user.findUnique({ where: { userName } });
  if (user) {
    return user;
  } else {
    return null;
  }
}

export default isUserNameExist;
