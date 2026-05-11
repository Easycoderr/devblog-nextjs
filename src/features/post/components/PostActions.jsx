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
          className={`${style ? "bg-black/20 !rounded-md hover:bg-black/25" : ""}`}
        >
          <EllipsisVertical className="!size-5" />
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
              <DeleteAlertDialog post={post} userId={user?.id} />
            </DropdownMenuItem>
          </div>
        )}
        <DropdownMenuItem disabled>Report</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PostActions;
