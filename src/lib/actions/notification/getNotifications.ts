"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

async function fetchUserNotifications(userId: string) {
  return await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      post: { select: { slug: true } },
      actor: { select: { userName: true, name: true, avatar: true } },
    },
  });
}
const getCacheNotifications = unstable_cache(
  async (userId: string) => fetchUserNotifications(userId),
  ["user-notifications"],
  { tags: ["header-notifications"] },
);
async function getNotifications() {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    if (!userId) return [];
    return await getCacheNotifications(userId);
  } catch (error) {
    console.log("Failed to fetch notifications:", error);
    return [];
  }
}

export default getNotifications;
