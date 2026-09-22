import type { NotificationType } from "@prisma/client";

export function selectHref(
  type: NotificationType,
  postId: string | null,
  actorId: string | null,
  slug: string | null,
  commentId: string | null,
) {
  let href: string;
  switch (type) {
    case "COMMENT":
      href = `/blogs/${slug}/#comment-${commentId}`;
      break;

    case "REPLY":
      href = `/blogs/${slug}/#comment-${commentId}`;
      break;
    case "LIKE":
      href = `/blogs/${slug}`;
      break;
    case "FOLLOW":
      href = `/U/${actorId}`;
      break;

    default:
      href = `/blogs/${slug}`;
      break;
  }
  return href;
}

export default selectHref;
