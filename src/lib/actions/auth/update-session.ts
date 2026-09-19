import { prisma } from "@/lib/prisma";
import getIpLocation from "@/lib/utils/getIpLocation";

export async function updateSessionActivity(
  sessionToken: string,
  userAgent: string | null,
  ipAddress: string | null,
) {
  const session = await prisma.session.findUnique({
    where: { sessionToken },
    select: {
      country: true,
      city: true,
      countryCode: true,
    },
  });
  if (!session) return;
  const location =
    !session.country && !session.city ? await getIpLocation(ipAddress) : null;
  await prisma.session.update({
    where: { sessionToken },
    data: {
      userAgent,
      ipAddress,
      lastActiveAt: new Date(),
      ...(location && {
        city: location.city,
        country: location.country,
        countryCode: location.countryCode,
      }),
    },
  });
}
