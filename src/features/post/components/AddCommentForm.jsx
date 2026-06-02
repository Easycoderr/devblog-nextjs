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
            className="bg-destructive/20 cursor-pointer self-start rounded-lg flex items-center justify-center px-1 py-1 hover:opacity-80 transition-all duration-200 active:scale-105"
          >
            <XIcon className="text-destructive" />
          </button>
        )}
        <div className="relative w-full max-w-2xl">
          <textarea
            onChange={(e) => setContent(e.target.value)}
            type="text"
            value={content}
            name="comment"
            className="w-full max-w-2xl placeholder:text-sm rounded-lg border-border bg-input outline-none focus:ring focus:ring-ring p-2 pr-19"
            placeholder={placeholder}
          />
          <button
            disabled={isPending}
            type="submit"
            className={`${isPending && "text-mutedforeground cursor-not-allowed"} cursor-pointer absolute top-2 right-2 flex items-center hover:opacity-70 rounded px-2 py-1.5 text-primary-foreground bg-primary transition-all duration-200`}
          >
            {isPending ? (
              <MiniSpinner />
            ) : (
              <span className="flex gap-1 text-sm hover:">
                <span className="tracking-wider font-medium">Send</span>
                <Send className="size-5" />
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddCommentForm;
