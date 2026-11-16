import PostCardFooter from "./PostCardFooter";
import dateCalculation from "@/lib/utils/dateCalculation";
import PostCardHeader from "./PostCardHeader";
import PostCardAvatar from "./PostCardAvatar";
import type { UserType } from "@/types/userType";

export type PostCardPostData = {
  id: string;
  createdAt: Date;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  readTime: number;
  imageUrl: string;
  imageId: string;
  authorId: string;

  savedPosts: {
    id: string;
  }[];
  _count: {
    viewLog: number;
    likes?: number;
    shares: number;
  };
  likes: {
    id: string;
  }[];

  author: {
    id: string;
    name: string | null;
    avatar: string | null;
    userName: string;
  };
};
export type PostCardProps = {
  post: PostCardPostData;
  user: UserType | null;
};
function PostCard({ post, user }: PostCardProps) {
  const { readTime, title, createdAt, authorId } = post;
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
          <PostCardAvatar author={post?.author} />
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">
            {dateCalculation(createdAt)} • {readTime} min read
          </span>
        </div>
      </div>
      <PostCardFooter post={post} user={user} />
    </div>
  );
}

export default PostCard;
