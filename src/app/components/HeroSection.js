import { LucideCircleArrowRight } from "lucide-react";
function HeroSection() {
  return (
    <section className="h-screen mb-16 flex items-center">
      <div className="container mx-auto">
        <div className="flex items-center justify-center flex-col gap-8">
          <h1 className="text-4xl md:text-5xl tracking-tight font-semibold md:font-bold text-center bg-gradient-to-l from-indigo-500 via-purple-600 to-indigo-400 bg-clip-text text-transparent">
            Write Better Code. Share Better Ideas.
          </h1>
          <p className="leading-relaxed tracking-wide text-lg text-center max-w-4xl">
            DevBlog is a modern platform where developers share knowledge,
            explore ideas, and grow together through clean, high-quality
            technical content.
          </p>
          {/* CTA button */}
          <button className="group py-3 px-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:bg-hover/30 transition-all duration-200 active:scale-105 flex items-center gap-1 text-text mt-10">
            <span className="text-lg font-medium text-center">
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
