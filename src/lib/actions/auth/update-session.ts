import { prisma } from "@/lib/prisma";

export async function updateSessionActivity(
  sessionToken: string,
  userAgent: string | null,
  ipAddress: string | null,
) {
  await prisma.session.update({
    where: { sessionToken },
    data: {
      userAgent,
      ipAddress,
      lastActiveAt: new Date(),
    },
  });
}
