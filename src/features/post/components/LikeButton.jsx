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
    <button
      disabled={isPending}
      className="flex gap-1 items-center"
      onClick={handleLikePost}
    >
      <ThumbsUp
        className={`${userLike ? "text-indigo-400" : "text-slate-500"} ${isPending && "opacity-75"} active:scale-105 transition-all duration-200`}
        size={20}
        fill={`${userLike ? "#6366f1" : "none"}`}

        // fill="rgb(59 130 246 / var(--tw-text-opacity, 1))"
      />
      <span className="mt-1 font-medium text-text-muted">{totalLikes}</span>
    </button>
  );
}

export default LikeButton;
