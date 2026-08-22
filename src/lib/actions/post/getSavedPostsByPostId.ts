"use server";
import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";

export async function getSavedPostsByPostId(postId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const userId: string = user.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        savedPosts: userId
          ? {
              where: { userId },
              take: 1,
            }
          : false,
      },
    });
    if (!post) {
      throw new Error("Post not found");
    }
    const { savedPosts } = post;
    return { savedPosts };
  } catch (error) {
    console.log("Something went wrong, Error:", error);
  }
}
