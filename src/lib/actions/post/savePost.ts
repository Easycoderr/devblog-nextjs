"use server";
import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type SavePostTypes = {
  id: string;
  slug: string;
};

export async function savePost(post: SavePostTypes): Promise<void> {
  const { id: postId, slug } = post;
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const userId = user.id;

  const existing = await prisma.savedPost.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  try {
    if (existing) {
      await prisma.savedPost.delete({
        where: { userId_postId: { userId, postId } },
      });
    } else {
      await prisma.savedPost.create({
        data: {
          userId,
          postId,
        },
      });
    }
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${slug}`);
    revalidatePath(`/u`);
  } catch (error) {
    console.error("Save post record failed:", error);
  }
}
