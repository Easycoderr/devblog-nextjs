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
function PostActions({ user, post }) {
  return (
    <div className="absolute top-0 right-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="icon">
            <EllipsisVertical size={30} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem>Save for later</DropdownMenuItem>
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
                <DeleteAlertDialog post={post} />
              </DropdownMenuItem>
            </div>
          )}
          <DropdownMenuItem disabled>Report</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default PostActions;
