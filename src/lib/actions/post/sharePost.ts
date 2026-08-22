"use server";

import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function sharePost(postId: string) {
  const user = await getCurrentUser();
  const userId = user?.id ?? null;
  const cookieStore = await cookies();
  let guestId: string | null = null;
  if (!userId) {
    guestId = cookieStore.get("guest-id")?.value ?? null;
    if (!guestId) {
      guestId = crypto.randomUUID();
      cookieStore.set("guest-id", guestId, { httpOnly: true });
    }
  }
  try {
    const newShare = userId
      ? await prisma.share.upsert({
          where: { userId_postId: { userId, postId } },

          update: {},
          create: {
            postId,
            userId,
            guestId: null,
          },
        })
      : await prisma.share.upsert({
          where: { guestId_postId: { guestId: guestId!, postId } },
          update: {},
          create: {
            postId,
            userId: null,
            guestId,
          },
        });
    revalidatePath("/blogs");
    revalidatePath("/");
    return newShare;
  } catch (error) {
    console.error("Share record failed:", error);
    throw error;
  }
}
