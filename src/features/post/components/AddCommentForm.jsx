"use client";
import MiniSpinner from "@/components/ui/MiniSpinner";
import { createComment, updateComment } from "@/lib/actions/post";
import { Send, XIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
function AddCommentForm({
  content: updateContent,
  openReplyField,
  postId,
  userId,
  commentId,
  parentId,
  setOpenReplyField,
  placeholder = "Write your comment...",
}) {
  const [content, setContent] = useState(updateContent || "");
  const [isPending, startTransition] = useTransition();
  async function handleSubmitComment(e) {
    e.preventDefault();
    if (!content || content.trim("") === "") {
      toast.info("Please write your comment");
      return null;
    }
    if (openReplyField !== "edit") {
      startTransition(async () => {
        const result = await createComment(postId, userId, content, parentId);
        if (result.success) {
          toast.success("Comment added");
          if (typeof setOpenReplyField === "function") {
            setOpenReplyField(false);
          }
          setContent("");
        }
      });
    } else {
      startTransition(async () => {
        const result = await updateComment(commentId, content, userId);
        if (result.success) {
          toast.success("Comment updated");
          if (typeof setOpenReplyField === "function") {
            setOpenReplyField(false);
          }
          setContent("");
        }
      });
    }
  }
  return (
    <form onSubmit={handleSubmitComment}>
      <div className="flex gap-1">
        {typeof setOpenReplyField === "function" && (
          <button
            onClick={() => setOpenReplyField(false)}
            className="bg-red-100 rounded-lg flex items-center justify-center px-1 hover:opacity-80 transition-all duration-200 active:scale-105"
          >
            <XIcon className="text-red-500" />
          </button>
        )}
        <div className="relative w-full max-w-2xl">
          <input
            onChange={(e) => setContent(e.target.value)}
            type="text"
            value={content}
            name="comment"
            className="w-full max-w-2xl placeholder:text-sm rounded-lg border-none outline-none ring focus:ring-2 focus:ring-accent p-1 pr-9"
            placeholder={placeholder}
          />
          <button
            disabled={isPending}
            type="submit"
            className={`${isPending && "text-gray-500 cursor-not-allowed"} absolute top-[50%] -translate-y-[50%] right-2 flex items-center hover:text-indigo-400 text-accent transition-all duration-200`}
          >
            {isPending ? <MiniSpinner /> : <Send className="size-6" />}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddCommentForm;
