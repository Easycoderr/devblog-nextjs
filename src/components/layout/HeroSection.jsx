import { LucideCircleArrowRight } from "lucide-react";
import CodeCard from "../CodeCard";
import { TextAnimation } from "../ui/TextAnimation";
function HeroSection() {
  return (
    <section
      id="home"
      className="h-screen bg-bg pb-16 lg:pt-0 pt-16 flex items-center"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 2xl:px-10 px-2 mx-auto">
        <div className="flex items-center lg:items-start flex-col gap-8">
          <div className="flex items-center justify-center">
            <h1 className="flex flex-col gap-1">
              <TextAnimation
                text="Write Better Code."
                className="bg-gradient-to-l text-5xl! lg:text-6xl font-sora tracking-tight font-bold text-foreground"
              />
              <TextAnimation
                direction="down"
                text="Share Better Ideas."
                className="bg-gradient-to-l text-5xl! lg:text-6xl font-sora tracking-tight font-bold text-primary"
              />
            </h1>
          </div>
          <p className="text-foreground leading-relaxed tracking-wide text-lg text-center lg:text-left max-w-xl font-medium">
            DevBlog is a modern platform where developers share knowledge,
            explore ideas, and grow together through clean, high-quality
            technical content.
          </p>
          {/* CTA button */}
          <div className="flex gap-4">
            <button className="group py-3 px-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 transition-all duration-500 active:scale-105 flex items-center gap-1 text-gray-50 mt-10">
              <span className="text-md font-bold text-center tracking-wider">
                Explore Articles
              </span>
              <LucideCircleArrowRight className="mt-0.5" />
            </button>
            <button className="group py-3 text-md font-bold hover:text-gray-50 hover:bg-stone-800 tracking-wider px-6 rounded-full border bg-gray-50 transition-all duration-200 active:scale-105 text-stone-800 dark:text-dark-text mt-10">
              Write an Article
            </button>
          </div>
        </div>
        <CodeCard />
      </div>
    </section>
  );
}

export default HeroSection;
