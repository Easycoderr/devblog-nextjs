"use client";
import { likePost } from "@/lib/actions/post/likePost";
import { ThumbsUp } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import type { PostData } from "./CommentSection";

import type { Like } from "@prisma/client";
type LikeButtonProps = {
  post: PostData;
  userId?: string | null;
  totalLikes: number;
  userLike?: Like | null;
};
function LikeButton({ userLike, totalLikes, userId, post }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  async function handleLikePost() {
    if (!userId) {
      toast.error("Register to like and comment on posts.");
    } else {
      startTransition(async () => {
        await likePost(post.id);
      });
    }
  }
  return (
    <div className="flex gap-1 cursor-pointer items-center">
      <button
        disabled={isPending}
        className="cursor-pointer"
        onClick={handleLikePost}
      >
        <ThumbsUp
          className={`${userLike ? "text-primary fill-primary" : "text-muted-foreground"} ${isPending && "opacity-75"} active:scale-105 transition-all duration-200`}
          size={20}
        />
      </button>
      <span className="mt-1 font-medium text-muted-foreground">
        {totalLikes}
      </span>
    </div>
  );
}

export default LikeButton;
