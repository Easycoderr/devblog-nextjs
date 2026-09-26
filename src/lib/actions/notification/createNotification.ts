import "server-only";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NotificationType } from "@prisma/client";

async function createNotification(
  type: NotificationType,
  postId: string,
  commentId?: string,
  parentId?: string,
) {
  const session = await auth();
  const actorId = session?.user?.id;
  if (!actorId) throw new Error("Unauthorized");
  let userId: string;
  if (type === "LIKE") {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    userId = post.authorId;

    if (userId === actorId) return;

    await prisma.notification.upsert({
      where: {
        userId_actorId_postId_type: {
          userId,
          actorId,
          postId,
          type: "LIKE",
        },
      },
      update: {
        read: false,
        createdAt: new Date(),
      },
      create: {
        type: "LIKE",
        userId,
        actorId,
        postId,
      },
    });
  }
  if (type === "REPLY") {
    const parentComment = await prisma.comment.findUnique({
      where: { id: parentId },
      select: {
        userId: true,
      },
    });
    if (!parentComment) throw new Error("Parent comment not found");

    userId = parentComment.userId;
    if (userId === actorId) return;
    await prisma.notification.create({
      data: {
        postId,
        commentId,
        userId,
        actorId,
        type,
      },
    });
  } else if (type === "COMMENT") {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true, slug: true },
    });
    if (!post) throw new Error("Post not found");
    userId = post.authorId;
    if (userId === actorId) return;
    await prisma.notification.create({
      data: {
        postId,
        commentId,
        userId,
        actorId,
        type,
      },
    });
  }
}

export default createNotification;
