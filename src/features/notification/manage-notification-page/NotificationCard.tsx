"use client";
import Image from "next/image";

import NotificationContent from "../popover/NotificationContent";
import { Notification } from "@/app/notifications/page";
import dateCalculation from "@/lib/utils/dateCalculation";
import Link from "next/link";
import selectHref from "../selectHref";
import NotificationActions from "./NotificationActions";
import readNotification from "@/lib/actions/notification/readNotification";
import { useRouter } from "next/navigation";
import {
  MessageCircle,
  MessageCircleReply,
  ThumbsUp,
  UserPlus,
} from "lucide-react";

export type NotificationCardProps = { notification: Notification };

function NotificationCard({ notification }: NotificationCardProps) {
  const router = useRouter();
  const {
    id,
    type,
    actor,
    comment,
    actorId,
    post,
    commentId,
    createdAt,
    read,
  } = notification;
  const icon = {
    COMMENT: <MessageCircle size={15} />,
    REPLY: <MessageCircleReply size={15} />,
    LIKE: <ThumbsUp size={15} />,
    FOLLOW: <UserPlus size={15} />,
  }[type];
  const selectedHref = selectHref(type, actorId, post?.slug, commentId);

  async function handleMarkAsReadTheNotification(
    e: React.MouseEvent<HTMLAnchorElement>,
  ) {
    e.preventDefault();

    await readNotification(id);
    router.push(selectedHref);
  }
  return (
    <div
      className={`group relative rounded-lg border p-3 transition-all duration-200 ${
        read
          ? "border-border bg-card hover:bg-muted/40"
          : "border-primary/20 bg-primary/5 hover:bg-primary/10"
      }`}
    >
      <Link
        onClick={handleMarkAsReadTheNotification}
        href={selectedHref}
        className="flex items-center gap-3 "
      >
        {/* Unread indicator */}
        {!read && (
          <span className="absolute left-2 top-3 h-2 w-2 rounded-full bg-primary" />
        )}

        {/* Avatar */}
        <div className="relative ml-2 shrink-0">
          <div className="relative h-11 w-11 overflow-hidden rounded-full border border-border">
            {actor?.avatar ? (
              <Image
                src={actor.avatar}
                alt={`${actor.userName}'s avatar`}
                fill
                className="object-cover"
                sizes="44px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted text-sm font-semibold">
                {actor!.userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          {/* ICON */}
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-background bg-primary text-primary-foreground">
            {icon}
          </span>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-5">
            <span className="font-semibold">{actor!.name}</span>{" "}
            <span className="text-muted-foreground">
              <NotificationContent
                section="main-page"
                type={type}
                actor={actor!}
              />
            </span>
          </p>
          {comment?.content && (
            <p className="flex items-center gap-0.5 text-muted-foreground leading-5 wrap-break-word text-pretty">
              <span>{comment.content}</span>
            </p>
          )}
          <p className="mt-1 text-xs text-muted-foreground">
            {dateCalculation(createdAt)}
          </p>
        </div>

        {/* Hover action */}
      </Link>
      <div
        className="absolute top-[50%] translate-y-[-50%] right-3 shrink-0 rounded-md p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label="Notification actions"
      >
        <NotificationActions notificationId={id} style={true} />
      </div>
    </div>
  );
}

export default NotificationCard;
