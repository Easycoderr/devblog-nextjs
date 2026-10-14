import { prisma } from "@/lib/prisma";
import getIpLocation from "@/lib/utils/getIpLocation";

const ACTIVITY_THROTTLE_MS = 5 * 60 * 1000;

// Best-effort, process-local throttle for non-critical activity tracking.
const recentActivity = new Map<string, number>();

export async function updateSessionActivity(
  sessionToken: string,
  userAgent: string | null,
  ipAddress: string | null,
) {
  const now = Date.now();
  const lastUpdate = recentActivity.get(sessionToken);

  // Skip repeated database work for the same session within five minutes.
  if (lastUpdate !== undefined && now - lastUpdate < ACTIVITY_THROTTLE_MS) {
    return;
  }

  // Set before awaiting to avoid duplicate work on concurrent requests.
  recentActivity.set(sessionToken, now);

  // Clean up old entries if the cache grows.
  if (recentActivity.size > 1000) {
    for (const [token, timestamp] of recentActivity) {
      if (now - timestamp >= ACTIVITY_THROTTLE_MS) {
        recentActivity.delete(token);
      }
    }
  }

  try {
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      select: {
        country: true,
        city: true,
        countryCode: true,
      },
    });

    if (!session) {
      recentActivity.delete(sessionToken);
      return;
    }

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
  } catch (error) {
    // Allow a later request to retry if the database operation fails.
    recentActivity.delete(sessionToken);
    throw error;
  }
}
