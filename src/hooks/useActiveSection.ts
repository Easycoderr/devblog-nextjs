import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
type SectionType = { id: string; label: string; href: string };

function useActiveSection(sectionIds: SectionType[]): string {
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );
    sectionIds.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });
    return () => {
      observer.disconnect();
      setActiveSection("");
    };
  }, [pathname, sectionIds]);
  return activeSection;
}

export default useActiveSection;
