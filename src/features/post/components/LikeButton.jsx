"use client";
import { likePost } from "@/lib/actions/post";
import { ThumbsUp } from "lucide-react";
import { toast } from "sonner";

function LikeButton({ userLike, totalLikes, user, post }) {
  async function handleLikePost() {
    if (!user) {
      toast.error("Register to like and comment on posts.");
    } else {
      await likePost(post.id, user?.id);
    }
  }
  return (
    <button className="flex gap-1 items-center" onClick={handleLikePost}>
      <ThumbsUp
        className={`${userLike ? "text-indigo-400" : "text-slate-500"} active:scale-105 transition-all duration-200`}
        size={20}
        fill={`${userLike ? "#6366f1" : "none"}`}

        // fill="rgb(59 130 246 / var(--tw-text-opacity, 1))"
      />
      <span className="mt-1 font-medium text-text-muted">{totalLikes}</span>
    </button>
  );
}

export default LikeButton;
