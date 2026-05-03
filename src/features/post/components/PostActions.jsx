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
function PostActions({ user, post, style }) {
  const { savedPosts } = post;
  async function handleSavePost() {
    savePost(post.id, user?.id);
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
            disabled={!user}
            asChild
            onSelect={(e) => e.preventDefault()}
          >
            <button onClick={handleSavePost} className="w-full">
              {!user ? "Save" : savedPosts?.length !== 0 ? "Unsave" : "Save"}
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
