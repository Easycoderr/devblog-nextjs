import { prisma } from "@/lib/prisma";

export async function getSharesByPostId(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        _count: { select: { shares: true } },
      },
    });
    return post;
  } catch (error) {
    console.log("Something went wrong, Error:", error);
  }
}
