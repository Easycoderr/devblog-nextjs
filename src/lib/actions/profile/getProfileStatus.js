"use server";

import { prisma } from "@/lib/prisma";

export async function getAllUserPosts(userId) {
  if (!userId) return [];
  try {
    const allPosts = prisma.post.count({ where: { authorId: userId } });
    return allPosts;
  } catch (error) {
    console.log("can't get number of user posts:", error);
  }
}
