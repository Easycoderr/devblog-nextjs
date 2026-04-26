"use client";

import { ArrowRight, LucideShare2, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { likePost } from "../../../lib/actions/post";
import { toast } from "sonner";

function PostCardFooter({ post, user, totalLikes, userLike }) {
  async function handleLikePost() {
    if (!user) {
      toast.error("Register to like and comment on posts.");
    } else {
      await likePost(post.id, user?.id);
    }
  }
  return (
    <div className="flex flex-col gap-4 text-sm mt-auto">
      <div className="flex justify-between">
        <Link
          href={`/blogs/${post.slug}`}
          className="group flex text-md items-center gap-2 bg-accent px-3 py-1.5 rounded-full text-gray-50 transition-all duration-200 active:scale-105 hover:bg-hover"
        >
          Read Article <ArrowRight className="transition duration-200" />
        </Link>
        {/* like and share */}
        <div className="flex gap-3 items-center place-content-center text-sm">
          <button className="mt-0.5 flex gap-1 items-center">
            <LucideShare2 size={20} className="text-slate-500" />
            <span className="mt-0.5 font-medium text-text-muted">10</span>
          </button>
          <button className="flex gap-1 items-center" onClick={handleLikePost}>
            <ThumbsUp
              className={`${userLike ? "text-indigo-400" : "text-slate-500"} active:scale-105 transition-all duration-200`}
              size={20}
              fill={`${userLike ? "#6366f1" : "none"}`}

              // fill="rgb(59 130 246 / var(--tw-text-opacity, 1))"
            />
            <span className="mt-1 font-medium text-text-muted">
              {totalLikes}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCardFooter;
