"use server";

import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";

export async function getLikesByPostId(postId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        _count: {
          select: { likes: true },
        },
        likes: user?.id
          ? {
              where: { userId: user?.id },
              take: 1,
            }
          : false,
      },
    });
    if (!post) return null;
    const { likes, _count } = post;
    return { _count, userLike: likes && likes.length > 0 ? likes[0] : null };
  } catch (error) {
    console.log("Something went wrong while fetch likes, ERROR:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
