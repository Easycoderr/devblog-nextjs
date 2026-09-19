"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { signOut } from "@/auth";

async function logoutAllSessions() {
  const session = await auth();

  if (!session?.user?.id) return { success: false, message: "Unauthorized" };

  await prisma.session.deleteMany({ where: { userId: session.user.id } });

  await signOut({ redirectTo: "/auth/signin" });
}

export default logoutAllSessions;
