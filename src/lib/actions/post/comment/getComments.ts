import { prisma } from "@/lib/prisma";

export async function getComments(postId: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return comments;
  } catch (error) {
    console.log("Failed to fetch comments:", error);
    throw new Error("Could not load comments.");
  }
}
