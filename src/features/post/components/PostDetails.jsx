import dateCalculation from "@/lib/utils/dateCalculation";
import Image from "next/image";
import CommentSection from "./CommentSection";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { Copy } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";
function PostDetails({ post }) {
  const {
    id,
    slug,
    title,
    description,
    content,
    createdAt: date,
    category,
  } = post;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-7">
      <div className="text-text-muted text-xl md:text-2xl mt-7 col-span-2">
        #{slug}
      </div>
      <div className="col-span-2 md:col-span-1">
        <Image
          src={post.imageUrl}
          alt={`${title || "Post"}'s picture`}
          width={1400}
          height={1400}
        />
      </div>
      <div className="space-y-6 col-span-2 md:col-span-1">
        {/* title */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
          {title}
        </h2>
        {/* description */}
        <p className="font-medium leading-relaxed text-gray-500">
          {description}
        </p>
        {/* category + date */}
        <div className="flex items-center gap-3 mt-auto">
          <span className="flex text-sm items-center">
            <span className="flex items-center">
              <span className="text-blue-50 bg-indigo-400 px-2 py-0.5 rounded-full">
                {category}
              </span>
            </span>
          </span>
          <span className="flex items-center gap-1">
            <span className="text-sm text-gray-400">
              {dateCalculation(date)} • {}
            </span>
          </span>
        </div>
      </div>
      <div className="w-full h-0.5 bg-slate-300 col-span-2 rounded-full"></div>
      {/* content */}
      <article
        className="prose prose-pre:bg-transparent
prose-pre:p-0 md:col-span-2 max-w-none prose-lg
    prose-headings:text-black
    prose-p:text-gray-800
    prose-strong:text-black
    prose-li:text-gray-800
   
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
