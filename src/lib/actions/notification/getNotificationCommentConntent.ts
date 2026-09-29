"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

async function getNotificationsCommentContent() {
  try {
    const session = await auth();
    if (!session?.user?.id) return [];
    const notifications = await prisma.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        comment: { select: { content: true } },
        post: { select: { slug: true } },
        actor: { select: { userName: true, name: true, avatar: true } },
      },
    });
    return notifications;
  } catch (error) {
    console.log("Failed to delete comment:", error);
    return [];
  }
}

export default getNotificationsCommentContent;
