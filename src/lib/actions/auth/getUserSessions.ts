"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

async function getUserSessions() {
  const session = await auth();
  if (!session?.user?.id) return [];
  const cookieStore = await cookies();

  const sessionToken =
    cookieStore.get("authjs.session-token")?.value ??
    cookieStore.get("__Secure-authjs.session-token")?.value;

  const sessions = await prisma.session.findMany({
    where: {
      userId: session.user.id,
      expires: { gt: new Date() },
    },
    orderBy: {
      lastActiveAt: "desc",
    },
    select: {
      id: true,
      userAgent: true,
      ipAddress: true,
      createdAt: true,
      lastActiveAt: true,
      expires: true,
      sessionToken: true,
      city: true,
      country: true,
      countryCode: true,
    },
  });
  return sessions.map(({ sessionToken: token, ...session }) => ({
    ...session,
    isCurrent: token === sessionToken,
  }));
}

export default getUserSessions;
