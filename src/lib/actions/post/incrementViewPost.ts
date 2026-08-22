"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import crypto from "crypto";
import { headers } from "next/headers";
import getCurrentUser from "@/lib/getUser";
import { Prisma } from "@prisma/client";

export async function incrementViewPost(slug: string) {
  const user = await getCurrentUser();
  const userId: string = user?.id ?? null;
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "127.0.0.1";
    const dateStr = new Date().toISOString().split("T")[0];
    const uniqueToken = crypto
      .createHash("sha256")
      .update(`${ip}-${slug}-${dateStr}`)
      .digest("hex");
    const post = await prisma.post.findUnique({
      where: { slug },
      select: { id: true },
    });
    if (!post) return { success: false };

    await prisma.viewLog.create({
      data: {
        postId: post.id,
        token: uniqueToken,
        ...(userId && { userId }),
      },
    });
    revalidatePath(`/blog/${slug}`);
    return { success: true };
  } catch (error) {
    console.log(error);
    // constraint error
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    )
      return { success: false };
    return { success: false };
  }
}
