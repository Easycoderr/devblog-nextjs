import dateCalculation from "@/lib/utils/dateCalculation";

import Image from "next/image";
import CommentSection from "./CommentSection";

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-7">
      <div className="text-text-muted text-xl md:text-2xl mt-7 col-span-2">
        #{slug}
      </div>
      <div className="col-span-2 md:col-span-1">
        <Image
          src="/images/img1.png"
          alt="item image"
          width={1400}
          height={1400}
        />
      </div>
      <div className="space-y-6 col-span-2 md:col-span-1">
        {/* title */}
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
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
              {dateCalculation(date)} • {readTime}
            </span>
          </span>
        </div>
      </div>
      <div className="w-full h-0.5 bg-slate-300 col-span-2 rounded-full"></div>
      {/* content */}
      <div className="leading-relaxed text-gray-500 md:col-span-2 hyphens-auto text-pretty">
        {content}
      </div>
      {/* comments */}
      <CommentSection post={post} />
    </div>
  );
}

export default PostDetails;
