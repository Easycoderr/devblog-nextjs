"use server";
import { prisma } from "@/lib/prisma";

export async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
}
