"use server";

import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createComment(
  postId: string,
  content: string,
  parentId: string | null = null,
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  if (!content || content.trim() === "") {
    throw new Error("Comment content cannot be empty");
  }
  try {
    const comment = await prisma.comment.create({
      data: { content, parentId, userId: user.id, postId },
    });
    revalidatePath(`/blogs/${postId}`);
    return { success: true, comment };
  } catch (error) {
    console.error("Error while posting comment:", error);
    return { success: false, error: "Failed to post comment" };
  }
}
