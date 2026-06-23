"use server";
import { prisma } from "@/lib/prisma";
const POSTS_PER_PAGE = 8;
async function getSavedPostsByUserId(userId, currPage) {
  const skip = (currPage - 1) * POSTS_PER_PAGE;
  if (!userId) return [];
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
    console.log(error);
  }
}

export default getSavedPostsByUserId;
