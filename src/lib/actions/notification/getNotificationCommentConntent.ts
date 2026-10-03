"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ta } from "zod/v4/locales";
type getNotificationsCommentContentProps = {
  filter?: "all" | "read" | "unread";
  sort?: "oldest" | "newest";
};
async function getNotificationsCommentContent(
  { filter = "all", sort }: getNotificationsCommentContentProps,
  take: number = 8,
) {
  const filtered = filter !== "all";
  try {
    const session = await auth();
    if (!session?.user?.id) return { notifications: [], notificationCount: 0 };
    const whereClause: Prisma.NotificationWhereInput = {
      userId: session.user.id,
      ...(filter !== "all" && { read: filter === "read" ? true : false }),
    };
    const [notifications, notificationCount] = await prisma.$transaction([
      prisma.notification.findMany({
        where: whereClause,
        take: Number(take),
        orderBy: { createdAt: sort === "oldest" ? "asc" : "desc" },
        include: {
          comment: { select: { content: true } },
          post: { select: { slug: true } },
          actor: { select: { userName: true, name: true, avatar: true } },
        },
      }),
      prisma.notification.count({ where: whereClause }),
    ]);
    return { notifications, notificationCount };
  } catch (error) {
    console.log("Failed to delete comment:", error);
    return { notifications: [], notificationCount: 0 };
  }
}

export default getNotificationsCommentContent;
