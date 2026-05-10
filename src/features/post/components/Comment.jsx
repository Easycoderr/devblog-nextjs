"use client";
import { Clock, MessageSquare } from "lucide-react";
import { useState } from "react";
import AddCommentForm from "./AddCommentForm";
import dateCalculation from "@/lib/utils/dateCalculation";
import { toast } from "sonner";

function Comment({ comment, postId, userId, replyedUser }) {
  const [openReplyField, setOpenReplyField] = useState(false);
  const [repliesNumber, setRepliesNumber] = useState(0);
  const { id, content, replies, user, createdAt } = comment;
  const repliesList = replies.slice(0, repliesNumber);

  return (
    <div className="p-2 border-l-2 border-gray-300">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center gap-1">
            <p className="text-sm text-gray-500">
              {replyedUser
                ? `${user.name} reply ${replyedUser}`
                : `${user.name}`}
            </p>
            <span className="text-gray-300">-</span>
            <span>
              <Clock size={13} className="text-gray-400" />
            </span>
            <p className="text-xs text-gray-400">
              {dateCalculation(createdAt)}
            </p>
          </div>
          <p className="leading-relaxed tracking-tight">{content}</p>
        </div>
        <MessageSquare size={18} />
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
            postId={postId}
            userId={userId}
            parentId={id}
            placeholder={`Reply to ${user?.name}`}
          />
        )}
        {replies && replies.length > 0 && (
          <div className="flex flex-col gap-2">
            {repliesList.map((reply) => (
              <Comment
                key={reply.id}
                comment={reply}
                replyedUser={user?.name}
                userId={userId}
                postId={postId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
