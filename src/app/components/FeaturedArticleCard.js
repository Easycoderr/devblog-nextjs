import { ArrowRight, Calendar, Eye, Flame } from "lucide-react";
import Link from "next/link";
function ArticleCard({ article }) {
  const { title, description, content, date, category, readTime } = article;
  return (
    <div className="relative flex flex-col gap-10 shadow-sm bg-gray-50 rounded-xl py-8 px-5">
      {/* head */}
      <div className="absolute flex items-center top-2 text-bold font-sora text-xs px-2 py-1 rounded-full bg-amber-500/80">
        <span>
          <Flame size={18} className="text-amber-800 mb-0.5" />
        </span>
        <span className="text-amber-100">Featured</span>
      </div>
      <div className="space-y-4">
        {/* header */}
        <h3 className="text-2xl font-sora font-semibold tracking-tight mt-3">
          {title}
        </h3>
        {/* description */}
        <p className="leading-relaxed text-sm text-muted hyphens-auto text-pretty">
          {description}
        </p>
      </div>
      {/* card body content */}
      <div className="flex flex-col gap-14 mt-auto">
        {/* <p className="text-gray-600 text-sm leading-relaxed tracking-normal text-justify hyphens-auto text-pretty">
          {content}
        </p> */}
        <div className="flex flex-col gap-4 text-sm mt-auto">
          <div className="flex items-center gap-3">
            <span className="flex text-xs items-center">
              <span
                className={`${category === "React" ? "text-blue-400" : "text-yellow-500"}`}
              >
                #{category}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="text-green-500" size={17} />
              <span className="text-xs text-gray-400 mt-1">
                {date} • {readTime} min read
              </span>
            </span>
          </div>
          <div className="flex">
            <Link
              href="/"
              className="group flex text-md items-center gap-2 bg-accent px-3 py-1.5 rounded-full text-gray-50 transition-all duration-200 active:scale-105 hover:bg-hover"
            >
              See Article{" "}
              <ArrowRight className="group-hover:translate-x-0.5 transition duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
