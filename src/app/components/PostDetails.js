import { Calendar } from "lucide-react";
import Image from "next/image";

function PostDetails({ post }) {
  const {
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
            <span
              className={`${category === "React" ? "text-blue-400" : "text-yellow-500"}`}
            >
              #{category}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="text-green-500" size={17} />
            <span className="text-sm text-gray-400">
              {new Date(date).toLocaleDateString()} • {readTime}
            </span>
          </span>
        </div>
      </div>
      {/* content */}
      <div className="leading-relaxed text-gray-500 md:col-span-2 hyphens-auto text-pretty">
        {content}
      </div>
    </div>
  );
}

export default PostDetails;
