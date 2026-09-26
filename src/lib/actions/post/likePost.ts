"use server";
import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import createNotification from "../notification/createNotification";

export async function likePost(
  postId: string,
): Promise<{ success: boolean; message: string }> {
  const currUser = await getCurrentUser();
  if (!currUser) throw new Error("Unauthorized");
  const userId = currUser.id;
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      likes: { where: { userId } },
    },
  });

  if (!post) return { success: false, message: "Post not found!" };
  if (post.likes.length > 0) {
    await prisma.like.delete({
      where: {
        id: post.likes[0].id,
      },
    });
  } else {
    const like = await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
    console.log(like);
    await createNotification("LIKE", post.id);
  }
  revalidatePath("/blogs");
  return { success: true, message: "Post liked successfully" };
}
