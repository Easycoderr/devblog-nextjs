import Header from "./components/Header";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    <div className="relative w-full">
      <Header />
      <div className="grid grid-cols-1">
        {/* hero */}
        <HeroSection />
        {/* featured posts */}
      </div>
    </div>
  );
}
