"use server";
import { prisma } from "@/lib/prisma";
const POSTS_PER_PAGE = 8;
async function getLikedPostsByUserId(userId: string, currPage: number) {
  const skip = (currPage - 1) * POSTS_PER_PAGE;
  try {
    const [likedPosts, totalCount] = await prisma.$transaction([
      prisma.post.findMany({
        skip: skip,
        take: POSTS_PER_PAGE,
        where: {
          likes: {
            some: {
              userId,
            },
          },
        },
        include: {
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
          likes: {
            some: {
              userId,
            },
          },
        },
      }),
    ]);
    return { likedPosts, totalCount: Math.ceil(totalCount / POSTS_PER_PAGE) };
  } catch (error) {
    console.error("Failed to fetch liked posts by user Id:", error);
    return {
      likedPosts: [],
      totalCount: 0,
    };
  }
}

export default getLikedPostsByUserId;
