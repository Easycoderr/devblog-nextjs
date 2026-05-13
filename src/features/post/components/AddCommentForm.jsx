"use client";
import { Button } from "@/components/ui/button";
import { createComment } from "@/lib/actions/post";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
function AddCommentForm({
  postId,
  userId,
  parentId,
  setOpenReplyField,
  placeholder = "Write your comment...",
}) {
  const [content, setContent] = useState("");
  console.log(content);
  async function handleAddComment(e) {
    e.preventDefault();
    if (!content || content.trim("") === "") {
      toast.info("Please write your comment");
      return null;
    }
    const result = await createComment(postId, userId, content, parentId);
    if (result.success) {
      toast.success("Comment added");
      if (typeof setOpenReplyField === "function") {
        setOpenReplyField(false);
      }
      setContent("");
    }
  }
  return (
    <form onSubmit={handleAddComment}>
      <div className="flex gap-1">
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
