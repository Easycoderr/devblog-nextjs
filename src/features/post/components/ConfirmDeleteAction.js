"use client";
import { deletePost } from "../../../lib/actions/post";
import { toast } from "sonner";
import React, { useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

function ConfirmDeleteAction({ post }) {
  const pathname = usePathname();
  // to navigate page
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  async function handleDeletePost() {
    startTransition(async () => {
      const result = await deletePost(post?.id);
      if (result?.success) {
        toast.success(`${post?.title} deleted successfully!`);
        router.push(`${pathname === "/" ? "/" : "/blogs"}`);
      } else {
        toast.error(`There was an error happend while deleting ${post.title}`);
      }
    });
  }
  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={handleDeletePost}
    >
      {" "}
      {isPending ? "Deleting..." : "Yes, Delete"}
    </Button>
  );
}

export default ConfirmDeleteAction;
