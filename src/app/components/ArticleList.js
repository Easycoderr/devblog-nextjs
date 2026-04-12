import { getPosts } from "../lib/actions/post";
import ArticleCard from "./ArticleCard";
import Pagination from "./Pagination";

async function ArticleList({ params }) {
  // const params = await searchParams;

  const currentPage = Number(params?.page) || 1;
  console.log(currentPage);
  const { posts, totalPages } = await getPosts(currentPage);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6 px-4 md:px-0">
        {/* Articles */}
        {posts.map((post) => (
          <ArticleCard key={post.id} post={post} />
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
