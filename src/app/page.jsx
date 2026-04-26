import HeroSection from "../components/layout/HeroSection";
import AboutSection from "../components/layout/AboutSection";
import { getPosts } from "../lib/actions/post";
import FeaturedPost from "../components/layout/FeaturedPost";
import LatestPost from "../components/layout/LatestPost";
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
        <FeaturedPost posts={posts} />
        {/* Latest Article */}
        <LatestPost posts={posts} />
        {/* about devBlog website */}
        <AboutSection />
      </main>
    </div>
  );
}
