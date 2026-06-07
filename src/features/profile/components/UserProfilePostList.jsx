import Pagination from "@/components/Pagination";
import PostCard from "@/features/post/components/PostCard";
import getPostsByUserId from "@/lib/actions/profile/getPostsByUserId";

async function UserProfilePostList({ posts, totalCount, currUser, currPage }) {
  return (
    <>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} user={currUser} />
          ))}
        </div>
      ) : (
        <div className="min-w-full flex items-center">
          <p className="bg-card text-md font-medium tracking-wide inline-block rounded-lg px-6 py-3 mx-auto my-6 text-text">
            No articles available.
          </p>
        </div>
      )}

      {totalCount > 1 && (
        <div className="mx-auto mt-4 inline-block">
          <Pagination totalPages={totalCount} currentPage={currPage} />
        </div>
      )}
    </>
  );
}

export default UserProfilePostList;
