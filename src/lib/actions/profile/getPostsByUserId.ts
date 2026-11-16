"use server";
import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
const POSTS_PER_PAGE = 8;
async function getPostsByUserId(userId: string, currPage: number) {
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
            select: { viewLog: true, shares: true, likes: true },
          },
          likes: {
            where: user?.id ? { userId: user.id } : { OR: [] },
            select: { id: true },
            take: 1,
          },
          author: {
            select: {
              id: true,
              name: true,
              userName: true,
              avatar: true,
            },
          },
        },
      }),
      prisma.post.count({ where: { authorId: userId } }),
    ]);
    return { posts, totalCount: Math.ceil(totalCount / POSTS_PER_PAGE) };
  } catch (error) {
    console.error("Failed to fetch posts by user Id:", error);
    return {
      posts: [],
      totalCount: 0,
    };
  }
}

export default getPostsByUserId;
