import { getPosts } from "../../../lib/actions/post";
import getCurrentUser from "../../../lib/getUser";
import EmptyState from "../../../components/ui/EmptyState";
import Pagination from "../../../components/Pagination";
import PostCard from "./PostCard";

async function PostList({ params }) {
  const user = await getCurrentUser();
  // const params = await searchParams;
  const search = params.search;
  const filter = params.filter;
  const sort = params.sort;
  const currentPage = Number(params?.page) || 1;

  const { posts, totalPages } = await getPosts(currentPage, {
    search,
    filter,
    sort,
  });
  if (posts.length === 0) return <EmptyState />;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-6 px-4 md:px-0">
        {/* Articles */}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} user={user} />
        ))}
      </div>
      {/* pagination */}
      {totalPages > 1 && (
        <div className="mx-auto">
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      )}
    </>
  );
}

export default PostList;
