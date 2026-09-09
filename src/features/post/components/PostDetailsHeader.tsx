import NavigateBackButton from "../../../components/ui/NavigateBackButton";
import PostActions from "./PostActions";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";
import { getLikesByPostId } from "@/lib/actions/post/getLikesByPostId";
import { getSharesByPostId } from "@/lib/actions/post/getSharesByPostId";
import type { UserType } from "@/types/userType";
import type { PostData } from "@/types/postTypes";
type PostDetailsHeaderProps = {
  user: UserType;
  post: PostData;
};
async function PostDetailsHeader({ user, post }: PostDetailsHeaderProps) {
  const [likeResult, shareResult] = await Promise.all([
    getLikesByPostId(post.id),
    getSharesByPostId(post.id),
  ]);
  if (
    !likeResult ||
    !shareResult ||
    !likeResult._count ||
    !shareResult._count
  ) {
    return null;
  }
  const { _count: postLikes, userLike } = likeResult;
  const { _count: postShares } = shareResult;
  return (
    <div className="flex justify-between items-center">
      <NavigateBackButton>Back to blogs</NavigateBackButton>
      <div className="flex items-center gap-8">
        {/* like and share */}
        <div className="flex gap-4">
          <LikeButton
            totalLikes={postLikes.likes}
            userLike={userLike}
            userId={user?.id}
            post={post}
          />
          <ShareButton
            totalShares={postShares.shares}
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
