import dateCalculation from "@/lib/utils/dateCalculation";
import Image from "next/image";
import CommentSection from "./CommentSection";
import MarkdownRenderer from "./MarkdownRenderer";
import PostCardAvatar from "./PostCardAvatar";
import categoryColorPicker from "@/lib/utils/categoryColorPicker";
import { Eye } from "lucide-react";
import { Prisma } from "@prisma/client";
export type PostDetailsData = Prisma.PostGetPayload<{
  include: {
    savedPosts: true;
    _count: { select: { viewLog: true; likes: true } };
  };
}>;
function PostDetails({ post }: { post: PostDetailsData }) {
  const {
    title,
    description,
    content,
    createdAt: date,
    category,
    readTime,
    _count,
    authorId,
    imageUrl,
  } = post;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7">
      <div className="space-y-6 col-span-2">
        <div className="mb-4">
          <span
            className={`${categoryColorPicker(category)} px-2 py-1 rounded-full font-medium tracking-wider capitalize`}
          >
            {category}
          </span>
        </div>
        {/* title */}
        <h2 className="text-3xl text-foreground md:text-4xl font-bold tracking-tight mb-3 max-w-xl wrap-break-word">
          {title}
        </h2>
        {/* description */}
        <p className="font-medium leading-relaxed text-muted-foreground max-w-xl wrap-break-word">
          {description}
        </p>
        {/* category + date */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 mt-auto">
            <PostCardAvatar authorId={authorId} />
            <span className="text-sm text-muted-foreground"> •</span>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <span>{dateCalculation(date)}</span>
              <span>•</span>
              <span className="mt-0.5">{readTime} min read</span>
            </p>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Eye className="size-5" />
              <span>{_count.viewLog}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative col-span-2 h-116 w-full rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${title || "Post"}'s picture`}
          sizes="464px"
          fill
          className="object-cover"
        />
      </div>

      <div className="w-full h-0.5 bg-border col-span-2 rounded-full"></div>
      {/* content */}
      <article
        className="
        break-all
        text-pretty
        prose prose-pre:bg-transparent
prose-pre:p-0 md:col-span-2 max-w-none prose-lg
    prose-headings:text-foreground
    prose-p:text-muted-foreground
    prose-strong:text-foreground
    prose-li:text-muted-foreground
  "
      >
        <MarkdownRenderer content={content} />
      </article>
      {/* comments */}
      <CommentSection post={post} />
    </div>
  );
}

export default PostDetails;
