"use client";
import { ArrowRight, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { likePost } from "../../../lib/actions/post";
import { toast } from "sonner";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";

function PostCardFooter({ post, user, totalShares, totalLikes, userLike }) {
  return (
    <div className="text-sm mt-auto px-3 pb-3">
      <div className="flex justify-between">
        <Link
          href={`/blogs/${post.slug}`}
          className="group font-mono flex text-md items-center gap-0.5 text-gray-800 transition-all duration-200 font-semibold hover:-translate-y-0.5 tracking-wider hover:text-hover"
        >
          Read Article{" "}
          <ArrowRight className="transition duration-200" size={19} />
        </Link>
        {/* like and share */}
        <div className="flex gap-3 items-center place-content-center text-sm">
          <ShareButton
            totalShares={totalShares}
            userId={user?.id}
            postId={post.id}
            slug={post.slug}
            title={post.title}
            text={post.description}
          />
          <LikeButton
            userLike={userLike}
            totalLikes={totalLikes}
            user={user}
            post={post}
          />
        </div>
      </div>
    </div>
  );
}

export default PostCardFooter;
