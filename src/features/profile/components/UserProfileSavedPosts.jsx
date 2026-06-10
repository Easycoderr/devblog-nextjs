import Pagination from "@/components/Pagination";
import PostCard from "@/features/post/components/PostCard";
import getSavedPostsByUserId from "@/lib/actions/profile/getSavedPostsByUserId";
import Link from "next/link";

async function UserProfileSavedPosts({ user, currUser, currPage }) {
  const { savedPosts, totalCount } = await getSavedPostsByUserId(
    user.id,
    currPage,
  );
  return (
    <>
      {savedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {savedPosts.map((post) => (
            <PostCard key={post.id} post={post} user={currUser} />
          ))}
        </div>
      ) : (
        <div className="min-w-full flex items-center">
          <p className="bg-card font-medium tracking-wide inline-block rounded-lg px-6 py-3 mx-auto my-6 text-foreground shadow-sm">
            No articles available.
          </p>
        </div>
      )}
      {totalCount > 1 && (
        <div className="mx-auto">
          <Pagination totalPages={totalCount} currentPage={currPage} />
        </div>
      )}
    </>
  );
}

export default UserProfileSavedPosts;
