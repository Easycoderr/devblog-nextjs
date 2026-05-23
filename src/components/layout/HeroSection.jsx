import { LucideCircleArrowRight } from "lucide-react";
import CodeCard from "../CodeCard";
function HeroSection() {
  return (
    <section
      id="home"
      className="h-screen bg-gray-50 pb-16 lg:pt-0 pt-16 flex items-center"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 2xl:px-10 px-2 mx-auto">
        <div className="flex items-center lg:items-start flex-col gap-8">
          <div className="flex items-center justify-center">
            <h1 className="font-sora text-5xl lg:text-6xl tracking-tight font-bold text-center lg:text-left bg-gradient-to-l from-indigo-500 via-purple-600 to-indigo-400 bg-clip-text text-transparent">
              Write Better Code, Share Better Ideas.
            </h1>
          </div>
          <p className="leading-relaxed tracking-wide text-lg text-center lg:text-left max-w-3xl font-medium">
            DevBlog is a modern platform where developers share knowledge,
            explore ideas, and grow together through clean, high-quality
            technical content.
          </p>
          {/* CTA button */}
          <button className="group py-3 px-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:bg-hover/30 transition-all duration-200 active:scale-105 flex items-center gap-1 text-gray-50 mt-10">
            <span className="text-lg font-medium text-center tracking-wider">
              Explore Articles
            </span>
            <LucideCircleArrowRight className="mt-0.5" />
          </button>
        </div>
        <CodeCard />
      </div>
    </section>
  );
}

export default HeroSection;
