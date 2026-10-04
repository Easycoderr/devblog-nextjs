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
  try {
    const session = await auth();
    if (!session?.user?.id) return { notifications: [], notificationCount: 0 };
    const whereClause: Prisma.NotificationWhereInput = {
      userId: session.user.id,
      ...(filter !== "all" && { read: filter === "read" ? true : false }),
    };
    const parsedTake = Number(take);
    const safeTake =
      Number.isInteger(parsedTake) && parsedTake >= 8 ? parsedTake : 8;
    const [notifications, notificationCount] = await prisma.$transaction([
      prisma.notification.findMany({
        where: whereClause,
        take: safeTake,
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
    console.error("Failed to fetch notifications:", error);
    return { notifications: [], notificationCount: 0 };
  }
}

export default getNotificationsCommentContent;
