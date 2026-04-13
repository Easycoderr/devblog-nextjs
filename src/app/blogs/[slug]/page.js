import DeleteButton from "@/app/components/DeleteButton";
import NavigateBackButton from "@/app/components/NavigateBackButton";
import { deletePost, getPostBySlug } from "@/app/lib/actions/post";
import getCurrentUser from "@/app/lib/getUser";
import { Calendar, Pencil, TrashIcon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

async function page({ params }) {
  const { slug } = await params;
  const userDataPromise = getCurrentUser();
  const postsDataPromise = getPostBySlug(slug);

  // Await them only when you need the values
  const [user, post] = await Promise.all([userDataPromise, postsDataPromise]);

  const {
    title,
    description,
    content,
    createdAt: date,
    category,
    readTime,
  } = post;

  return (
    <div className="min-h-screen">
      <div className="container 2xl:px-10 px-2 py-10 mx-auto">
        <div className="">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <NavigateBackButton>Back to blogs</NavigateBackButton>
              {user?.id === post.authorId && (
                <div className="flex gap-2">
                  {/* edit */}
                  <Link
                    href={`/blogs/edit/${post.id}`}
                    className="flex gap-2 items-center bg-indigo-100 px-4 py-2 rounded-lg hover:opacity-80 hover:shadow-sm active:scale-103 hover:shadow-indigo-200 transition-all duration-200 "
                  >
                    <span className="text-accent font-semibold tracking-wide">
                      Edit
                    </span>
                    <Pencil size={18} className="text-accent" />
                  </Link>
                  {/* delete */}
                  <DeleteButton post={post} style="secondary">
                    <span className="text-red-500 font-semibold tracking-wide">
                      Delete
                    </span>
                  </DeleteButton>
                </div>
              )}
            </div>
            {/* article slug */}
            <div className="text-muted text-xl md:text-2xl mt-7">#{slug}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-7">
              <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
