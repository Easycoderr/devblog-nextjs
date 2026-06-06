"use server";
import { prisma } from "@/lib/prisma";
const POSTS_PER_PAGE = 8;
async function getLikedPostsByUserId(userId, currPage) {
  const skip = (currPage - 1) * POSTS_PER_PAGE;
  if (!userId) return [];
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
    console.log(error);
  }
}

export default getLikedPostsByUserId;
