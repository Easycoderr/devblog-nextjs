"use client";
import type { NotificationType } from "@prisma/client";

type NotificationContentProps = {
  type: NotificationType;
  actor: { name: string | null; avatar: string | null };
};
function NotificationContent({ type, actor }: NotificationContentProps) {
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
    <div className="text-xs font-medium">
      {actor?.name} {content}
    </div>
  );
}

export default NotificationContent;
