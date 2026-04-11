import { Filter, Search } from "lucide-react";
import ArticleCard from "../components/ArticleCard";

import Pagination from "../components/Pagination";
import getCurrentUser from "../lib/getUser";
import Link from "next/link";
import ArticleList from "../components/ArticleList";

export const posts = [
  {
    id: 1,
    slug: "mastering-react-query",
    title: "Mastering React Query for Scalable Apps",
    description:
      "Learn how to manage server state efficiently with React Query and build scalable frontend applications.",
    content: `
React Query is a powerful library for managing server state in React applications.

In this article, we explore:
- Fetching data
- Caching
- Mutations
- Optimistic updates

By the end, you will understand how to build fast and reliable apps.
    `,
    category: "React",
    date: "2026-01-10",
    readTime: "6 min read",
    isFeatured: true,
  },

  {
    id: 2,
    slug: "understanding-javascript-closures",
    title: "Understanding JavaScript Closures",
    description:
      "A deep dive into closures and how they work behind the scenes in JavaScript.",
    content: `
Closures are one of the most important concepts in JavaScript.

A closure gives you access to an outer function's scope from an inner function.

This is widely used in:
- callbacks
- event handlers
- data privacy patterns
    `,
    category: "JavaScript",
    date: "2026-01-08",
    readTime: "5 min read",
    isFeatured: true,
  },

  {
    id: 3,
    slug: "css-grid-vs-flexbox",
    title: "CSS Grid vs Flexbox: When to Use Each",
    description:
      "Understand the difference between Grid and Flexbox and when to use each layout system.",
    content: `
CSS Grid and Flexbox are powerful layout tools.

Use Flexbox for:
- one-dimensional layouts

Use Grid for:
- two-dimensional layouts

Choosing the right tool makes your UI cleaner and more maintainable.
    `,
    category: "CSS",
    date: "2026-01-05",
    readTime: "4 min read",
    isFeatured: false,
  },

  {
    id: 4,
    slug: "nextjs-server-vs-client",
    title: "Next.js Server vs Client Components",
    description:
      "Learn the difference between server and client components in Next.js App Router.",
    content: `
Next.js introduced server and client components.

Server components:
- run on server
- better performance

Client components:
- interactive
- use state and effects

Understanding this is key for modern apps.
    `,
    category: "Next.js",
    date: "2026-01-03",
    readTime: "7 min read",
    isFeatured: false,
  },
];
async function page() {
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
              className="bg-black/80 text-gray-50 hover:bg-accent transition-all duration-200 px-4 py-2 rounded-full"
            >
              {!user ? "Make your first article" : "Add article +"}
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
              className="border pl-8 w-full peer z-30 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-1 ring-indigo-500"
              placeholder=" "
            />
            <label
              htmlFor="search"
              className="transition-all duration-200 absolute peer-[:not(:placeholder-shown)]:-top-0.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-accent peer-[:not(:placeholder-shown)]:rounded-lg peer-[:not(:placeholder-shown)]:text-gray-50 peer-[:not(:placeholder-shown)]:px-1 peer-focus:px-1 peer-focus:-top-0.5 peer-focus:bg-accent peer-focus:text-xs z-70 peer-focus:rounded-lg peer-focus:text-gray-50 top-[50%] -translate-y-[50%] left-8 peer-focus:left-2 z-10 font-sora text-muted tracking-wide text-sm font-medium"
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
              className="border w-full border-black peer z-30 text-sm rounded-md text-muted px-8 py-2 focus:outline-none focus:ring-1 ring-indigo-500"
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
        <ArticleList />
        {/* pagination */}
        <div className="mx-auto">
          <Pagination totalPages={4} />
        </div>
      </main>
    </div>
  );
}

export default page;
