"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function readNotification(notificationId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("Unauthorized");
  try {
    await prisma.notification.update({
      where: {
        id: notificationId,
        userId,
      },
      data: {
        read: true,
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.log(
      "Something went wrong while mark as read notification, ERROR:",
      error,
    );
  }
}

export default readNotification;
