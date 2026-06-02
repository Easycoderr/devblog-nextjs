"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import DeleteAlertDialog from "./DeleteAlertDialog";
import { savePost } from "@/lib/actions/post";
import { toast } from "sonner";
import { useTransition } from "react";
import ConfirmDeletePostAction from "./ConfirmDeletePostAction";

function PostActions({ user, post, style }) {
  const [isPending, startTransition] = useTransition();
  const { savedPosts } = post;
  function handleSavePost() {
    startTransition(async () => {
      await savePost(post, user?.id);
    });
    if (!user?.id) toast.info(`Sign in to save ${post.title} post.`);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="icon"
          size="icon"
          className={`${style ? "bg-card text-foreground !rounded-md hover:bg-gray-500" : ""}`}
        >
          <EllipsisVertical
            className={`${style ? "!text-foreground" : "text-black"} !size-5`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem
            disabled={!user || isPending}
            asChild
            onSelect={(e) => e.preventDefault()}
          >
            <button onClick={handleSavePost} className="w-full">
              {!user
                ? "Save"
                : isPending
                  ? "Updating..."
                  : savedPosts?.length !== 0
                    ? "Unsave"
                    : "Save"}
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* Display edit/delete options only if the current user is the author */}
        {user?.id === post.authorId && (
          <div>
            {/* edit */}
            <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
              <Link
                href={`/blogs/edit/${post.id}`}
                className="flex gap-1 w-full group-data-[highlighted]/dropdown-menu-item:text-indigo-50 hover:cursor-default"
              >
                Edit
              </Link>
            </DropdownMenuItem>
            {/* delete */}
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteAlertDialog
                post={post}
                title={post?.title}
                message="Are you sure? This will permanently delete this post. This action
            cannot be undone"
                userId={user?.id}
              >
                <ConfirmDeletePostAction post={post} userId={user?.id} />
              </DeleteAlertDialog>
            </DropdownMenuItem>
          </div>
        )}
        <DropdownMenuItem disabled>Report</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PostActions;
