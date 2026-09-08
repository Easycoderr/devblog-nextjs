"use server";

import { prisma } from "@/lib/prisma";

async function getAuthorById(authorId: string) {
  try {
    const author = await prisma.user.findUnique({
      where: { id: authorId },
      select: { name: true, avatar: true, userName: true },
    });
    return author;
  } catch (error) {
    console.log("Something went wrong, Error:", error);
  }
}

export default getAuthorById;
