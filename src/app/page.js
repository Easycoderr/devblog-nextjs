import HeroSection from "../components/layout/HeroSection";
import FeaturedArticle from "../components/layout/FeaturedArticle";
import LatestArticle from "../components/layout/LatestArticle";
import AboutSection from "../components/layout/AboutSection";
import { getPosts } from "../lib/actions/post";
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
