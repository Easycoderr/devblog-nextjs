"use client";
import { Button } from "@/components/ui/button";
import markAllAsRead from "@/lib/actions/notification/markAllAsRead";
import { startTransition } from "react";

function MarkAllUsReadButton({
  setOptimisticNotifications,
}: {
  setOptimisticNotifications: any;
}) {
  async function handleMarkAllAsRead() {
    startTransition(async () => {
      setOptimisticNotifications({ type: "MARK_ALL_READ" });
      try {
        await markAllAsRead();
      } catch (err) {
        console.error("Failed to mark notifications as read on server:", err);
      }
    });
  }
  return (
    <div>
      <Button
        type="button"
        onClick={handleMarkAllAsRead}
        variant="default"
        size="xs"
        className="cursor-pointer hover:bg-primary/75 transition-all duration-300x"
      >
        Mark all as read
      </Button>
    </div>
  );
}

export default MarkAllUsReadButton;
