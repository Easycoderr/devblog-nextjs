import { Notification } from "@/app/notifications/page";
import NotificationCard, { NotificationCardProps } from "./NotificationCard";
import { NotificationType } from "@/components/layout/Header";

function NotificationList({
  notifications,
}: {
  notifications: Notification[];
}) {
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
