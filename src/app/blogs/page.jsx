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
  return (
    <div className="space-y-12 relative w-full">
      {/* main */}
      <main className="container flex flex-col px-10 py-10 space-y-10 mx-auto">
        <div className="flex justify-between">
          <div className="space-y-3">
            <h2 className="text-4xl text-start text-foreground md:text-5xl md:ml-0 font-sora font-bold">
              All articles
            </h2>
            <p className="text-muted-foreground leading-relaxed tracking-normal font-medium">
              Discover the latest insights and tutorials from our community.
            </p>
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
