import NavigateBackButton from "../../../components/ui/NavigateBackButton";
import PostActions from "./PostActions";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";
import type { UserType } from "@/types/userType";
import type { PostDetailsData } from "./PostDetails";
type PostDetailsHeaderProps = {
  user: UserType;
  post: PostDetailsData;
};
async function PostDetailsHeader({ user, post }: PostDetailsHeaderProps) {
  const isLiked = post.likes.length > 0;
  const totalLikes = post._count.likes || 0;
  const totalShares = post._count.shares || 0;
  return (
    <div className="flex justify-between items-center">
      <NavigateBackButton>Back to blogs</NavigateBackButton>
      <div className="flex items-center gap-8">
        {/* like and share */}
        <div className="flex gap-4">
          <LikeButton
            totalLikes={totalLikes}
            isLiked={isLiked}
            userId={user?.id}
            postId={post.id}
          />
          <ShareButton
            totalShares={totalShares}
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
