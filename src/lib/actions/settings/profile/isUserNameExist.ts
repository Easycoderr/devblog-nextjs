"use server";
import { prisma } from "@/lib/prisma";

async function isUserNameExist(
  userName: string,
): Promise<{ userName: string } | null> {
  const user = await prisma.user.findUnique({
    where: { userName },
    select: { userName: true },
  });
  if (user) {
    return user;
  } else {
    return null;
  }
}

export default isUserNameExist;
