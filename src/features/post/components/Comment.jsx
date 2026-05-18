"use client";
import { Clock } from "lucide-react";
import { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import dateCalculation from "@/lib/utils/dateCalculation";
import { toast } from "sonner";
import CommentActions from "./CommentActions";
import Image from "next/image";

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
      className={`p-2 ${shouldIndent ? "border-l-2 border-gray-300" : "border-t  border-dashed border-gray-200 mt-2 ml-0-pl-1"}`}
    >
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-1 flex-wrap">
            {replyedUser ? (
              <>
                <Name
                  avatar={user?.avatar}
                  name={user?.name}
                  isOwner={commentUserId === post?.authorId}
                />
                <span className="text-xs">reply</span>
                <Name
                  name={replyedUser}
                  isOwner={replayedUserId === post?.authorId}
                  variant="secondary"
                />
              </>
            ) : (
              <Name
                avatar={user?.avatar}
                name={user?.name}
                isOwner={commentUserId === post?.authorId}
              />
            )}
            <span className="text-gray-300 hidden sm:inline">-</span>
            <span>
              <Clock size={13} className="text-gray-400" />
            </span>
            <p className="text-xs text-gray-400">
              {dateCalculation(createdAt)}
            </p>
            {!shouldIndent && (
              <span className="text-[9px] bg-gray-100 text-gray-500 px-1 rounded ml-1 font-mono">
                1v1 {depth}
              </span>
            )}
          </div>
          <p className="leading-relaxed tracking-tight">{content}</p>
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
            className="flex gap-0.5 items-center text-xs self-start text-accent font-medium cursor-pointer hover:bg-indigo-100 p-1 rounded-md transition-all duration-200"
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
              className="text-xs self-start text-gray-500 font-medium cursor-pointer hover:bg-gray-100 p-1 rounded-md transition-all duration-200"
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
                : openReplyField && `Reply to ${user?.name}`
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
                replyedUser={user?.name}
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
function Name({ name, isOwner, variant = "default" }) {
  const style = {
    default: "text-sm text-gray-500 flex items-center gap-1",
    secondary: "text-xs text-gray-500 flex items-center gap-1",
  };
  return (
    <p className={style[variant]}>
      {avatar && (
        <Image
          width={25}
          height={25}
          className="rounded-full border border-gray-500"
          src={avatar}
          alt={`${name}-user`}
        />
      )}
      <span>{name}</span>
      {isOwner && (
        <span className="bg-accent/80 rounded-full px-1.5 text-xs text-indigo-100">
          Owner
        </span>
      )}
    </p>
  );
}
export default Comment;
