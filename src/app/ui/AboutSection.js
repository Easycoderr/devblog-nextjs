import { ArrowRight, EarthIcon, Lightbulb, Rocket } from "lucide-react";
import AboutCard from "../components/AboutCard";
import Link from "next/link";

const aboutCardData = [
  {
    id: 1,
    title: "Learn Faster",
    description: "Practical tutorials and real-world examples.",
    icon: <Rocket className="text-red-500" size={40} />,
  },
  {
    id: 2,
    title: "Share Knowledge",
    description: "Write and publish your own technical articles.",
    icon: <Lightbulb className="text-yellow-500" size={40} />,
  },
  {
    id: 3,
    title: "Grow Together",
    description: "Connect with developers and explore ideas.",
    icon: <EarthIcon className="text-blue-500" size={40} />,
  },
];
function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen py-16 bg-gray-100 flex  flex-col"
    >
      <div className="container 2xl:px-10 mx-auto flex flex-col gap-16">
        {/* head */}
        <div className="space-y-3">
          <h2 className="text-2xl md:text-4xl ml-3 md:ml-0 font-sora font-bold">
            About DevBlog
          </h2>
          <div className="bg-gradient-to-r from-transparent via-accent to-transparent h-0.5 max-w-2xs md:max-w-2xs"></div>
        </div>
        <p className="font-semibold text-gray-700 px-2 hyphens-auto text-pretty max-w-5xl">
          DevBlog is a modern platform for developers to share knowledge,
          explore new technologies, and grow together. We focus on clean,
          high-quality technical content that helps you become a better
          developer every day.
        </p>
        {/* cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-4 px-4 md:px-0 gap-5">
          {aboutCardData.map((item) => (
            <AboutCard key={item.id} item={item} />
          ))}
        </div>
        {/* CTA buttons */}
        <div className="flex flex-row items-center justify-center gap-x-6 mx-auto bg-indigo-300/30 rounded-full p-2">
          <Link
            href="/"
            className="group flex text-lg items-center gap-1 bg-black/90 px-6 py-3 rounded-full text-gray-50 transition-all duration-200 active:scale-105 hover:bg-hover"
          >
            Start Reading{" "}
            <ArrowRight className="group-hover:translate-x-0.5 transition duration-200" />
          </Link>
          <Link
            href="/"
            className="group flex text-lg items-center gap-1 bg-accent px-6 py-3 rounded-full text-gray-50 transition-all duration-200 active:scale-105 hover:bg-hover"
          >
            Explore Articles{" "}
            <ArrowRight className="group-hover:translate-x-0.5 transition duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
