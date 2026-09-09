import UserAvatar from "@/components/ui/UserAvatar";
import getAuthorById from "@/lib/actions/post/getAuthorById";

async function PostCardAvatar({ authorId }: { authorId: string }) {
  const author = await getAuthorById(authorId);
  if (!author) return null;
  return (
    <div className="text-foreground">
      <UserAvatar user={author} />
    </div>
  );
}

export default PostCardAvatar;
