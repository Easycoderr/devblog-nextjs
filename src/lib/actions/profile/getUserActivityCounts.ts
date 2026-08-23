"use server";

import { prisma } from "@/lib/prisma";

export async function getUserActivityCounts(userId: string) {
  try {
    const [likedCount, savedCount] = await prisma.$transaction([
      prisma.like.count({ where: { userId } }),
      prisma.savedPost.count({ where: { userId } }),
    ]);
    return {
      likedPostsCount: likedCount,
      savedPostsCount: savedCount,
    };
  } catch (error) {
    console.error("Failed to fetch user activity counts:", error);
    return { likedPostsCount: 0, savedPostsCount: 0 };
  }
}
