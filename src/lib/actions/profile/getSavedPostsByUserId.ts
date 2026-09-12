"use server";
import { prisma } from "@/lib/prisma";
const POSTS_PER_PAGE = 8;
async function getSavedPostsByUserId(userId: string, currPage: number) {
  const skip = (currPage - 1) * POSTS_PER_PAGE;
  try {
    const [savedPosts, totalCount] = await prisma.$transaction([
      prisma.post.findMany({
        skip: skip,
        take: POSTS_PER_PAGE,
        where: {
          savedPosts: {
            some: {
              userId,
            },
          },
        },

        include: {
          savedPosts: { where: { userId }, select: { id: true } },
          _count: {
            select: { viewLog: true, likes: true },
          },
        },
        orderBy: {
          createdAt: "desc", // Shows the newest posts first
        },
      }),
      prisma.post.count({
        where: {
          savedPosts: {
            some: {
              userId,
            },
          },
        },
      }),
    ]);
    return { savedPosts, totalCount: Math.ceil(totalCount / POSTS_PER_PAGE) };
  } catch (error) {
    console.error("Failed to fetch saved posts by user:", error);
    return {
      savedPosts: [],
      totalCount: 0,
    };
  }
}

export default getSavedPostsByUserId;
