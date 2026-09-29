"use client";
import type { NotificationType } from "@prisma/client";

type NotificationContentProps = {
  type: NotificationType;
  section?: string;
  actor: { userName: string; name: string | null; avatar: string | null };
};
function NotificationContent({
  type,
  section,
  actor,
}: NotificationContentProps) {
  let content: string;

  switch (type) {
    case "COMMENT":
      content = "commented on your post.";
      break;

    case "REPLY":
      content = "replied to your comment.";
      break;

    case "LIKE":
      content = "liked your post.";
      break;

    case "FOLLOW":
      content = "followed you.";
      break;
    default:
      content = "";
      break;
  }
  return (
    <span className="text-xs font-medium">
      {section !== "main-page" && actor?.name} {content}
    </span>
  );
}

export default NotificationContent;
