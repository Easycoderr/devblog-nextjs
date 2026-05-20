"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import DeleteAlertDialog from "./DeleteAlertDialog";
import { useTransition } from "react";
import ConfirmDeleteCommentAction from "./ConfirmDeleteCommentAction";

function CommentActions({
  setOpenReplyField,
  commentId,
  commentUserId,
  userId,
  post,
  style,
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={`${commentId ? "simple" : "icon"}`} size="icon">
          <EllipsisVertical className="!size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Display edit/delete options only if the current user is the owener of comment */}
        {userId === commentUserId && (
          <div>
            {/* edit */}
            <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
              <button
                onClick={() =>
                  setOpenReplyField((reply) => (reply ? false : "edit"))
                }
                className="flex gap-1 w-full group-data-[highlighted]/dropdown-menu-item:text-indigo-50 hover:cursor-default"
              >
                Edit
              </button>
            </DropdownMenuItem>
            {/* delete */}
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteAlertDialog
                post={post}
                userId={userId}
                title="Comment"
                message="Are you sure? This will permanently delete this comment. This action
            cannot be undone"
              >
                <ConfirmDeleteCommentAction
                  post={post}
                  userId={userId}
                  commentId={commentId}
                />
              </DeleteAlertDialog>
            </DropdownMenuItem>
          </div>
        )}
        <DropdownMenuItem disabled>Report</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CommentActions;
