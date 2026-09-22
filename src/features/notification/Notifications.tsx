import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { Bell, BellDot } from "lucide-react";
import type { NotificationType } from "../../components/layout/Header";

import NotificationItem from "./NotificationItem";

function Notifications({
  notifications,
}: {
  notifications: NotificationType[];
}) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full cursor-pointer"
          >
            <Bell />
            {notifications && (
              <span className="flex items-center justify-center absolute -top-1 -right-1 bg-primary rounded-full h-4 w-4 text-xs">
                {notifications.length >= 9 ? "9+" : notifications.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverTitle className="flex items-center gap-1">
            <BellDot className="size-4" />
            <span>Notification</span>
          </PopoverTitle>
          {notifications && (
            <div className="flex flex-col gap-y-1.5">
              {notifications.map((notif) => (
                <NotificationItem key={notif.id} notifications={notif} />
              ))}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Notifications;
