"use client";
import { deleteComment } from "../../../lib/actions/post";
import { toast } from "sonner";
import React, { useTransition } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

function ConfirmDeleteCommentAction({ commentId, userId }) {
  const pathname = usePathname();
  // to navigate page;
  const [isPending, startTransition] = useTransition();
  async function handleDeleteComment() {
    startTransition(async () => {
      const result = await deleteComment(commentId, userId);
      if (result?.success) {
        toast.success("Comment deleted successfully!");
      } else {
        toast.error("There was an error happend while deleting comment");
      }
    });
  }
  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={handleDeleteComment}
    >
      {isPending ? "Deleting..." : "Yes, Delete"}
    </Button>
  );
}

export default ConfirmDeleteCommentAction;
