import { getUserById } from "@/lib/getUser";
import dateCalculation from "@/lib/utils/dateCalculation";
import { ArrowRight, Calendar, Eye, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function FeaturedPostCard({ post }) {
  const {
    slug,
    title,
    description,
    createdAt: date,
    category,
    // readTime,
    authorId,
  } = post;
  const author = await getUserById(authorId);
  return (
    <>
      <div className="relative flex flex-col gap-10 shadow-sm bg-gray-50 rounded-xl py-8 px-5">
        {/* head */}
        <div className="absolute flex items-center top-2 text-bold font-sora text-xs px-2 py-1 rounded-full bg-amber-100">
          <span>
            <Flame size={18} className="text-amber-800 mb-0.5" />
          </span>
          <span className="text-amber-800 uppercase mt-0.5">Featured</span>
        </div>
        <div className="space-y-4">
          {/* header */}
          <h3 className="text-4xl font-sora font-semibold tracking-tight mt-3">
            {title}
          </h3>
          {/* description */}
          <p className="leading-relaxed text-lg text-gray-500 hyphens-auto text-pretty">
            {description.split(" ").slice(0, 40).join(" ")}
          </p>
        </div>
        {/* card body content */}
        <div className="flex flex-col gap-14 mt-auto">
          {/* <p className="text-gray-600 text-sm leading-relaxed tracking-normal text-justify hyphens-auto text-pretty">
          {content}
          </p> */}
          <div className="flex flex-col gap-6 text-sm mt-auto">
            <div className="flex items-center gap-3">
              <div className="relative rounded-full h-9 w-9 overflow-hidden border border-gray-500">
                <Image
                  fill
                  sizes="36px"
                  src={author?.avatar}
                  className="object-cover"
                  alt={`${author?.name}-user`}
                  quality={100}
                />
              </div>
              <span className="flex flex-col">
                <span className="font-semibold">{author?.name}</span>
                <span className="text-gray-400">
                  {dateCalculation(date)} • {3} min read
                </span>
              </span>
            </div>
            <div className="flex">
              <Link
                href={`/blogs/${slug}`}
                className="group flex font-bold tracking-wider text-md items-center gap-1 text-indigo-500 hover:text-indigo-600 transition-all duration-200"
              >
                Read Article{" "}
                <ArrowRight className="group-hover:translate-x-0.5 transition duration-200" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeaturedPostCard;
