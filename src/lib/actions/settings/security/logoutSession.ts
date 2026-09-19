"use server";

import { auth, signOut } from "@/auth";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

async function logoutSession(sessionId: string) {
  const session = await auth();
  if (!session?.user?.id) return { success: false, message: "Unauthorized" };
  const cookieStore = await cookies();
  const currentToken =
    cookieStore.get("authjs.session-token")?.value ??
    cookieStore.get("__Secure-authjs.session-token")?.value;

  const targetSession = await prisma.session.findFirst({
    where: { id: sessionId, userId: session.user.id },
    select: {
      id: true,
      sessionToken: true,
    },
  });
  if (!targetSession) {
    return { success: false, message: "Session not found" };
  }
  await prisma.session.delete({ where: { id: targetSession.id } });

  if (targetSession.sessionToken === currentToken) {
    await signOut({ redirectTo: "/auth/signin" });
  }
  revalidatePath("/settings/security");
  return { success: true, message: "Session logout successfuly" };
}

export default logoutSession;
