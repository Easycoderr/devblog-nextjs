import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
function ArticleCard({ post }) {
  return (
    <div className="flex overflow-hidden hover:scale-103 transition-all duration-all flex-col gap-4 shadow hover:shadow-lg rounded-lg">
      {/* image */}
      <Image
        className="bg-contain"
        src="/images/img1.png"
        width={1000}
        height={1000}
        alt={"react"}
      />
      {/* content */}
      <div className="space-y-3 p-3 mt-auto">
        <h3 className="text-xl tracking-tight font-semibold">{post.title}</h3>
        {/* description */}
        <p className="text-sm text-muted">{post.description.slice(0, 80)}...</p>
        <div className="flex flex-col gap-4 text-sm mt-auto">
          <div className="flex items-center gap-3">
            <span className="flex text-xs items-center">
              <span
                className={`${post.category === "React" ? "text-blue-400" : "text-yellow-500"}`}
              >
                #{post.category}
              </span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="text-green-500" size={17} />
              <span className="text-xs text-gray-400 mt-1">
                {post.date} • {post.readTime} min read
              </span>
            </span>
          </div>
          <div className="flex">
            <Link
              href="blogs/3"
              className="group flex text-md items-center gap-2 bg-accent px-3 py-1.5 rounded-full text-gray-50 transition-all duration-200 active:scale-105 hover:bg-hover"
            >
              Read Article{" "}
              <ArrowRight className="group-hover:translate-x-0.5 transition duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
