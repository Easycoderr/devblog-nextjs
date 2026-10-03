"use client";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import type { NotificationType } from "@/components/layout/Header";
import dateCalculation from "@/lib/utils/dateCalculation";
import NotificationContent from "./NotificationContent";
import selectHref from "../selectHref";
import readNotification from "@/lib/actions/notification/readNotification";
import React from "react";
import { useRouter } from "next/navigation";
import { EllipsisVertical } from "lucide-react";

function NotificationItem({
  notifications,
  setOpen,
}: {
  notifications: NotificationType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { id, commentId, actor, post, actorId, postId, type, createdAt, read } =
    notifications;
  if (!actor) return null;
  const selectedHref = selectHref(type, actorId, post?.slug, commentId);

  async function handleMarkAsReadTheNotification(
    e: React.MouseEvent<HTMLAnchorElement>,
  ) {
    e.preventDefault();
    setOpen(false);
    await readNotification(id);
    router.push(selectedHref);
  }
  return (
    <Link
      href={selectedHref}
      onClick={handleMarkAsReadTheNotification}
      className="flex justify-between relative gap-2 items-center bg-accent hover:bg-accent/60 transition-all duration-300 p-1.5 rounded-lg ring-primary/60 hover:ring-1"
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-6 w-6">
          {actor.avatar && (
            <AvatarImage
              sizes="lg"
              src={actor.avatar}
              alt={actor.name || "User avatar"}
            />
          )}
          <AvatarFallback>{actor.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <NotificationContent actor={actor} type={type} />
      </div>
      <span className="text-muted-foreground text-xs">
        {dateCalculation(createdAt)}
      </span>
      {read || (
        <span className="bg-destructive h-2.5 w-2.5 rounded-full absolute top-0 right-0"></span>
      )}
    </Link>
  );
}

export default NotificationItem;
