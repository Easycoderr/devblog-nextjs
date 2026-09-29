import NotificationList from "@/features/notification/manage-notification-page/NotificationList";
import NotificationListSkeleton from "@/features/notification/manage-notification-page/NotificationListSkeleton";
import getNotificationsCommentContent from "@/lib/actions/notification/getNotificationCommentConntent";
import { Prisma } from "@prisma/client";
import { Suspense } from "react";
export type Notification = Prisma.NotificationGetPayload<{
  include: {
    comment: { select: { content: true } };
    post: { select: { slug: true } };
    actor: { select: { userName: true; name: true; avatar: true } };
  };
}>;
async function page() {
  const notifications = await getNotificationsCommentContent();

  return (
    <div className="space-y-12 relative w-full">
      {/* main */}
      <main className="container flex flex-col px-10 py-10 space-y-10 mx-auto">
        <div className="flex justify-between">
          <div className="space-y-3">
            <h2 className="text-2xl text-start text-foreground md:text-3xl md:ml-0 font-sora font-bold">
              Notifications
            </h2>
            <p className="text-muted-foreground leading-relaxed tracking-normal font-medium">
              Manage your notifications
            </p>
          </div>
        </div>

        <div className="border-t mb-2"></div>
        <Suspense fallback={<NotificationListSkeleton />}>
          <NotificationList notifications={notifications} />
        </Suspense>
        {!notifications.length && (
          <div className="mx-auto text-xl text-foreground px-4 py-2 rounded-lg bg-card shadow-sm">
            No notification yet, check back later
          </div>
        )}
      </main>
    </div>
  );
}

export default page;
