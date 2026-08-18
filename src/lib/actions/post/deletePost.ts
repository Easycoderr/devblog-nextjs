"use server";
import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: string) {
  const user = await getCurrentUser();
  if (!user.id) throw new Error("Unauthorized");
  try {
    const result = await prisma.post.deleteMany({
      where: { id: postId, authorId: user.id },
    });
    if (result.count === 0)
      return { success: false, error: "Post not found or unauthorized" };
    revalidatePath("/blogs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "Database error occurred" };
  }
}
