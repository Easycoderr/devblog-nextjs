import { LucideCircleArrowRight } from "lucide-react";
function HeroSection() {
  return (
    <section id="home" className="h-screen bg-gray-50 pb-16 flex items-center">
      <div className="container 2xl:px-10 mx-auto">
        <div className="flex items-center justify-center flex-col gap-8">
          <div className="bg-gradient-to-l from-transparent via-purple-800/20 to-transparent flex items-center justify-center">
            <h1 className="font-sora text-5xl lg:text-6xl tracking-tight font-bold text-center bg-gradient-to-l from-indigo-500 via-purple-600 to-indigo-400 bg-clip-text text-transparent">
              Write Better Code. Share Better Ideas.
            </h1>
          </div>
          <p className="leading-relaxed tracking-wide text-lg text-center max-w-3xl font-medium">
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
      </div>
    </section>
  );
}

export default HeroSection;
