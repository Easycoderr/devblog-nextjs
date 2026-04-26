import getCurrentUser from "@/lib/getUser";
import Link from "next/link";
import { Suspense } from "react";

import PostListSkeleton from "@/features/post/components/skeletons/PostListSkeleton";
import SearchFilterSort from "@/features/post/components/SearchFilterSort";
import PostList from "@/features/post/components/PostList";
export async function generateMetadata({ params }) {
  const param = await params;
  return {
    title: "Blogs",
    description:
      "Explore in-depth tutorials, best practices, and code solutions for modern software development. Expert insights on JavaScript, Python, cloud, and AI. Read now.",
  };
}
async function page({ searchParams }) {
  const params = await searchParams;
  const user = await getCurrentUser();
  return (
    <div className="space-y-12 relative w-full">
      {/* main */}
      <main className="container flex flex-col px-10 py-10 space-y-10 mx-auto">
        <div className="flex justify-between">
          <div className="space-y-3">
            <h2 className="text-4xl text-start md:text-5xl ml-3 md:ml-0 font-sora font-bold">
              All Articles
            </h2>
            <div className="bg-gradient-to-r from-transparent via-accent to-transparent h-0.5 max-w-xs md:max-w-xs mb-0.5"></div>
            <p className="text-muted leading-relaxed tracking-normal font-medium">
              Explore all posts and tutorials
            </p>
          </div>
          <div>
            <Link
              href={!user ? "/auth/register" : "/blogs/create"}
              className="bg-black/80 text-gray-50 hover:bg-accent transition-all duration-200 px-4 py-2 rounded-full text-lg"
            >
              {!user ? "Add your first article" : "Add article"}
            </Link>
          </div>
        </div>
        {/* search + filter */}
        <SearchFilterSort />
        {/* article list */}

        <Suspense fallback={<PostListSkeleton />}>
          <PostList params={params} />
        </Suspense>
      </main>
    </div>
  );
}

export default page;
