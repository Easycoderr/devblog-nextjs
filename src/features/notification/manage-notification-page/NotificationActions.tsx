"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

import { toast } from "sonner";
import { useTransition } from "react";
import deleteNotification from "@/lib/actions/notification/deleteNotification";
type NotificationActionsProps = { notificationId: string; style?: boolean };
function NotificationActions({
  notificationId,
  style,
}: NotificationActionsProps) {
  const [isPending, startTransition] = useTransition();

  function handleDeleteNotification() {
    startTransition(async () => {
      const response = await deleteNotification(notificationId);
      if (!response) {
        toast.error("Something went wrong please try again.");
        return;
      }
      if (response.success) toast.success(response.message);
      if (!response.success) toast.error(response.message);
    });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className={`${style ? "bg-transparent! text-foreground rounded-md! hover:bg-accent!" : ""} cursor-pointer`}
        >
          <EllipsisVertical
            className={`${style ? "text-foreground!" : "text-black"} size-5!`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel></DropdownMenuLabel>
          <DropdownMenuItem
            disabled={isPending}
            asChild
            onSelect={(e) => e.preventDefault()}
          >
            <button onClick={handleDeleteNotification} className="w-full">
              Delete
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator /> */}
        {/* Display edit/delete options only if the current user is the author */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificationActions;
