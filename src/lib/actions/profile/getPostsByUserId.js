"use server";
import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
const POSTS_PER_PAGE = 8;
async function getPostsByUserId(userId, currPage) {
  if (!userId) return [];
  const skip = (currPage - 1) * POSTS_PER_PAGE;
  const user = await getCurrentUser();
  try {
    const [posts, totalCount] = await prisma.$transaction([
      prisma.post.findMany({
        skip: skip,
        take: POSTS_PER_PAGE,
        where: { authorId: userId },
        include: {
          ...(user
            ? {
                savedPosts: {
                  where: { userId: user.id },
                  select: { id: true },
                },
              }
            : {}),
          _count: {
            select: { viewLog: true },
          },
        },
      }),
      prisma.post.count({ where: { authorId: userId } }),
    ]);
    return { posts, totalCount: Math.ceil(totalCount / POSTS_PER_PAGE) };
  } catch (error) {
    console.log(error);
  }
}

export default getPostsByUserId;
