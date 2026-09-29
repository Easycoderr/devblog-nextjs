import type {
  Notification,
  NotificationPageParams,
} from "@/app/notifications/page";
import NotificationCard from "./NotificationCard";
import getNotificationsCommentContent from "@/lib/actions/notification/getNotificationCommentConntent";

type NotificationListProps = {
  searchParams: NotificationPageParams;
};

async function NotificationList({ searchParams }: NotificationListProps) {
  const params = await searchParams;
  const sort = params?.sort;
  const filter = params?.filter;
  const notifications = await getNotificationsCommentContent({ filter, sort });
  if (!notifications.length) {
    return (
      <div className="mx-auto text-xl text-foreground px-4 py-2 rounded-lg bg-card shadow-sm">
        No notification yet, check back later
      </div>
    );
  }

  return (
    <div className="p-1 overflow-y-scroll scrollbar-none scrollbar-thumb-primary scrollbar-track-accent">
      {notifications && (
        <div className="flex flex-col gap-y-1.5">
          {notifications.map((notif) => (
            <NotificationCard key={notif.id} notification={notif} />
          ))}
        </div>
      )}
    </div>
  );
}

export default NotificationList;
