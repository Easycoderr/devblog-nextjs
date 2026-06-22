"use client";
import { likePost } from "@/lib/actions/post";
import { ThumbsUp } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

function LikeButton({ userLike, totalLikes, user, post }) {
  const [isPending, startTranstion] = useTransition();
  async function handleLikePost() {
    if (!user) {
      toast.error("Register to like and comment on posts.");
    } else {
      startTranstion(async () => {
        await likePost(post.id, user?.id);
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
