"use server";
import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateComment(commentId: string, content: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  try {
    await prisma.comment.update({
      where: { id: commentId, userId: user.id },
      data: {
        content,
      },
    });
    revalidatePath("/blogs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log("Failed to update comment:", error);
    throw new Error("Could not update comment.");
  }
}
