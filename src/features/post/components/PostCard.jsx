import Image from "next/image";
import { Calendar } from "lucide-react";

import PostActions from "./PostActions";
import { getLikesByPostId } from "../../../lib/actions/post";
import PostCardFooter from "./PostCardFooter";

async function PostCard({ post, user }) {
  const postLikes = await getLikesByPostId(post.id, user?.id);
  const { _count, userLike } = postLikes;

  return (
    <div className="group relative flex overflow-hidden transition-all duration-all flex-col gap-4 shadow hover:shadow-lg rounded-lg">
      {/* image */}
      <Image
        className="bg-contain object-cover"
        src="/images/img1.png"
        width={1000}
        height={1000}
        alt={"react"}
      />
      {/* post actions */}
      <PostActions user={user} post={post} />
      {/* content */}
      <div className="flex flex-col gap-2 p-3">
        <h3 className="text-xl mb-1 tracking-tight font-semibold">
          {post.title}
        </h3>
        {/* description */}
        <div className="flex items-center gap-3">
          <span className="flex text-xs items-center">
            <span className="text-blue-50 bg-indigo-400 px-2 py-0.5 rounded-full">
              {post.category}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="text-green-500" size={17} />
            <span className="text-xs text-gray-400 mt-1">
              {new Date(post.createdAt).toLocaleDateString()} • {post.readTime}{" "}
              min read
            </span>
          </span>
        </div>
        <p className="text-sm text-slate-600">
          {post.description.slice(0, 80)}...
        </p>
      </div>
      <PostCardFooter
        post={post}
        userLike={userLike}
        totalLikes={_count.likes}
        user={user}
      />
    </div>
  );
}

export default PostCard;
