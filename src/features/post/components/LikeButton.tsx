"use client";
import { likePost } from "@/lib/actions/post/likePost";
import { ThumbsUp } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type LikeButtonProps = {
  isLiked: boolean;
  postId: string;
  totalLikes: number;
  userId?: string | null;
};
function LikeButton({ userId, postId, totalLikes, isLiked }: LikeButtonProps) {
  const [isPending, startTransition] = useTransition();
  async function handleLikePost() {
    if (!userId) {
      toast.error("Register to like and comment on posts.");
    } else {
      console.log("USER ID:", userId);
      console.log("POST ID:", postId);
      startTransition(async () => {
        await likePost(postId);
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
          className={`${isLiked ? "text-primary fill-primary" : "text-muted-foreground"} ${isPending && "opacity-75"} active:scale-105 transition-all duration-200`}
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
