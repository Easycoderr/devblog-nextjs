import { getLikesByPostId, getSharesByPostId } from "../../../lib/actions/post";
import PostCardFooter from "./PostCardFooter";
import dateCalculation from "@/lib/utils/dateCalculation";
import PostCardHeader from "./PostCardHeader";

async function PostCard({ post, user }) {
  const [{ _count: postLikes, userLike }, { _count: postShares }] =
    await Promise.all([
      await getLikesByPostId(post.id, user?.id),
      await getSharesByPostId(post.id),
    ]);

  return (
    <div className="group relative flex overflow-hidden transition-all duration-all flex-col gap-3 shadow hover:shadow-lg rounded-lg">
      <PostCardHeader post={post} user={user} />
      {/* content */}
      <div className="flex flex-col gap-2 p-3">
        <h3 className="text-xl mb-1 tracking-tight font-semibold">
          {post.title}
        </h3>

        <div className="flex items-center gap-2">
          <span className="flex text-xs items-center">
            <span className="text-blue-50 bg-indigo-400 px-2 py-0.5 rounded-full">
              {post.category}
            </span>
          </span>
          <span className="flex items-center gap-1">
            {/* <Calendar className="text-green-500" size={17} /> */}
            <span className="text-xs text-gray-400 mt-1">
              {dateCalculation(post.createdAt)} • {post.readTime} min read
            </span>
          </span>
        </div>
        {/* description */}
        <p className="text-sm text-slate-600">
          {post.description.slice(0, 80)}...
        </p>
      </div>
      <PostCardFooter
        totalShares={postShares.shares}
        post={post}
        userLike={userLike}
        totalLikes={postLikes.likes}
        user={user}
      />
    </div>
  );
}

export default PostCard;
