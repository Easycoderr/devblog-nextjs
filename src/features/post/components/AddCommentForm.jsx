"use client";
import { Button } from "@/components/ui/button";
import { createComment, updateComment } from "@/lib/actions/post";
import { Send, XIcon } from "lucide-react";
import { useState } from "react";
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

  async function handleSubmitComment(e) {
    e.preventDefault();
    if (!content || content.trim("") === "") {
      toast.info("Please write your comment");
      return null;
    }
    if (openReplyField !== "edit") {
      const result = await createComment(postId, userId, content, parentId);
      if (result.success) {
        toast.success("Comment added");
        if (typeof setOpenReplyField === "function") {
          setOpenReplyField(false);
        }
        setContent("");
      }
    } else {
      const result = await updateComment(commentId, content, userId);
      if (result.success) {
        toast.success("Comment updated");
        if (typeof setOpenReplyField === "function") {
          setOpenReplyField(false);
        }
        setContent("");
      }
    }
  }
  return (
    <form onSubmit={handleSubmitComment}>
      <div className="flex gap-1">
        {typeof setOpenReplyField === "function" && (
          <button
            onClick={() => setOpenReplyField(false)}
            className="bg-red-200 rounded-lg flex items-center justify-center px-1"
          >
            <XIcon className="text-red-600" />
          </button>
        )}
        <input
          onChange={(e) => setContent(e.target.value)}
          type="text"
          value={content}
          name="comment"
          className="w-full max-w-2xl placeholder:text-sm rounded-lg border-none outline-none ring focus:ring-2 focus:ring-accent p-1 "
          placeholder={placeholder}
        />
        <Button variant="icon" type="submit">
          <Send className="size-6" />
        </Button>
      </div>
    </form>
  );
}

export default AddCommentForm;
