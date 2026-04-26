import { Suspense } from "react";
import PostListSkeleton from "../../features/post/components/skeletons/PostListSkeleton";
import EmptyState from "../ui/EmptyState";
import PostCard from "../../features/post/components/PostCard";
import getCurrentUser from "@/lib/getUser";

async function LatestPost({ posts }) {
  const user = await getCurrentUser();
  const latestPosts = posts.slice(0, 6);
  return (
    <section id="home" className="min-h-screen py-16 bg-gray-50 flex  flex-col">
      <div className="container 2xl:px-10 mx-auto flex flex-col gap-16">
        {/* head */}
        <div className="space-y-3">
          <h2 className="text-2xl md:text-4xl ml-3 md:ml-0 font-sora font-bold">
            Latest Articles
          </h2>
          <p className="ml-3 md:ml-0 text-md font-semibold text-gray-600">
            Discover the newest insights and tutorials
          </p>
          <div className="bg-gradient-to-r from-transparent via-accent to-transparent h-0.5 max-w-44 md:max-w-2xs"></div>
        </div>
        {/* content */}
        {latestPosts.length === 0 ? (
          <EmptyState />
        ) : (
          <Suspense fallback={<PostListSkeleton />}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
              {/* Articles */}
              {latestPosts.map((post) => (
                <PostCard key={post.id} post={post} user={user} />
              ))}
            </div>
          </Suspense>
        )}
      </div>
    </section>
  );
}

export default LatestPost;
