import { Filter, Search } from "lucide-react";
import getCurrentUser from "../lib/getUser";
import Link from "next/link";
import ArticleList from "../components/ArticleList";
import { Suspense } from "react";
import Spinner from "../components/Spinner";
import PostListSkeleton from "../components/skeletons/PostListSkeleton";

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
        <div className="flex md:gap-x-10 md:gap-y-0 gap-y-4 flex-col md:flex-row">
          <div className="flex gap-0.5 flex-col relative w-full">
            <input
              type="text"
              id="search"
              name="search"
              className="border pl-8 w-full peer z-20 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 ring-indigo-500"
              placeholder=" "
            />
            <label
              htmlFor="search"
              className="transition-all duration-200 absolute peer-[:not(:placeholder-shown)]:-top-0.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-accent peer-[:not(:placeholder-shown)]:rounded-lg peer-[:not(:placeholder-shown)]:text-gray-50 peer-[:not(:placeholder-shown)]:px-1 peer-focus:px-1 peer-focus:-top-0.5 peer-focus:bg-accent peer-focus:text-xs z-40 peer-focus:rounded-lg peer-focus:text-gray-50 top-[50%] -translate-y-[50%] left-8 peer-focus:left-2 font-sora text-text-muted tracking-wide text-sm font-medium"
            >
              Search: Enter articles title..
            </label>
            <span className="absolute left-1 top-[50%] -translate-y-[50%] peer-focus:text-accent">
              <Search />
            </span>
          </div>
          <div className="relative w-full">
            <select
              name="cars"
              id="cars"
              className="border w-full border-black peer z-30 text-sm rounded-md text-text-muted px-8 py-2 focus:outline-none focus:ring-1 ring-indigo-500"
            >
              <option defaultChecked>Choose a filter</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <Filter className="absolute top-[50%] -translate-y-[50%] left-2 peer-focus:text-accent" />
          </div>
        </div>

        {/* article list */}

        <Suspense fallback={<PostListSkeleton />}>
          <ArticleList params={params} />
        </Suspense>
      </main>
    </div>
  );
}

export default page;
