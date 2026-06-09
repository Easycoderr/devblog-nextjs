"use client";
import { Clock, PenLine } from "lucide-react";
import { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import dateCalculation from "@/lib/utils/dateCalculation";
import { toast } from "sonner";
import CommentActions from "./CommentActions";
import Image from "next/image";
import Link from "next/link";

function Comment({
  comment,
  post,
  userId,
  replyedUser,
  replayedUserId,
  depth = 0,
}) {
  const [openReplyField, setOpenReplyField] = useState(false);
  const [repliesNumber, setRepliesNumber] = useState(0);
  const {
    id,
    content,
    replies,
    user,
    userId: commentUserId,
    createdAt,
  } = comment;
  const repliesList = replies.slice(0, repliesNumber);
  const shouldIndent = depth < 3;
  return (
    <div
      className={`p-2 rounded-tr-lg max-w-2xl shadow-sm my-2 rounded-br-lg bg-card ${shouldIndent ? "border-l-2 border-border my-0" : "border-t  border-dashed border-border mt-2 ml-0 pl-1"}`}
    >
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-1 flex-wrap">
            <Name
              avatar={user?.avatar}
              name={user?.name}
              userName={user?.userName}
              isOwner={commentUserId === post?.authorId}
            />

            <span className="text-gray-300 hidden sm:inline">-</span>
            <span>
              <Clock size={13} className="text-muted-foreground" />
            </span>
            <p className="text-xs text-muted-foreground">
              {dateCalculation(createdAt)}
            </p>
            {!shouldIndent && (
              <span className="text-[9px] bg-gray-100 text-muted-foreground px-1 rounded ml-1 font-mono">
                1v1 {depth}
              </span>
            )}
          </div>
          <p className="ml-1 my-1 leading-relaxed text-foreground tracking-tight line-clamp-2 text-pretty break-all">
            {replayedUserId ? (
              <>
                <Link
                  className="text-primary hover:text-primary/70 transition-all duration-200"
                  href={`/u/${user.userName}`}
                >{`@${user.userName}`}</Link>
                <span> </span>
                {content}
              </>
            ) : (
              content
            )}
          </p>
        </div>
        <CommentActions
          setOpenReplyField={setOpenReplyField}
          commentId={id}
          commentUserId={commentUserId}
          userId={userId}
          post={post}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              userId
                ? setOpenReplyField(!openReplyField)
                : toast.info(`Sign in to reply, ${user?.name || "there"}.`)
            }
            aria-label="reply button"
            className="flex gap-0.5 items-center text-xs self-start text-primary font-medium cursor-pointer hover:bg-primary/20 p-1 rounded-md transition-all duration-200"
          >
            Reply
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={"w-4 h-4 -rotate-360 "}
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M14 3v5c-7 0-12 4-13 13 3-5 8-7 13-7v5l9-8-9-8z" />
            </svg>{" "}
          </button>
          {replies.length !== 0 && (
            <button
              onClick={() =>
                setRepliesNumber(
                  replies.length === repliesNumber ? 0 : replies?.length,
                )
              }
              aria-label="show and hide replies"
              className="text-xs self-start text-muted-foreground font-medium cursor-pointer hover:bg-muted-foreground/20 p-1 rounded-md transition-all duration-200"
            >
              {replies.length <= repliesNumber ? "Hide" : "Show"}{" "}
              {replies?.length} replies
            </button>
          )}
        </div>
        {openReplyField && (
          <AddCommentForm
            commentId={id}
            postId={post?.id}
            userId={userId}
            parentId={id}
            openReplyField={openReplyField}
            setOpenReplyField={setOpenReplyField}
            content={openReplyField === "edit" ? content : null}
            placeholder={
              openReplyField === "edit"
                ? "Edit comment"
                : openReplyField && `Reply @${user?.userName}`
            }
          />
        )}
        {replies && replies.length > 0 && (
          <div
            className={`mt-2 ${shouldIndent ? "ml-2 sm:ml-4 border-l border-slate-200 pl-2 sm:pl-3" : "ml-1 pl-1"}`}
          >
            {repliesList.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                replyedUser={user?.userName}
                replayedUserId={commentUserId}
                userId={userId}
                post={post}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
function Name({ avatar, name, userName, isOwner, variant = "default" }) {
  const style = {
    default: "text-sm text-muted-foreground flex items-center gap-1",
    secondary:
      "text-xs text-muted-foreground flex items-center gap-1 transition-all duration-200",
  };
  return (
    <p className={style[variant]}>
      {avatar ? (
        <div className="relative rounded-full h-8 w-8 overflow-hidden border border-border">
          <Image
            fill
            sizes="32px"
            src={avatar}
            className="object-cover"
            alt={`${name}-user`}
            quality={100}
          />
        </div>
      ) : variant !== "secondary" ? (
        <div className="relative flex items-center justify-center rounded-full h-8 w-8 overflow-hidden border text-foreground capitalize border-border">
          <span className="text-bold font-mono text-lg">
            {name[0].toUpperCase()}
          </span>
        </div>
      ) : (
        ""
      )}

      <Link
        href={`/u/${userName}`}
        title={`@${userName}`}
        className="hover:opacity-70 select-none cursor-pointer"
      >
        <span className="capitalize">{name}</span>
      </Link>
      {isOwner && (
        <div className="flex items-center gap-0.5 bg-primary/90 rounded-full px-1 text-xs text-indigo-100">
          <span>
            <PenLine size={12} />
          </span>
          Author
        </div>
      )}
    </p>
  );
}
export default Comment;
