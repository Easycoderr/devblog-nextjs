import { getPosts } from "../lib/actions/post";
import ArticleCard from "./ArticleCard";

async function ArticleList() {
  const posts = await getPosts();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6 px-4 md:px-0">
      {/* Articles */}
      {posts.map((post) => (
        <ArticleCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default ArticleList;
