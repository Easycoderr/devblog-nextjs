"use client";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { Button } from "../../../components/ui/button";
import { Bell, BellDot } from "lucide-react";
import type { NotificationType } from "../../../components/layout/Header";

import NotificationItem from "../popover/NotificationItem";
import { useState } from "react";

function Notifications({
  notifications,
}: {
  notifications: NotificationType[];
}) {
  const [open, setOpen] = useState<boolean>(false);
  const unreadNotification = notifications.filter(
    (notification) => notification.read === false,
  );
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full cursor-pointer"
          >
            <Bell />
            {notifications && (
              <span
                className={`flex items-center justify-center absolute -top-1 -right-1 bg-primary rounded-full ${unreadNotification.length >= 9 ? "h-5 w-5" : "h-4 w-4"} text-xs`}
              >
                {unreadNotification.length >= 9
                  ? "9+"
                  : unreadNotification.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-h-80">
          <PopoverHeader>
            <PopoverTitle className="flex items-center gap-1">
              <BellDot className="size-4" />
              <span>Notifications</span>
            </PopoverTitle>
          </PopoverHeader>

          <div className="border-t p-1 overflow-y-scroll scrollbar-none scrollbar-thumb-primary scrollbar-track-accent">
            {notifications && (
              <div className="flex flex-col gap-y-1.5">
                {notifications.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    setOpen={setOpen}
                    notifications={notif}
                  />
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Notifications;
