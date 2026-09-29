"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function deleteNotification(notificationId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");
  try {
    const response = await prisma.notification.delete({
      where: {
        id: notificationId,
        userId,
      },
    });
    if (response) {
      revalidatePath("/notifications");
      return { success: true, message: "Notification deleted successfully." };
    }
  } catch (error) {
    console.log(
      "Something went wrong while deleting notification, ERROR:",
      error,
    );
    return {
      success: false,
      message:
        "Something went wrong please check your internet and reload page, then try again.",
    };
  }
}

export default deleteNotification;
