"use server";

import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteComment(commentId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  try {
    const result = await prisma.comment.delete({
      where: { id: commentId, userId: user.id },
    });
    revalidatePath("/blogs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log("Failed to delete comment:", error);
    throw new Error("Could not delete comment.");
  }
}
