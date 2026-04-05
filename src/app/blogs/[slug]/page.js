import {
  ArrowBigLeft,
  ArrowLeftCircleIcon,
  ArrowRight,
  Calendar,
  Flame,
  Link,
} from "lucide-react";
import Image from "next/image";
export const posts = {
  id: 1,
  slug: "mastering-react-query",
  title: "Mastering React Query for Scalable Apps",
  description:
    "Learn how to manage server state efficiently with React Query and build scalable frontend applications.",
  content: `
React Query is a powerful library for managing server state in React applications.

In this article, we explore:
- Fetching data
- Caching
- Mutations
- Optimistic updates

By the end, you will understand how to build fast and reliable apps.
    `,
  category: "React",
  date: "2026-01-10",
  readTime: "6 min read",
  isFeatured: true,
};
function page() {
  const { title, description, slug, content, date, category, readTime } = posts;
  return (
    <div className="h-screen">
      <div className="container 2xl:px-10 px-2 py-10 mx-auto">
        <div className="">
          <div className="flex flex-col gap-6">
            <div>
              <button className="flex tracking-wider items-center rounded-full gap-1 hover:opacity-90 hover:bg-hover active:opacity-100 active:scale-103 px-3 py-1.5 bg-black/80 text-gray-50 transition-all duration-200">
                <ArrowLeftCircleIcon size={23} />
                <span>Back to blogs</span>
              </button>
            </div>
            {/* article slug */}
            <div className="text-muted text-xl md:text-2xl mt-7">#{slug}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-7">
              <div className="rounded-tl-full">
                <Image
                  src="/images/img1.png"
                  alt="item image"
                  width={1400}
                  height={1400}
                />
              </div>
              <div className="space-y-6">
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
                      {date} • {readTime}
                    </span>
                  </span>
                </div>
              </div>
              {/* content */}
              <div className="leading-relaxed text-gray-500 col-span-2 hyphens-auto text-pretty">
                {content}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
