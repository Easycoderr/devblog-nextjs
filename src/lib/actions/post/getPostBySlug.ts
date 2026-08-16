import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";

export async function getPostBySlug(slug: string) {
  const user = await getCurrentUser();
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      ...(user
        ? { savedPosts: { where: { userId: user.id }, select: { id: true } } }
        : {}),
      _count: {
        select: { viewLog: true, likes: true },
      },
    },
  });
  return post;
}
