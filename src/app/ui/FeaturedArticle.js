import { Suspense } from "react";
import ArticleCard from "../components/FeaturedArticleCard";
import FeaturedPostSkeleton from "../components/skeletons/FeaturedPostSkeleton";
import EmptyState from "../components/EmptyState";

function FeaturedArticle({ posts }) {
  const featuredPosts = posts?.filter((post) => !post.isFeatured)[0];

  return (
    <section
      id="featured"
      className="min-h-screen py-16 bg-gray-100 flex  flex-col"
    >
      <div className="container 2xl:px-10 mx-auto flex flex-col gap-16">
        {/* head */}
        <div className="space-y-3">
          <h2 className="text-2xl md:text-4xl ml-3 md:ml-0 font-sora font-bold">
            Featured Article
          </h2>
          <div className="bg-gradient-to-r from-transparent via-accent to-transparent h-0.5 max-w-3xs md:max-w-2xs"></div>
        </div>
        {/* content */}
        {!featuredPosts ? (
          <EmptyState />
        ) : (
          <Suspense fallback={<FeaturedPostSkeleton />}>
            <div className="grid md:grid-cols-2 md:grid-rows-1 grid-rows-2 grid-cols-1 gap-6 bg-gradient-to-br from-indigo-200/20 to-purple-200/20  p-6 mx-4 md:mx-0 rounded-xl border border-border/70 hover:shadow-lg transition-all duration-200">
              {/* LEFT */}
              <div className="opacity-90 rounded-xl bg-[url('/images/img1.png')] bg-cover no-repeat bg-center"></div>
              <ArticleCard post={featuredPosts} />
            </div>
          </Suspense>
        )}
      </div>
    </section>
  );
}

export default FeaturedArticle;
