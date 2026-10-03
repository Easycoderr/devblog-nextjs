"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateTag } from "next/cache";

async function markAllAsRead() {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return { success: false, message: "Unauthorized" };
  try {
    await prisma.notification.updateMany({
      where: {
        userId,
      },
      data: {
        read: true,
      },
    });
    // revalidatePath("/");
    updateTag("header-notifications");
  } catch (error) {
    console.log(
      "An error happend while mark notifications as read, ERROR:",
      error,
    );
    throw new Error(
      "An error happend while mark notifications as read, ERROR:",
    );
  }
}

export default markAllAsRead;
