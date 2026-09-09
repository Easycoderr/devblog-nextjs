"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";
import { PostCardPostData } from "./PostCard";
import { UserType } from "@/types/userType";
import { Like } from "@prisma/client";
type PostCardFooterProps = {
  post: PostCardPostData;
  user: UserType;
  totalShares: number;
  totalLikes: number;
  userLike?: Like | null;
};
function PostCardFooter({
  post,
  user,
  totalShares,
  totalLikes,
  userLike,
}: PostCardFooterProps) {
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
            totalShares={totalShares}
            postId={post.id}
            slug={post.slug}
            title={post.title}
            text={post.description}
          />
          <LikeButton
            userLike={userLike}
            totalLikes={totalLikes}
            userId={user?.id}
            post={post}
          />
        </div>
      </div>
    </div>
  );
}

export default PostCardFooter;
