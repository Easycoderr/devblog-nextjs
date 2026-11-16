"use server";
import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";

export async function getPostBySlug(slug: string) {
  const user = await getCurrentUser();

  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      ...(user
        ? { savedPosts: { where: { userId: user.id }, select: { id: true } } }
        : {}),
      _count: {
        select: { viewLog: true, likes: true, shares: true },
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
  });
  return post;
}
