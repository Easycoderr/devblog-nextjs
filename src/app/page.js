import HeroSection from "./ui/HeroSection";
import FeaturedArticle from "./ui/FeaturedArticle";
import LatestArticle from "./ui/LatestArticle";
import AboutSection from "./ui/AboutSection";
import { getPosts } from "./lib/actions/post";
export const metadata = {
  title: "Developer Blog",
  description:
    "DevBlog is a modern platform where developers share knowledge, explore ideas, and grow together through clean, high-quality technical content.",
};
export default async function Home() {
  const { posts } = await getPosts();

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
