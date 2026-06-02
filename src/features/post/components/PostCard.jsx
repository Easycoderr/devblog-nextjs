import { getLikesByPostId, getSharesByPostId } from "../../../lib/actions/post";
import PostCardFooter from "./PostCardFooter";
import dateCalculation from "@/lib/utils/dateCalculation";
import PostCardHeader from "./PostCardHeader";
import PostCardAvatar from "./PostCardAvatar";

async function PostCard({ post, user }) {
  const [{ _count: postLikes, userLike }, { _count: postShares }] =
    await Promise.all([
      await getLikesByPostId(post.id, user?.id),
      await getSharesByPostId(post.id),
    ]);
  const { readTime, title, createdAt } = post;
  const description = post.description.slice(0, 80);
  return (
    <div className="group relative grid grid-rows-[auto_auto_1fr_auto_auto] overflow-hidden transition-all duration-all flex-col gap-2 bg-card shadow hover:shadow-lg rounded-lg">
      <PostCardHeader post={post} user={user} />

      {/* title */}
      <h3 className="text-xl text-foreground mb-1 tracking-tight font-semibold px-3">
        {title}
      </h3>
      {/* descriptoin */}
      <p className="text-sm text-muted-foreground line-clamp-2 px-3">
        {description}...
      </p>

      <div className="space-y-2 mt-auto px-3">
        <div className="flex flex-wrap items-center gap-1">
          {/* <Calendar className="text-green-500" size={17} /> */}
          <PostCardAvatar post={post} />
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">
            {dateCalculation(createdAt)} • {readTime} min read
          </span>
        </div>
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
