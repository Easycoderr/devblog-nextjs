import UserAvatar from "@/components/ui/UserAvatar";
type PostCardAvatarProps = {
  author: {
    id: string;
    name: string | null;
    avatar: string | null;
    userName: string;
  };
  size?: string;
};
async function PostCardAvatar({ size, author }: PostCardAvatarProps) {
  return (
    <div className="text-foreground">
      <UserAvatar user={author} size={size} />
    </div>
  );
}

export default PostCardAvatar;
