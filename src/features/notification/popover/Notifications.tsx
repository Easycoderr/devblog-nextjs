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
import { useOptimistic, useState } from "react";
import Link from "next/link";
import MarkAllUsReadButton from "./MarkAllUsReadButton";

function Notifications({
  notifications,
}: {
  notifications: NotificationType[];
}) {
  const [optimisticNotifications, setOptimisticNotifications] = useOptimistic(
    notifications,
    (state, action: { type: "MARK_ALL_READ" }) => {
      if (action.type === "MARK_ALL_READ") {
        return state.map((n) => ({ ...n, read: true }));
      }
      return state;
    },
  );
  const [open, setOpen] = useState<boolean>(false);
  const unreadNotification = optimisticNotifications.filter(
    (notification) => notification.read === false,
  );
  const totalNotificationsToshow =
    unreadNotification.length > 8
      ? unreadNotification.slice(0, 8)
      : unreadNotification;
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-lg cursor-pointer"
          >
            <Bell />
            {unreadNotification.length !== 0 && (
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
          <PopoverHeader className="flex">
            <PopoverTitle className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <BellDot className="size-4" />
                <p>Notifications</p>
              </div>
              {unreadNotification.length !== 0 && (
                <MarkAllUsReadButton
                  setOptimisticNotifications={setOptimisticNotifications}
                />
              )}
            </PopoverTitle>
          </PopoverHeader>

          <div className="border-t p-1 overflow-y-scroll scrollbar-none scrollbar-thumb-primary scrollbar-track-accent">
            {unreadNotification.length !== 0 ? (
              <div className="flex flex-col gap-y-1.5">
                {unreadNotification.map((notif) => (
                  <NotificationItem
                    key={notif.id}
                    setOpen={setOpen}
                    notifications={notif}
                  />
                ))}
              </div>
            ) : (
              <div className="relative gap-2 items-center bg-accent p-1.5 rounded-lg ring-primary/60 w-100 max-w-xs text-center my-4">
                No notifications yet.
              </div>
            )}
          </div>
          <div className="mx-auto">
            <Link
              className="text-muted-foreground text-xs hover:text-primary hover:underline-offset-4"
              href="/notifications"
            >
              Manage your notifiactions
            </Link>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default Notifications;
