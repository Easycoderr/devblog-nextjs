import UserAvatar from "@/components/ui/UserAvatar";
import { getUserById } from "@/lib/getUser";

async function PostCardAvatar({ post }) {
  const author = await getUserById(post?.authorId);
  return (
    <div className="text-foreground">
      <UserAvatar user={author} />
    </div>
  );
}

export default PostCardAvatar;
