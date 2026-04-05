import Header from "./ui/Header";
import HeroSection from "./ui/HeroSection";
import FeaturedArticle from "./ui/FeaturedArticle";
import LatestArticle from "./ui/LatestArticle";
import AboutSection from "./ui/AboutSection";
import Footer from "./ui/Footer";
// fake data
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
export default function Home() {
  return (
    <div className="relative w-full">
      <main className="grid grid-cols-1">
        {/* hero */}
        <HeroSection />
        {/* Featured Article */}
        <FeaturedArticle posts={posts} />
        {/* Latest Article */}
        <LatestArticle posts={posts} />
        {/* about devBlog website */}
        <AboutSection />
      </main>
    </div>
  );
}
