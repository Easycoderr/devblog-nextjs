import { use } from "react";
import { getPosts } from "../lib/actions/post";
import getCurrentUser from "../lib/getUser";
import ArticleCard from "./ArticleCard";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";

async function ArticleList({ params }) {
  const user = await getCurrentUser();
  // const params = await searchParams;
  const search = params.search;
  const currentPage = Number(params?.page) || 1;

  const { posts, totalPages } = await getPosts(currentPage, { search });
  if (posts.length === 0) return <EmptyState />;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6 px-4 md:px-0">
        {/* Articles */}
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} user={user} />
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

export default ArticleList;
