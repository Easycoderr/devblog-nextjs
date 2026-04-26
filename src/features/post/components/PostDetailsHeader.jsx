"use client";
import { Pencil, Trash2Icon } from "lucide-react";

import Link from "next/link";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ConfirmDeleteAction from "@/features/post/components/ConfirmDeleteAction";
import NavigateBackButton from "../../../components/ui/NavigateBackButton";
import dynamic from "next/dynamic";

const DeleteButton = dynamic(() => import("./DeleteButton"), {
  ssr: false,
  loading: () => <div className="bg-red-100 p-2 rounded-lg w-26 h-10" />,
});

function PostDetailsHeader({ user, post }) {
  return (
    <div className="flex justify-between">
      <NavigateBackButton>Back to blogs</NavigateBackButton>
      {user?.id === post.authorId && (
        <div className="flex gap-2">
          {/* edit */}
          <Link
            href={`/blogs/edit/${post.id}`}
            className="flex gap-2 items-center bg-indigo-100 px-4 py-2 rounded-lg hover:opacity-80 hover:shadow-sm active:scale-103 hover:shadow-indigo-200 transition-all duration-200 "
          >
            <Pencil size={18} className="text-accent" />
            <span className="text-accent font-semibold tracking-wide">
              Edit
            </span>
          </Link>
          {/* delete */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DeleteButton variant="secondary">
                <span className="text-red-500 font-semibold tracking-wide">
                  Delete
                </span>
              </DeleteButton>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm">
              <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                  <Trash2Icon />
                </AlertDialogMedia>
                <AlertDialogTitle>Delete {post.title}?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure? This will permanently delete this post. This
                  action cannot be undone
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                <ConfirmDeleteAction post={post} />
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}

export default PostDetailsHeader;
