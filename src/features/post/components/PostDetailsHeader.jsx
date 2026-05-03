import NavigateBackButton from "../../../components/ui/NavigateBackButton";
import PostActions from "./PostActions";
import ShareButton from "./ShareButton";
import { getLikesByPostId, getSharesByPostId } from "@/lib/actions/post";
import LikeButton from "./LikeButton";

async function PostDetailsHeader({ user, post }) {
  const [{ _count: postLikes, userLike }, { _count: postShares }] =
    await Promise.all([
      await getLikesByPostId(post.id, user?.id),
      await getSharesByPostId(post.id),
    ]);
  return (
    <div className="flex justify-between items-center">
      <NavigateBackButton>Back to blogs</NavigateBackButton>
      <div className="flex items-center gap-8">
        {/* like and share */}
        <div className="flex gap-4">
          <LikeButton
            totalLikes={postLikes.likes}
            userLike={userLike}
            user={user}
            post={post}
          />
          <ShareButton
            totalShares={postShares.shares}
            userId={user?.id}
            postId={post.id}
            slug={post.slug}
            title={post.title}
            text={post.description}
          />
        </div>
        <div className="flex gap-2">
          <PostActions post={post} user={user} style={true} />
        </div>
      </div>
    </div>
  );
}

export default PostDetailsHeader;
