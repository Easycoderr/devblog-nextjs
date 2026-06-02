import dateCalculation from "@/lib/utils/dateCalculation";
import Image from "next/image";
import CommentSection from "./CommentSection";
import MarkdownRenderer from "./MarkdownRenderer";
import PostCardAvatar from "./PostCardAvatar";
import categoryColorPicker from "@/lib/utils/categoryColorPicker";
function PostDetails({ post }) {
  const {
    id,
    slug,
    title,
    description,
    content,
    createdAt: date,
    category,
    readTime,
  } = post;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7">
      <div className="space-y-6 col-span-2">
        <div className="text-sm mb-4">
          <span
            className={`${categoryColorPicker(category)} px-2 pb-0.5 rounded-full`}
          >
            {category}
          </span>
        </div>
        {/* title */}
        <h2 className="text-3xl text-foreground md:text-4xl font-bold tracking-tight mb-3 max-w-xl break-words">
          {title}
        </h2>
        {/* description */}
        <p className="font-medium leading-relaxed text-muted-foreground max-w-xl break-words">
          {description}
        </p>
        {/* category + date */}
        <div className="flex items-center gap-3 mt-auto">
          <PostCardAvatar post={post} />
          <span className="text-sm text-muted-foreground"> •</span>
          <span className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">
              {dateCalculation(date)} • {readTime} min read
            </span>
          </span>
        </div>
      </div>
      <div className="relative col-span-2 h-[29rem] w-full rounded-xl overflow-hidden">
        <Image
          src={post.imageUrl}
          alt={`${title || "Post"}'s picture`}
          sizes="464px"
          fill
          className="object-cover"
          quality={90}
        />
      </div>

      <div className="w-full h-0.5 bg-border col-span-2 rounded-full"></div>
      {/* content */}
      <article
        className="prose prose-pre:bg-transparent
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
