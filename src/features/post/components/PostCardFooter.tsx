"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";
import { PostCardPostData } from "./PostCard";
import { UserType } from "@/types/userType";

type PostCardFooterProps = {
  post: PostCardPostData;
  user: UserType;
};
function PostCardFooter({ post, user }: PostCardFooterProps) {
  const isLiked = post.likes.length > 0;
  const totalLikes = post._count.likes || 0;
  const totalShares = post._count.shares || 0;
  return (
    <div className="text-sm mt-auto px-3 pb-3">
      <div className="flex justify-between">
        <Link
          href={`/blogs/${post.slug}`}
          className="group font-mono flex text-md items-center gap-0.5 text-foreground transition-all duration-200 font-semibold hover:-translate-y-0.5 tracking-wider hover:text-primary"
        >
          Read Article{" "}
          <ArrowRight className="transition duration-200" size={19} />
        </Link>
        {/* like and share */}
        <div className="flex gap-3 items-center place-content-center text-sm">
          <ShareButton
            postId={post.id}
            totalShares={totalShares}
            slug={post.slug}
            title={post.title}
            text={post.description}
          />
          <LikeButton
            userId={user?.id}
            isLiked={isLiked}
            totalLikes={totalLikes}
            postId={post.id}
          />
        </div>
      </div>
    </div>
  );
}

export default PostCardFooter;
